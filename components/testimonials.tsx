import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Jan Peeters",
    location: "Antwerpen",
    rating: 5,
    text: "Al 5 jaar vertrouwen we op AquaWellness voor ons zwembadonderhoud. Altijd stipt, professioneel en het water is kristalhelder. Absolute aanrader!",
  },
  {
    name: "Marie Claes",
    location: "Gent",
    rating: 5,
    text: "De warmtepomp installatie verliep vlekkeloos. Het team was deskundig en nam de tijd om alles uit te leggen. We genieten nu veel langer van ons zwembad.",
  },
  {
    name: "Thomas De Vries",
    location: "Brugge",
    rating: 5,
    text: "Onze infrarood cabine is een van de beste aankopen ooit. De service en begeleiding van AquaWellness was uitstekend van begin tot eind.",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 lg:py-32 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-sm font-medium text-accent uppercase tracking-wider">Klantenervaringen</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mt-4 mb-6 text-balance">
            Wat onze klanten zeggen
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Ontdek waarom honderden families in België kiezen voor AquaWellness.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-lg border border-border hover:shadow-lg transition-shadow"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-accent/30 mb-4" />
              
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground mb-6 leading-relaxed">
                {`"${testimonial.text}"`}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-medium text-primary">{testimonial.name.charAt(0)}</span>
                </div>
                <div>
                  <span className="block font-medium text-foreground">{testimonial.name}</span>
                  <span className="text-sm text-muted-foreground">{testimonial.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-card border border-border">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              <strong className="text-foreground">4.9/5</strong> gemiddelde beoordeling
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
