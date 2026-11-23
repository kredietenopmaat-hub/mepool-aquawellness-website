import { get, list, put } from "@vercel/blob"
import { addedProductPrefix, type Product } from "@/lib/catalog"

export const imagePrefix = "aqua-wellness/product-images/"
export const defaultBookingUrl = "https://calendar.app.google/RL3wiNY9m8fuJHd69"
const bookingPath = "aqua-wellness/settings/booking.json"

export function storageConfigured() {
  return Boolean(process.env.BLOB_STORE_ID || process.env.BLOB_READ_WRITE_TOKEN)
}

export async function readDocument<T>(pathname: string): Promise<{ value: T; etag: string } | null> {
  if (!storageConfigured()) return null
  const result = await get(pathname, { access: "private", useCache: false })
  if (!result || result.statusCode !== 200) return null
  return { value: await new Response(result.stream).json() as T, etag: result.blob.etag }
}

export async function writeDocument(pathname: string, value: unknown, etag: string) {
  await put(pathname, JSON.stringify(value), {
    access: "private",
    contentType: "application/json",
    allowOverwrite: Boolean(etag),
    ifMatch: etag || undefined,
  })
}

const productFolder = "aqua-wellness/products/"

export function productPath(id: string) {
  return `${productFolder}${id}.json`
}

export async function readAddedProducts(): Promise<Product[]> {
  if (!storageConfigured()) return []

  const products: Product[] = []
  let cursor: string | undefined
  do {
    const page = await list({ prefix: productFolder + addedProductPrefix, cursor, limit: 50 })
    const documents = await Promise.all(page.blobs.map(({ pathname }) => readDocument<Product>(pathname)))
    for (const document of documents) {
      if (document) products.push(document.value)
    }
    cursor = page.cursor
  } while (cursor)

  return products.sort((a, b) => a.title.localeCompare(b.title, "nl-BE"))
}

export async function readProduct(fallback: Product): Promise<Product> {
  try {
    return (await readDocument<Product>(productPath(fallback.id)))?.value ?? fallback
  } catch (error) {
    console.error("Could not read Aqua Wellness product", fallback.id, error)
    return fallback
  }
}

export function googleBookingUrl(input: string) {
  try {
    const url = new URL(input)
    if (url.protocol !== "https:" || url.username || url.password || url.port) return null
    if (url.hostname === "calendar.app.google" && /^\/[a-zA-Z0-9_-]+\/?$/.test(url.pathname)) return url.href
    if (url.hostname === "calendar.google.com" &&
      /^(?:\/calendar(?:\/u\/\d+)?)?\/appointments\/schedules\/[a-zA-Z0-9_-]+\/?$/.test(url.pathname)) return url.href
  } catch {
    return null
  }
  return null
}

export function readBooking() {
  return readDocument<{ url: string }>(bookingPath)
}

export function saveBooking(url: string, etag: string) {
  return writeDocument(bookingPath, { url }, etag)
}
