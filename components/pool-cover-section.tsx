import Image from "next/image"
import { Shield, Thermometer, Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: Shield,
    title: "Veiligheid",
    description: "Bescherm kinderen en huisdieren met een automatisch sluitend rolluik.",
  },
  {
    icon: Thermometer,
    title: "Warmtebehoud",
    description: "Isolerende lamellen houden de warmte vast en verlagen verwarmingskosten.",
  },
  {
    icon: Sparkles,
    title: "Hygiëne",
    description: "Voorkom vervuiling door bladeren, insecten en andere ongewenste elementen.",
  },
]

export function PoolCoverSection() {
  return (
    <section id="rolluiken" className="py-20 lg:py-32 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <span className="text-sm font-medium text-accent uppercase tracking-wider">Zwembad Rolluiken</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mt-4 mb-6 text-balance">
              Elegante bescherming voor uw investering
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed text-pretty">
              Onze premium rolluiken combineren veiligheid, energiebesparing en stijl. Kies uit automatische of manuele bediening, in diverse kleuren passend bij uw tuinontwerp.
            </p>
            
            <div className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/producten#rolluiken">Bekijk modellen</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/#contact">Vraag offerte aan</Link>
              </Button>
            </div>
          </div>

          {/* Visual with Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/images/pool-cover.jpg"
                alt="Automatisch zwembad rolluik"
                fill
                className="object-cover"
              />
            </div>

            {/* Feature Badge */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-card px-6 py-4 rounded-lg shadow-lg border border-border">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <span className="block text-2xl font-serif font-bold text-foreground">10</span>
                  <span className="text-xs text-muted-foreground">Jaar garantie</span>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="text-center">
                  <span className="block text-2xl font-serif font-bold text-foreground">Auto</span>
                  <span className="text-xs text-muted-foreground">Bediening</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
