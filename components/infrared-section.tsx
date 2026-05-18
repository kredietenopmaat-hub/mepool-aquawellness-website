import Image from "next/image"
import { Heart, Flame, Timer } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const benefits = [
  {
    icon: Heart,
    title: "Gezondheidsvoordelen",
    description: "Verbetert bloedcirculatie, verlicht spierpijn en ondersteunt het immuunsysteem.",
  },
  {
    icon: Flame,
    title: "Diepe Ontspanning",
    description: "De zachte warmte dringt diep door en zorgt voor ultieme relaxatie.",
  },
  {
    icon: Timer,
    title: "Snel Opgewarmd",
    description: "Klaar voor gebruik in slechts 10-15 minuten dankzij efficiënte verwarming.",
  },
]

export function InfraredSection() {
  return (
    <section id="infrarood" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Visual with Image */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="/images/infrared-cabin.jpg"
                  alt="Premium infrarood cabine"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Temperature Badge */}
              <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-lg shadow-lg border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <Flame className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <span className="block font-semibold text-foreground">40-60°C</span>
                    <span className="text-sm text-muted-foreground">Aangenaam warm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="text-sm font-medium text-accent uppercase tracking-wider">Infrarood Cabines</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mt-4 mb-6 text-balance">
              Wellness ervaring in uw eigen huis
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed text-pretty">
              Ontdek de weldadige werking van infrarood warmte. Onze premium cabines bieden diepe ontspanning, gezondheidsvoordelen en passen perfect in elke ruimte.
            </p>
            
            <div className="space-y-6 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button size="lg" asChild>
              <Link href="/producten#infrarood">Ontdek onze modellen</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
