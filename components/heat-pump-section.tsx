import Image from "next/image"
import { Zap, Leaf, Volume2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const benefits = [
  {
    icon: Zap,
    title: "80% Energiebesparing",
    description: "Verlaag uw energiekosten drastisch met onze efficiënte warmtepompen.",
  },
  {
    icon: Leaf,
    title: "Milieuvriendelijk",
    description: "Gebruik de natuurlijke warmte uit de lucht voor duurzame verwarming.",
  },
  {
    icon: Volume2,
    title: "Fluisterstil",
    description: "Moderne technologie voor een rustige werking zonder geluidsoverlast.",
  },
]

export function HeatPumpSection() {
  return (
    <section id="warmtepompen" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Visual with Image */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="/images/heat-pump.jpg"
                  alt="Zwembad warmtepomp installatie"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floating Efficiency Card */}
              <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground p-6 rounded-lg shadow-lg">
                <div className="text-center">
                  <span className="block text-3xl font-bold">COP 5.0</span>
                  <span className="text-sm opacity-90">Efficiëntie</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="text-sm font-medium text-accent uppercase tracking-wider">Warmtepompen</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mt-4 mb-6 text-balance">
              Energiezuinig verwarmen met lucht-water warmtepompen
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed text-pretty">
              Geniet langer van uw zwembad met onze hoogwaardige warmtepompen. Verleng het zwemseizoen en bespaar tot 80% op verwarmingskosten vergeleken met traditionele methoden.
            </p>
            
            <div className="space-y-6 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button size="lg" asChild>
              <Link href="/producten#warmtepompen">Bekijk warmtepompen</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
