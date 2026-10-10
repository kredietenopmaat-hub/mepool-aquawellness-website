import Image from "next/image"
import Link from "next/link"

export default function JacuzziPage() {
  return (
    <main className="min-h-screen bg-background py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground mb-6">
          Jacuzzi
        </h1>
        <h2 className="font-serif text-3xl font-semibold text-foreground mb-4">
          Neptune V2
        </h2>
        <p className="text-lg text-muted-foreground">
          Nu voor slechts € 9.999!
        </p>
        <div className="mt-8 space-y-6">
          <Image
            src="/images/neptune-soir.jpeg"
            alt="Neptune V2 jacuzzi bij avond"
            width={4800}
            height={3584}
            className="w-full max-w-3xl h-auto rounded-lg"
          />
          <Image
            src="/images/Neptune-jacuzzi-market-spas (1).png"
            alt="Neptune V2 jacuzzi productafbeelding"
            width={7680}
            height={7680}
            className="w-full max-w-3xl h-auto rounded-lg"
          />
        </div>
        <section className="mt-12 max-w-3xl">
          <h2 className="font-serif text-3xl font-semibold text-foreground mb-6">
            Technische specificaties
          </h2>
          <dl className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-4">
            <dt className="font-medium text-foreground">Capaciteit</dt>
            <dd className="text-muted-foreground">2 ligplaatsen + 3 zitplaatsen</dd>
            <dt className="font-medium text-foreground">Afmetingen</dt>
            <dd className="text-muted-foreground">220 × 220 × 82 cm</dd>
            <dt className="font-medium text-foreground">Massagejets</dt>
            <dd className="text-muted-foreground">88</dd>
            <dt className="font-medium text-foreground">Massagepompen</dt>
            <dd className="text-muted-foreground">3 × 2 pk</dd>
            <dt className="font-medium text-foreground">Verwarming</dt>
            <dd className="text-muted-foreground">3 kW</dd>
            <dt className="font-medium text-foreground">Stroomaansluiting</dt>
            <dd className="text-muted-foreground">32 A</dd>
            <dt className="font-medium text-foreground">Waterbehandeling</dt>
            <dd className="text-muted-foreground">UV-C</dd>
            <dt className="font-medium text-foreground">Bediening</dt>
            <dd className="text-muted-foreground">Balboa TP600</dd>
            <dt className="font-medium text-foreground">Muziek</dt>
            <dd className="text-muted-foreground">Ingebouwde Bluetooth</dd>
          </dl>
        </section>
        <section className="mt-12 max-w-3xl">
          <h2 className="font-serif text-3xl font-semibold text-foreground mb-6">
            Plan uw showroombezoek
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/#contact" className="font-medium text-primary hover:underline">
              Via e-mail
            </Link>
            <a
              href="https://wa.me/32470246430?text=Hallo%2C%20ik%20heb%20interesse%20in%20de%20Neptune%20V2%20jacuzzi%20en%20wil%20graag%20een%20afspraak%20maken."
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              Via WhatsApp
            </a>
            <a href="tel:+32470246430" className="font-medium text-primary hover:underline">
              Telefonisch
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
