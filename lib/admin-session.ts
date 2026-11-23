import { createHash, createHmac, timingSafeEqual } from "node:crypto"
import { cookies } from "next/headers"

const cookieName = "aqua_admin"
const sessionSeconds = 8 * 60 * 60

function adminPassword() {
  const password = process.env.AQUA_ADMIN_PASSWORD
  return password && password.length >= 32 ? password : undefined
}

export function adminConfigured() {
  return Boolean(adminPassword())
}

function hash(value: string) {
  return createHash("sha256").update(value).digest()
}

function sign(expiration: string, password: string) {
  return createHmac("sha256", password).update(`aqua-admin:${expiration}`).digest("hex")
}

export async function adminSignedIn() {
  const password = adminPassword()
  const value = (await cookies()).get(cookieName)?.value
  if (!password || !value) return false

  const [expiration, signature, extra] = value.split(".")
  if (extra !== undefined || !/^\d{10}$/.test(expiration) || !/^[a-f0-9]{64}$/.test(signature ?? "")) return false
  if (Number(expiration) <= Math.floor(Date.now() / 1000)) return false
  return timingSafeEqual(Buffer.from(signature, "hex"), Buffer.from(sign(expiration, password), "hex"))
}

export async function signInAdmin(attempt: string) {
  const password = adminPassword()
  if (!password || !timingSafeEqual(hash(password), hash(attempt))) return false

  const expiration = String(Math.floor(Date.now() / 1000) + sessionSeconds)
  const jar = await cookies()
  jar.set(cookieName, `${expiration}.${sign(expiration, password)}`, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionSeconds,
  })
  return true
}

export async function signOutAdmin() {
  const jar = await cookies()
  jar.delete(cookieName)
}
