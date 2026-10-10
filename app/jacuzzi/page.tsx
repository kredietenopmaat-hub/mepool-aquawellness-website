import Image from "next/image"

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
      </div>
    </main>
  )
}
