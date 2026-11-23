import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { defaults, jacuzziId, type Product } from "@/lib/catalog"
import { adminConfigured, adminSignedIn } from "@/lib/admin-session"
import { defaultBookingUrl, productPath, readBooking, readDocument, storageConfigured } from "@/lib/catalog-store"
import { login, logout, updateBooking } from "./actions"
import { AdminForm } from "./admin-form"
import { ProductEditor } from "./product-editor"

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
            {saved === "product" && <p role="status" className="mb-5 text-primary">Product gepubliceerd.</p>}
            <ProductEditor key={`${product.id}:${document?.etag ?? ""}`} product={product} etag={document?.etag ?? ""} />
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
