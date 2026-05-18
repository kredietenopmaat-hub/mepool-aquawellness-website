import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 lg:pt-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/pool-hero.jpg"
          alt="Luxe zwembad bij avondschemering"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>
      
      {/* Water wave pattern overlay */}
      <div className="absolute inset-0 opacity-30">
        <svg className="absolute bottom-0 w-full h-64" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="currentColor"
            className="text-accent/20"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Premium Zwembad & Wellness Specialist
          </div>

          {/* Heading */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-tight mb-6 text-balance">
            Perfecte harmonie tussen water en welzijn
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
            AquaWellness brengt luxe en comfort naar uw thuis met professioneel zwembadonderhoud, warmtepompen en infrarood cabines. Ontdek de ultieme wellness ervaring.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="min-w-[200px]">
              <Link href="#contact">
                Vraag offerte aan
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="min-w-[200px]">
              <Link href="#diensten">
                Ontdek onze diensten
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-6">Vertrouwd door honderden tevreden klanten in België</p>
            <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
              <div className="text-center">
                <span className="block text-3xl font-serif font-semibold text-foreground">15+</span>
                <span className="text-sm text-muted-foreground">Jaar Ervaring</span>
              </div>
              <div className="text-center">
                <span className="block text-3xl font-serif font-semibold text-foreground">500+</span>
                <span className="text-sm text-muted-foreground">Projecten</span>
              </div>
              <div className="text-center">
                <span className="block text-3xl font-serif font-semibold text-foreground">100%</span>
                <span className="text-sm text-muted-foreground">Klanttevredenheid</span>
              </div>
              <div className="text-center">
                <span className="block text-3xl font-serif font-semibold text-foreground">24/7</span>
                <span className="text-sm text-muted-foreground">Service Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
