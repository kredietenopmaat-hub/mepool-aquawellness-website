"use server"

import { randomUUID } from "node:crypto"
import { BlobPreconditionFailedError, put } from "@vercel/blob"
import { redirect } from "next/navigation"
import { z } from "zod"
import { defaults, jacuzziId, type Product } from "@/lib/catalog"
import { adminSignedIn, signInAdmin, signOutAdmin } from "@/lib/admin-session"
import {
  googleBookingUrl, imagePrefix, productPath, readBooking, readDocument,
  saveBooking, storageConfigured, writeDocument,
} from "@/lib/catalog-store"

export type FormState = { error: string } | null

function field(form: FormData, name: string) {
  const value = form.get(name)
  return typeof value === "string" ? value.trim() : ""
}

export async function login(_state: FormState, form: FormData): Promise<FormState> {
  const password = form.get("password")
  if (typeof password !== "string" || password.length > 512 || !await signInAdmin(password)) {
    return { error: "Ongeldig wachtwoord." }
  }
  redirect("/admin")
}

export async function logout() {
  await signOutAdmin()
  redirect("/admin")
}

const pricePattern = /^(?:\d{1,8}|\d{1,3}(?:\.\d{3}){1,2})(?:,\d{1,2})?$/
const textLine = z.string().min(1).max(160)
const productFields = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(3000),
  price: z.string().regex(pricePattern),
  features: z.array(textLine).max(20),
  specifications: z.array(z.object({ label: textLine, value: textLine })).max(30),
})

function writeError(error: unknown): FormState {
  if (error instanceof BlobPreconditionFailedError) {
    return { error: "Deze gegevens zijn intussen gewijzigd. Laad de pagina opnieuw en probeer het nog eens." }
  }
  console.error("Aqua Wellness admin write failed", error)
  return { error: "Opslaan is niet gelukt. Probeer het opnieuw." }
}

export async function updateProduct(_state: FormState, form: FormData): Promise<FormState> {
  if (!await adminSignedIn()) return { error: "Meld u opnieuw aan." }
  if (!storageConfigured()) return { error: "De opslag is nog niet ingesteld." }

  const id = field(form, "id")
  const fallback = defaults.find((product) => product.id === id)
  if (!fallback) return { error: "Product niet gevonden." }

  const specifications = field(form, "specifications").split(/\r?\n/).filter((line) => line.trim()).map((line) => {
    const separator = line.indexOf(":")
    return separator < 0
      ? { label: line.trim(), value: "" }
      : { label: line.slice(0, separator).trim(), value: line.slice(separator + 1).trim() }
  })
  const fields = productFields.safeParse({
    title: field(form, "title"),
    description: field(form, "description"),
    price: field(form, "price"),
    features: id === jacuzziId ? [] : field(form, "features").split(/\r?\n/).map((line) => line.trim()).filter(Boolean),
    specifications,
  })
  if (!fields.success) {
    return { error: "Controleer de prijs (bijv. 2490 of 2.490,50) en gebruik voor elke specificatie ‘Naam: waarde’." }
  }
  if (new Set(specifications.map(({ label }) => label.toLowerCase())).size !== specifications.length) {
    return { error: "Geef elke specificatie een unieke naam." }
  }

  const amount = Number(fields.data.price.replaceAll(".", "").replace(",", "."))
  const price = new Intl.NumberFormat("nl-BE", {
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount)

  const file = form.get("photo")
  const upload = file instanceof File && file.size > 0 ? file : null
  const width = Number(field(form, "width"))
  const height = Number(field(form, "height"))
  if (upload && (upload.type !== "image/jpeg" || upload.size > 1_800_000 ||
    ![width, height].every((size) => Number.isInteger(size) && size > 0 && size <= 1920))) {
    return { error: "De foto kon niet worden verwerkt. Kies een andere foto." }
  }
  if (upload) {
    const signature = new Uint8Array(await upload.slice(0, 3).arrayBuffer())
    if (signature[0] !== 255 || signature[1] !== 216 || signature[2] !== 255) {
      return { error: "De foto is geen geldig JPEG-bestand." }
    }
  }

  try {
    const path = productPath(id)
    const current = await readDocument<Product>(path)
    const etag = field(form, "etag")
    if ((current?.etag ?? "") !== etag) {
      return { error: "Dit product is intussen gewijzigd. Laad de pagina opnieuw en probeer het nog eens." }
    }
    const product = current?.value ?? fallback
    const toRemove = new Set(form.getAll("removePhoto"))
    const images = product.images.filter(({ src }) => !toRemove.has(src))
    const photoCount = images.length + Number(Boolean(upload))
    if (photoCount < 1 || photoCount > 8) return { error: "Een product moet één tot acht foto’s hebben." }

    if (upload) {
      const fileName = `${randomUUID()}.jpg`
      await put(imagePrefix + fileName, upload, { access: "private", contentType: "image/jpeg" })
      const image = { src: `/media/producten/${fileName}`, alt: fields.data.title, width, height }
      if (form.get("cover") === "on") images.unshift(image)
      else images.push(image)
    }
    await writeDocument(path, { ...product, ...fields.data, price, images }, etag)
  } catch (error) {
    return writeError(error)
  }

  redirect(`/admin?product=${id}&saved=product`)
}

export async function updateBooking(_state: FormState, form: FormData): Promise<FormState> {
  if (!await adminSignedIn()) return { error: "Meld u opnieuw aan." }
  if (!storageConfigured()) return { error: "De opslag is nog niet ingesteld." }

  const input = field(form, "url")
  const url = googleBookingUrl(input)
  if (input && (!url || input.length > 2048)) {
    return { error: "Gebruik de openbare link van de Google Agenda-boekingspagina." }
  }

  try {
    const etag = field(form, "etag")
    const current = await readBooking()
    if ((current?.etag ?? "") !== etag) {
      return { error: "De boekingslink is intussen gewijzigd. Laad de pagina opnieuw." }
    }
    await saveBooking(url ?? "", etag)
  } catch (error) {
    return writeError(error)
  }

  redirect("/admin?saved=booking")
}
