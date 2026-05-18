import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"

const footerLinks = {
  diensten: [
    { label: "Zwembad Onderhoud", href: "#onderhoud" },
    { label: "Warmtepompen", href: "#warmtepompen" },
    { label: "Zwembad Rolluiken", href: "#rolluiken" },
    { label: "Infrarood Cabines", href: "#infrarood" },
  ],
  bedrijf: [
    { label: "Over Ons", href: "#over-ons" },
    { label: "Onze Projecten", href: "#" },
    { label: "Vacatures", href: "#" },
    { label: "Blog", href: "#" },
  ],
  support: [
    { label: "Contact", href: "#contact" },
    { label: "FAQ", href: "#" },
    { label: "Garantie", href: "#" },
    { label: "Service Aanvraag", href: "#contact" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 lg:py-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/images/logo.png"
                alt="AquaWellness"
                width={160}
                height={53}
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm opacity-80 mb-6 max-w-xs">
              Uw specialist in zwembad onderhoud, warmtepompen, rolluiken en infrarood cabines in België.
            </p>
            <div className="space-y-3">
              <a href="tel:+32123456789" className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition-opacity">
                <Phone className="w-4 h-4" />
                +32 123 456 789
              </a>
              <a href="mailto:info@mepool.be" className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition-opacity">
                <Mail className="w-4 h-4" />
                info@mepool.be
              </a>
              <div className="flex items-start gap-2 text-sm opacity-80">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Wellness Straat 123, 2000 Antwerpen</span>
              </div>
            </div>
          </div>

          {/* Diensten */}
          <div>
            <h4 className="font-semibold mb-4">Diensten</h4>
            <ul className="space-y-3">
              {footerLinks.diensten.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bedrijf */}
          <div>
            <h4 className="font-semibold mb-4">Bedrijf</h4>
            <ul className="space-y-3">
              {footerLinks.bedrijf.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h4 className="font-semibold mb-4">Nieuwsbrief</h4>
            <p className="text-sm opacity-80 mb-4">
              Ontvang tips, aanbiedingen en nieuws over zwembad en wellness.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Uw e-mailadres"
                className="px-4 py-2 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 text-sm focus:outline-none focus:border-primary-foreground/40"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-primary-foreground text-primary font-medium text-sm hover:bg-primary-foreground/90 transition-colors"
              >
                Inschrijven
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-primary-foreground/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm opacity-80">
            © {new Date().getFullYear()} AquaWellness. Alle rechten voorbehouden.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
              Privacybeleid
            </Link>
            <Link href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
              Algemene Voorwaarden
            </Link>
            <Link href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
