import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowRight } from "lucide-react"

import { defaults, jacuzziId } from "@/lib/catalog"
import { readProduct } from "@/lib/catalog-store"

export const dynamic = "force-dynamic"

export default async function ProductenPage() {
  const products = await Promise.all(
    defaults.filter((product) => product.id !== jacuzziId).map((product) => readProduct(product)),
  )

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-sm font-medium text-accent uppercase tracking-wider">Ons Assortiment</span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground mt-4 mb-6 text-balance">
              Premium Producten voor Zwembad &amp; Wellness
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground text-pretty">
              Ontdek ons uitgebreide assortiment van hoogwaardige producten. Van energie-efficiënte warmtepompen tot luxueuze infrarood cabines.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16 lg:space-y-24">
            {products.map((product, index) => (
              <div 
                key={product.id} 
                id={product.id}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={product.images[0].src}
                      alt={product.images[0].alt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                    {product.badge && (
                      <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                        {product.badge}
                      </Badge>
                    )}
                  </div>
                  {product.images.length > 1 && (
                    <div className="mt-3 grid grid-cols-3 gap-3">
                      {product.images.slice(1).map((image) => (
                        <Image key={image.src} {...image} className="aspect-[4/3] w-full rounded object-cover" />
                      ))}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2">
                  <span className="text-sm font-medium text-accent uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground mt-2 mb-4">
                    {product.title}
                  </h2>
                  <p className="text-muted-foreground text-lg mb-6 text-pretty">
                    {product.description}
                  </p>
                  
                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-foreground">
                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {product.specifications.length > 0 && (
                    <dl className="mb-8 space-y-2">
                      {product.specifications.map(({ label, value }) => (
                        <div key={label} className="grid grid-cols-2 gap-3">
                          <dt className="font-medium">{label}</dt>
                          <dd className="text-muted-foreground">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  {/* Price & CTA */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div>
                      <span className="text-sm text-muted-foreground">Vanaf</span>
                      <p className="text-3xl font-semibold text-foreground">
                        &euro;{product.price}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Button asChild size="lg">
                        <Link href="/#contact">
                          Vraag offerte aan
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="lg" asChild>
                        <Link href={`/producten/${product.id}`}>
                          Meer info
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold mb-6 text-balance">
            Niet zeker welk product bij u past?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 text-pretty">
            Onze experts helpen u graag met persoonlijk advies. Plan een gratis consultatie en ontdek welke oplossingen het beste bij uw situatie passen.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/afspraak">
                Boek een adviesgesprek
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <a href="tel:+32123456789">
                Bel ons direct
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
