"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { formatProductPrice, jacuzziId, normalizeProductPrice, pendingProductPhoto, productCategories, productPriceMode, type PriceMode, type Product } from "@/lib/catalog"
import { updateProduct } from "./actions"
import { AdminForm } from "./admin-form"

export function ProductEditor({ product, etag, creating }: { product: Product; etag: string; creating: boolean }) {
  const [title, setTitle] = useState(product.title)
  const [price, setPrice] = useState(product.price)
  const [mode, setMode] = useState(productPriceMode(product))
  const [specifications, setSpecifications] = useState(
    product.specifications.map((row, key) => ({ ...row, key })),
  )
  const nextSpecificationKey = useRef(specifications.length)

  const [photoOrder, setPhotoOrder] = useState(product.images.map(({ src }) => src))
  const [pendingPhoto, setPendingPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState("")
  const photoInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!pendingPhoto) {
      setPhotoPreview("")
      return
    }
    const url = URL.createObjectURL(pendingPhoto)
    setPhotoPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [pendingPhoto])

  function choosePhoto(file: File | null) {
    setPendingPhoto(file)
    setPhotoOrder((order) => {
      if (!file) return order.filter((src) => src !== pendingProductPhoto)
      return order.includes(pendingProductPhoto) ? order : [...order, pendingProductPhoto]
    })
  }

  function movePhoto(src: string, destination: number) {
    setPhotoOrder((order) => {
      const updated = order.filter((item) => item !== src)
      updated.splice(destination, 0, src)
      return updated
    })
  }

  function removePhoto(src: string) {
    if (src === pendingProductPhoto) {
      if (photoInput.current) photoInput.current.value = ""
      choosePhoto(null)
      return
    }
    setPhotoOrder((order) => order.filter((item) => item !== src))
  }

  function photoSource(src: string) {
    return src === pendingProductPhoto ? photoPreview : src
  }

  const cover = photoOrder[0] ? photoSource(photoOrder[0]) : ""
  const previewPrice = normalizeProductPrice(price)

  return (
    <AdminForm action={updateProduct} submit="Opslaan en publiceren" photo>
      <input type="hidden" name="id" value={product.id} />
      <input type="hidden" name="etag" value={etag} />
      {creating && <input type="hidden" name="create" value="true" />}
      <div className="space-y-2">
        <Label htmlFor="category">Rubriek</Label>
        <select id="category" name="category" defaultValue={product.category} required
          className="h-9 w-full rounded-md border bg-background px-3 text-sm focus-visible:outline-2 focus-visible:outline-ring">
          <option value="" disabled>Kies een rubriek</option>
          {productCategories.map((category) => <option key={category}>{category}</option>)}
        </select>
        <p className="text-sm text-muted-foreground">Dit bepaalt waar het product op de pagina Producten verschijnt.</p>
      </div>
      <fieldset className="space-y-3">
        <legend className="mb-2 font-medium">Productfoto’s</legend>
        <div className="space-y-2">
          <Input className="peer sr-only" ref={photoInput} id="photo" name="photo" type="file"
            accept="image/jpeg,image/png,image/webp" aria-describedby="photo-help"
            onChange={(event) => choosePhoto(event.target.files?.[0] ?? null)} />
          <Button asChild className="cursor-pointer peer-focus-visible:ring-2 peer-focus-visible:ring-ring">
            <Label htmlFor="photo">Foto uploaden</Label>
          </Button>
          {pendingPhoto && <p className="break-all text-sm">{pendingPhoto.name}</p>}
          <p id="photo-help" className="text-sm text-muted-foreground">JPEG, PNG of WebP, maximaal 25 MB. Eén foto per keer, maximaal acht per product.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {photoOrder.map((src, index) => (
            <div key={src} className="space-y-2 rounded-md border p-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded bg-muted">
                {photoSource(src) && (
                  <Image src={photoSource(src)} alt={`Productfoto ${index + 1}`} fill sizes="(min-width: 768px) 240px, 45vw" className="object-cover" />
                )}
              </div>
              <p className="text-sm font-medium">{index === 0 ? "Hoofdfoto" : `Foto ${index + 1}`}</p>
              <input type="hidden" name="photoOrder" value={src} />
              <div className="flex flex-wrap gap-1">
                {index > 0 && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => movePhoto(src, 0)}>
                    Maak hoofdfoto
                  </Button>
                )}
                {index > 1 && (
                  <Button type="button" variant="ghost" size="sm" aria-label={`Verplaats foto ${index + 1} naar voren`} onClick={() => movePhoto(src, index - 1)}>
                    Naar voren
                  </Button>
                )}
                {index < photoOrder.length - 1 && (
                  <Button type="button" variant="ghost" size="sm" aria-label={`Verplaats foto ${index + 1} naar achteren`} onClick={() => movePhoto(src, index + 1)}>
                    Naar achteren
                  </Button>
                )}
                <Button type="button" variant="ghost" size="sm" aria-label={`Verwijder foto ${index + 1}`} onClick={() => removePhoto(src)}>
                  Verwijderen
                </Button>
              </div>
            </div>
          ))}
        </div>
      </fieldset>
      <div className="space-y-2">
        <Label htmlFor="title">Productnaam</Label>
        <Input id="title" name="title" value={title} onChange={(event) => setTitle(event.target.value)} maxLength={100} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Omschrijving</Label>
        <Textarea id="description" name="description" defaultValue={product.description} rows={3} maxLength={3000} />
      </div>
      {product.id !== jacuzziId && (
        <div className="space-y-2">
          <Label htmlFor="features">Kenmerken (één per regel)</Label>
          <Textarea id="features" name="features" defaultValue={product.features.join("\n")} rows={5} />
        </div>
      )}
      <fieldset className="space-y-3">
        <legend className="mb-2 font-medium">Technische specificaties</legend>
        {specifications.map(({ key, label, value }, index) => (
          <div key={key} className="grid gap-2 rounded-md border p-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
            <div className="space-y-2">
              <Label htmlFor={`spec-label-${key}`}>Parameter</Label>
              <Input id={`spec-label-${key}`} name="specLabel" value={label} maxLength={160} required={Boolean(value.trim())}
                onChange={(event) => {
                  const nextLabel = event.target.value
                  setSpecifications((rows) => rows.map((row) => row.key === key ? { ...row, label: nextLabel } : row))
                }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`spec-value-${key}`}>Waarde</Label>
              <Input id={`spec-value-${key}`} name="specValue" value={value} maxLength={160} required={Boolean(label.trim())}
                onChange={(event) => {
                  const nextValue = event.target.value
                  setSpecifications((rows) => rows.map((row) => row.key === key ? { ...row, value: nextValue } : row))
                }} />
            </div>
            <Button type="button" variant="outline" aria-label={`Verwijder specificatie ${index + 1}`}
              onClick={() => setSpecifications((rows) => rows.filter((row) => row.key !== key))}>
              Verwijderen
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" disabled={specifications.length >= 30} onClick={() => {
          const key = nextSpecificationKey.current++
          setSpecifications((rows) => [...rows, { key, label: "", value: "" }])
        }}>
          Specificatie toevoegen
        </Button>
      </fieldset>
      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-2 font-medium">Prijs</legend>
        <div className="space-y-2">
          <Label htmlFor="price">Bedrag (€)</Label>
          <Input id="price" name="price" value={price} onChange={(event) => setPrice(event.target.value)} inputMode="decimal" maxLength={14} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="priceMode">Prijsweergave</Label>
          <select id="priceMode" name="priceMode" value={mode}
            onChange={(event) => setMode(event.target.value as PriceMode)}
            className="h-9 w-full rounded-md border bg-background px-3 text-sm focus-visible:outline-2 focus-visible:outline-ring">
            <option value="fixed">Vaste prijs</option>
            <option value="from">Vanafprijs</option>
          </select>
        </div>
      </fieldset>
      <section className="rounded-lg border bg-muted/30 p-4" aria-label="Voorbeeld vóór publicatie">
        <h3 className="mb-3 font-medium">Voorbeeld vóór publicatie</h3>
        <div className="flex items-center gap-4">
          {cover && (
            <div className="relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded bg-muted">
              <Image src={cover} alt="Hoofdfoto in het voorbeeld" fill sizes="96px" className="object-cover" />
            </div>
          )}
          <div className="min-w-0">
            <p className="break-words font-semibold">{title.trim() || "Productnaam ontbreekt"}</p>
            <p className="text-sm">{previewPrice ? formatProductPrice(previewPrice, mode) : "Voer een geldig bedrag in"}</p>
          </div>
        </div>
      </section>
    </AdminForm>
  )
}
