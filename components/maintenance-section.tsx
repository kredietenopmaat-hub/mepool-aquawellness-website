import Image from "next/image"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const maintenanceFeatures = [
  "Wekelijkse wateranalyse en behandeling",
  "Filterreiniging en pomponderhoud",
  "Seizoensgebonden opstart en winterklaar maken",
  "Chemische balans optimalisatie",
  "Preventief onderhoud van alle componenten",
  "24/7 noodservice beschikbaar",
]

export function MaintenanceSection() {
  return (
    <section id="onderhoud" className="py-20 lg:py-32 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <span className="text-sm font-medium opacity-80 uppercase tracking-wider">Zwembad Onderhoud</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mt-4 mb-6 text-balance">
              Kristalhelder water, het hele jaar door
            </h2>
            <p className="text-lg opacity-90 mb-8 leading-relaxed text-pretty">
              Ons professioneel onderhoudsteam zorgt ervoor dat uw zwembad altijd in perfecte staat is. Van wekelijkse controles tot complete seizoensservice, wij nemen alle zorgen uit handen.
            </p>
            
            <ul className="space-y-4 mb-8">
              {maintenanceFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 opacity-90" />
                  <span className="opacity-90">{feature}</span>
                </li>
              ))}
            </ul>

            <Button size="lg" variant="secondary" asChild>
              <Link href="#contact">Plan onderhoud</Link>
            </Button>
          </div>

          {/* Visual with Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/images/pool-maintenance.jpg"
                alt="Professioneel zwembad onderhoud"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-lg shadow-lg">
              <div className="text-center">
                <span className="block text-3xl font-bold text-foreground">98%</span>
                <span className="text-sm text-muted-foreground">Klant behoud</span>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-accent text-accent-foreground p-6 rounded-lg shadow-lg">
              <div className="text-center">
                <span className="block text-3xl font-bold">500+</span>
                <span className="text-sm opacity-90">Zwembaden</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
