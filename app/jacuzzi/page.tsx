import Image from "next/image"
import Link from "next/link"

import { defaults, jacuzziId } from "@/lib/catalog"
import { readProduct } from "@/lib/catalog-store"

export const dynamic = "force-dynamic"

export default async function JacuzziPage() {
  const product = await readProduct(defaults.find(({ id }) => id === jacuzziId)!)

  return (
    <main className="min-h-screen bg-background py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground mb-6">
          Jacuzzi
        </h1>
        <h2 className="font-serif text-3xl font-semibold text-foreground mb-4">
          {product.title}
        </h2>
        <p className="text-lg text-muted-foreground">
          Nu voor slechts € {product.price}!
        </p>
        {product.description && <p className="mt-4 max-w-3xl text-muted-foreground">{product.description}</p>}
        <div className="mt-8 space-y-6">
          {product.images.map((image) => (
            <Image key={image.src} {...image} className="w-full max-w-3xl h-auto rounded-lg" />
          ))}
        </div>
        <section className="mt-12 max-w-3xl">
          <h2 className="font-serif text-3xl font-semibold text-foreground mb-6">
            Technische specificaties
          </h2>
          <dl className="space-y-4">
            {product.specifications.map(({ label, value }) => (
              <div key={label} className="grid grid-cols-2 gap-x-4 sm:gap-x-8">
                <dt className="font-medium text-foreground">{label}</dt>
                <dd className="text-muted-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section className="mt-12 max-w-3xl">
          <h2 className="font-serif text-3xl font-semibold text-foreground mb-6">
            Plan uw showroombezoek
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/afspraak" className="font-medium text-primary hover:underline">
              Boek online een afspraak met een expert
            </Link>
            <Link href="/#contact" className="font-medium text-primary hover:underline">
              Via e-mail
            </Link>
            <a
              href={`https://wa.me/32470246430?text=${encodeURIComponent(`Hallo, ik heb interesse in ${product.title} en wil graag een afspraak maken.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              Via WhatsApp
            </a>
            <a href="tel:+32470246430" className="font-medium text-primary hover:underline">
              Telefonisch: +32 470 24 64 30
            </a>
          </div>
        </section>
        <Link href="/" className="inline-block mt-12 font-medium text-primary hover:underline">
          ← Terug naar de homepage
        </Link>
      </div>
    </main>
  )
}
