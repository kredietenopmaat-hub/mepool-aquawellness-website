import { Award, Clock, Shield, Users } from "lucide-react"

const reasons = [
  {
    icon: Award,
    title: "Premium Kwaliteit",
    description: "Alleen de beste materialen en apparatuur van toonaangevende merken voor duurzame resultaten.",
  },
  {
    icon: Clock,
    title: "Snelle Service",
    description: "24/7 bereikbaar voor noodgevallen. Binnen 24 uur ter plaatse voor regulier onderhoud.",
  },
  {
    icon: Shield,
    title: "Garantie & Verzekering",
    description: "Volledig verzekerd en garantie op al onze werkzaamheden voor uw gemoedsrust.",
  },
  {
    icon: Users,
    title: "Ervaren Team",
    description: "Gecertificeerde specialisten met jarenlange ervaring in zwembad en wellness installaties.",
  },
]

export function WhyChooseUs() {
  return (
    <section id="over-ons" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <span className="text-sm font-medium text-accent uppercase tracking-wider">Waarom AquaWellness</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mt-4 mb-6 text-balance">
              Uw vertrouwde partner voor zwembad en wellness
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed text-pretty">
              Met meer dan 15 jaar ervaring in de Belgische markt begrijpen wij wat u verwacht. Kwaliteit, betrouwbaarheid en persoonlijke service staan bij ons centraal.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {reasons.map((reason, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <reason.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">{reason.title}</h3>
                    <p className="text-sm text-muted-foreground">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-primary/20 via-accent/10 to-secondary overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                      <path d="M7 14.5C7 14.5 8.5 16.5 12 16.5C15.5 16.5 17 14.5 17 14.5" />
                      <circle cx="12" cy="9" r="2" />
                    </svg>
                  </div>
                  <p className="font-serif text-2xl font-semibold text-foreground mb-2">{"\"Excellente service\""}</p>
                  <p className="text-muted-foreground">Meer dan 500 tevreden klanten</p>
                </div>
              </div>
            </div>
            
            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-lg shadow-lg border border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                  <span className="text-accent-foreground font-bold text-lg">15</span>
                </div>
                <div>
                  <span className="block font-semibold text-foreground">Jaar</span>
                  <span className="text-sm text-muted-foreground">Ervaring</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
