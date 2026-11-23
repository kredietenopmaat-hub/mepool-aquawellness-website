"use client"

import { startTransition, useActionState, useState, type FormEvent, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import type { FormState } from "./actions"

async function preparePhoto(form: FormData) {
  const file = form.get("photo")
  if (!(file instanceof File) || !file.size) return
  if (file.size > 25_000_000) throw new Error("Kies een foto van maximaal 25 MB.")

  const bitmap = await createImageBitmap(file)
  try {
    const scale = Math.min(1, 1920 / Math.max(bitmap.width, bitmap.height))
    const canvas = document.createElement("canvas")
    canvas.width = Math.max(1, Math.round(bitmap.width * scale))
    canvas.height = Math.max(1, Math.round(bitmap.height * scale))
    const context = canvas.getContext("2d", { alpha: false })
    if (!context) throw new Error("De foto kon niet worden geopend.")
    context.fillStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height)

    const jpeg = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.82))
    if (!jpeg || jpeg.size > 1_800_000) throw new Error("De foto blijft te groot. Kies een kleinere foto.")
    form.set("photo", jpeg, "product.jpg")
    form.set("width", String(canvas.width))
    form.set("height", String(canvas.height))
  } finally {
    bitmap.close()
  }
}

export function AdminForm({ action, children, submit, photo = false }: {
  action: (state: FormState, form: FormData) => Promise<FormState>
  children: ReactNode
  submit: string
  photo?: boolean
}) {
  const [state, dispatch, pending] = useActionState(action, null)
  const [preparing, setPreparing] = useState(false)
  const [photoError, setPhotoError] = useState("")
  const busy = preparing || pending

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (busy) return
    const form = new FormData(event.currentTarget)
    setPhotoError("")
    setPreparing(true)
    try {
      if (photo) await preparePhoto(form)
      startTransition(() => dispatch(form))
    } catch (error) {
      setPhotoError(error instanceof Error && error.message.startsWith("Kies")
        ? error.message : "De foto kon niet worden verwerkt. Kies een andere foto.")
    } finally {
      setPreparing(false)
    }
  }

  return (
    <form action={dispatch} onSubmit={onSubmit} className="space-y-5">
      {children}
      {(photoError || state?.error) && <p role="alert" className="text-sm text-destructive">{photoError || state?.error}</p>}
      <Button type="submit" disabled={busy}>{busy ? "Even geduld…" : submit}</Button>
    </form>
  )
}
