import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { defaults, jacuzziId, type Product } from "@/lib/catalog"
import { adminConfigured, adminSignedIn } from "@/lib/admin-session"
import { defaultBookingUrl, productPath, readBooking, readDocument, storageConfigured } from "@/lib/catalog-store"
import { login, logout, updateBooking, updateProduct } from "./actions"
import { AdminForm } from "./admin-form"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Beheer | Aqua Wellness",
  robots: { index: false, follow: false },
}

export default async function AdminPage({ searchParams }: {
  searchParams: Promise<{ product?: string; saved?: string }>
}) {
  if (!adminConfigured()) return <AdminFrame><p>Het beheer is nog niet ingesteld.</p></AdminFrame>

  if (!await adminSignedIn()) {
    return (
      <AdminFrame>
        <div className="max-w-sm">
          <AdminForm action={login} submit="Aanmelden">
            <div className="space-y-2">
              <Label htmlFor="password">Wachtwoord</Label>
              <Input id="password" name="password" type="password" autoComplete="current-password" maxLength={512} required />
            </div>
          </AdminForm>
        </div>
      </AdminFrame>
    )
  }

  const query = await searchParams
  const selected = defaults.find(({ id }) => id === query.product) ?? defaults[0]

  return (
    <AdminFrame>
      <div className="mb-6 flex justify-end">
        <form action={logout}><Button variant="outline" type="submit">Afmelden</Button></form>
      </div>
      {!storageConfigured() ? <p>De opslag is nog niet ingesteld.</p> : (
        <CatalogEditor selected={selected} saved={query.saved} />
      )}
    </AdminFrame>
  )
}

function AdminFrame({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Link href="/" className="text-sm text-primary hover:underline">Aqua Wellness</Link>
      <h1 className="mb-8 mt-3 font-serif text-4xl font-semibold">Websitebeheer</h1>
      {children}
    </main>
  )
}

async function CatalogEditor({ selected, saved }: { selected: Product; saved?: string }) {
  try {
    const [document, booking] = await Promise.all([
      readDocument<Product>(productPath(selected.id)),
      readBooking(),
    ])
    const product = document?.value ?? selected

    return (
      <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
        <nav aria-label="Producten" className="flex flex-wrap content-start gap-2 lg:flex-col">
          {defaults.map((item) => (
            <Button variant={item.id === selected.id ? "default" : "outline"} asChild key={item.id}>
              <Link aria-current={item.id === selected.id ? "page" : undefined} href={`/admin?product=${item.id}`}>{item.title}</Link>
            </Button>
          ))}
        </nav>
        <div className="space-y-10">
          <section className="rounded-xl border p-5 sm:p-7">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-serif text-2xl font-semibold">{product.title}</h2>
              <Link className="text-sm text-primary hover:underline" href={product.id === jacuzziId ? "/jacuzzi" : `/producten#${product.id}`}>Bekijk productpagina</Link>
            </div>
            {saved === "product" && <p role="status" className="mb-5 text-primary">Product opgeslagen.</p>}
            <AdminForm key={`${product.id}:${document?.etag ?? ""}`} action={updateProduct} submit="Product opslaan" photo>
              <input type="hidden" name="id" value={product.id} />
              <input type="hidden" name="etag" value={document?.etag ?? ""} />
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Productnaam</Label>
                  <Input id="title" name="title" defaultValue={product.title} maxLength={100} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Prijs (€)</Label>
                  <Input id="price" name="price" defaultValue={product.price} inputMode="decimal" maxLength={14} required />
                </div>
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
              <div className="space-y-2">
                <Label htmlFor="specifications">Technische specificaties (één per regel, <span className="font-normal">Naam: waarde</span>)</Label>
                <Textarea id="specifications" name="specifications" rows={5}
                  defaultValue={product.specifications.map(({ label, value }) => `${label}: ${value}`).join("\n")} />
              </div>
              <fieldset className="space-y-3">
                <legend className="mb-2 font-medium">Productfoto’s</legend>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {product.images.map((image, index) => (
                    <div key={image.src} className="space-y-2">
                      <Image {...image} className="aspect-[4/3] w-full rounded object-cover" />
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" name="removePhoto" value={image.src} aria-label={`Verwijder foto ${index + 1}`} />
                        Verwijderen
                      </label>
                      {index === 0 && <p className="text-sm text-muted-foreground">Hoofdfoto</p>}
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="photo">Voeg een foto toe</Label>
                  <Input id="photo" name="photo" type="file" accept="image/jpeg,image/png,image/webp" />
                  <p className="text-sm text-muted-foreground">JPEG, PNG of WebP, maximaal 25 MB per foto.</p>
                </div>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="cover" />Nieuwe foto als hoofdfoto gebruiken</label>
              </fieldset>
            </AdminForm>
          </section>
          <section className="rounded-xl border p-5 sm:p-7">
            <h2 className="mb-4 font-serif text-2xl font-semibold">Expertadvies boeken</h2>
            {saved === "booking" && <p role="status" className="mb-4 text-primary">Boekingslink opgeslagen.</p>}
            <AdminForm key={booking?.etag ?? "booking"} action={updateBooking} submit="Boekingslink opslaan">
              <input type="hidden" name="etag" value={booking?.etag ?? ""} />
              <div className="space-y-2">
                <Label htmlFor="url">Openbare Google Agenda-boekingslink</Label>
                <Input id="url" name="url" type="url" defaultValue={booking?.value.url ?? defaultBookingUrl} maxLength={2048} placeholder="https://calendar.app.google/…" />
                <p className="text-sm text-muted-foreground">Kopieer de link via Boekingspagina’s in Google Agenda.</p>
              </div>
            </AdminForm>
          </section>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Could not read Aqua Wellness admin data", error)
    return <p role="alert">De gegevens konden niet worden geladen. Probeer het later opnieuw.</p>
  }
}
