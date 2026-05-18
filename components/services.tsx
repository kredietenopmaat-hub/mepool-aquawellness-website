import { Wrench, Thermometer, Shield, Sun } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: Wrench,
    title: "Zwembad Onderhoud",
    description: "Professioneel onderhoud voor kristalhelder water het hele jaar door. Van wekelijkse controles tot seizoensgebonden service.",
    href: "/#onderhoud",
  },
  {
    icon: Thermometer,
    title: "Warmtepompen",
    description: "Energie-efficiënte warmtepompen voor een aangenaam verwarmde zwembad. Bespaar tot 80% op verwarmingskosten.",
    href: "/producten#warmtepompen",
  },
  {
    icon: Shield,
    title: "Zwembad Rolluiken",
    description: "Veilige en elegante rolluiken die uw zwembad beschermen en de warmte vasthouden. Automatisch of manueel bedienbaar.",
    href: "/producten#rolluiken",
  },
  {
    icon: Sun,
    title: "Infrarood Cabines",
    description: "Premium infrarood cabines voor diepe ontspanning en gezondheidsvoordelen. Ontdek wellness in uw eigen huis.",
    href: "/producten#infrarood",
  },
]

export function Services() {
  return (
    <section id="diensten" className="py-20 lg:py-32 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-sm font-medium text-accent uppercase tracking-wider">Onze Diensten</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mt-4 mb-6 text-balance">
            Compleet aanbod voor uw zwembad en wellness
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Van dagelijks onderhoud tot complete wellness installaties. Wij bieden alles wat u nodig heeft voor de perfecte zwembadervaring.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="group bg-card p-8 lg:p-10 rounded-lg border border-border hover:border-accent/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-xl lg:text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center mt-4 text-sm font-medium text-primary">
                    Meer informatie
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
