"use server"

import { randomUUID } from "node:crypto"
import { BlobPreconditionFailedError, put } from "@vercel/blob"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { defaults, isAddedProductId, jacuzziId, normalizeProductPrice, pendingProductPhoto, productCategories, type Product } from "@/lib/catalog"
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

const textLine = z.string().min(1).max(160)
const productFields = z.object({
  category: z.enum(productCategories),
  title: z.string().min(1).max(100),
  description: z.string().max(3000),
  priceMode: z.enum(["fixed", "from"]),
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
  const creating = form.get("create") === "true"
  if (creating ? !isAddedProductId(id) : !fallback && !isAddedProductId(id)) return { error: "Product niet gevonden." }

  const category = field(form, "category")
  if (!productFields.shape.category.safeParse(category).success) return { error: "Kies een rubriek." }

  const labels = form.getAll("specLabel").map((name) => String(name).trim())
  const values = form.getAll("specValue").map((value) => String(value).trim())
  if (labels.length !== values.length) return { error: "Vul bij elke specificatie een parameter en een waarde in." }
  const specifications = labels.map((label, index) => ({ label, value: values[index] }))
    .filter(({ label, value }) => label || value)
  const price = normalizeProductPrice(field(form, "price"))
  if (!price) return { error: "Voer een geldig prijsbedrag in, bijvoorbeeld 2490 of 2.490,50." }

  const fields = productFields.safeParse({
    category,
    title: field(form, "title"),
    description: field(form, "description"),
    priceMode: field(form, "priceMode"),
    features: id === jacuzziId ? [] : field(form, "features").split(/\r?\n/).map((line) => line.trim()).filter(Boolean),
    specifications,
  })
  if (!fields.success) {
    return { error: "Controleer de productgegevens en vul bij elke specificatie een parameter en een waarde in." }
  }
  if (new Set(specifications.map(({ label }) => label.toLowerCase())).size !== specifications.length) {
    return { error: "Geef elke specificatie een unieke naam." }
  }

  const file = form.get("photo")
  const upload = file instanceof File && file.size > 0 ? file : null
  const width = Number(field(form, "width"))
  const height = Number(field(form, "height"))
  if (creating && !upload) return { error: "Upload minstens één productfoto." }
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
    if ((creating && current) || (current?.etag ?? "") !== etag) {
      return { error: "Dit product is intussen gewijzigd. Laad de pagina opnieuw en probeer het nog eens." }
    }
    const existing = current?.value ?? fallback
    if (!creating && !existing) return { error: "Product niet gevonden." }
    const product = existing ?? { id, badge: null, images: [] }
    const order = form.getAll("photoOrder").map(String)
    if (order.length < 1 || order.length > 8) {
      return { error: "Een product moet één tot acht foto’s hebben." }
    }
    const photos = new Map(product.images.map((image) => [image.src, image]))
    if (
      new Set(order).size !== order.length ||
      order.includes(pendingProductPhoto) !== Boolean(upload) ||
      order.some((src) => src !== pendingProductPhoto && !photos.has(src))
    ) {
      return { error: "De fotovolgorde is ongeldig. Controleer de foto’s en probeer opnieuw." }
    }
    if (upload) {
      const fileName = `${randomUUID()}.jpg`
      await put(imagePrefix + fileName, upload, { access: "private", contentType: "image/jpeg" })
      photos.set(pendingProductPhoto, { src: `/media/producten/${fileName}`, alt: fields.data.title, width, height })
    }
    const images = order.map((src) => photos.get(src)!)
    await writeDocument(path, { ...product, ...fields.data, price, images }, etag)
  } catch (error) {
    return writeError(error)
  }

  revalidatePath("/producten")
  if (id === jacuzziId) revalidatePath("/jacuzzi")
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
