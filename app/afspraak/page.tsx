import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { defaultBookingUrl, googleBookingUrl, readBooking } from "@/lib/catalog-store"

export const dynamic = "force-dynamic"

export default async function AfspraakPage() {
  const booking = await readBooking().catch((error) => {
    console.error("Could not read Aqua Wellness booking settings", error)
    return null
  })
  const url = googleBookingUrl(booking?.value.url ?? defaultBookingUrl)

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="mx-auto max-w-3xl px-4 pb-24 pt-32 sm:px-6 lg:pt-40">
        <h1 className="font-serif text-4xl font-semibold sm:text-5xl">Boek een afspraak met een expert</h1>
        <p className="mt-5 text-lg text-muted-foreground">
          Bespreek uw zwembad, jacuzzi of wellnessproject met een expert van Aqua Wellness.
        </p>
        <p className="mt-4 text-muted-foreground">
          {url
            ? "Bekijk de beschikbare momenten in Google Agenda en kies het tijdstip dat u past."
            : "Online boeken is momenteel niet beschikbaar. Bel ons of neem contact op om een afspraak te maken."}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          {url ? (
            <Button size="lg" asChild><a href={url}>Bekijk beschikbare tijden</a></Button>
          ) : (
            <Button size="lg" asChild><a href="tel:+32470246430">Bel +32 470 24 64 30</a></Button>
          )}
          <Button size="lg" variant="outline" asChild><Link href="/#contact">Neem contact op</Link></Button>
        </div>
      </section>
      <Footer />
    </main>
  )
}
