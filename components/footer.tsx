import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"

const footerLinks = {
  diensten: [
    { label: "Zwembad Onderhoud", href: "#onderhoud" },
    { label: "Sauna Installatie", href: "#diensten" },
    { label: "Wellness Renovatie", href: "#diensten" },
    { label: "Jacuzzi Service", href: "#diensten" },
  ],

  support: [
    { label: "Contact", href: "#contact" },
    { label: "Service Aanvraag", href: "#contact" },
    { label: "WhatsApp", href: "https://wa.me/32471040416" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer */}
        <div className="py-12 lg:py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/images/logo.png"
                alt="AquaWellness BV"
                width={160}
                height={53}
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>

            <p className="text-sm opacity-80 mb-6">
              AquaWellness BV gespecialiseerd in zwembad onderhoud,
              sauna installatie, wellness renovatie en jacuzzi service
              in Antwerpen, Mechelen, Vlaams-Brabant en Brussel.
            </p>

            <div className="space-y-3">

              <a
                href="tel:+32471040416"
                className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition-opacity"
              >
                <Phone className="w-4 h-4" />
                +32 471 040 416
              </a>

              <a
                href="mailto:info@mepool.be"
                className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition-opacity"
              >
                <Mail className="w-4 h-4" />
                info@mepool.be
              </a>

              <div className="flex items-start gap-2 text-sm opacity-80">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Dorp 111, 2820 Bonheiden</span>
              </div>

            </div>
          </div>

          {/* Diensten */}
          <div>
            <h4 className="font-semibold mb-4">Diensten</h4>

            <ul className="space-y-3">
              {footerLinks.diensten.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Contact & Support</h4>

            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex gap-4 mt-6">

              <a
                href="https://wa.me/32471040416"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                WhatsApp
              </a>

              <a
                href="#"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Facebook
              </a>

              <a
                href="#"
                className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Instagram
              </a>

            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-primary-foreground/20 flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="text-sm opacity-80">
            © {new Date().getFullYear()} AquaWellness BV.
            Alle rechten voorbehouden.
          </p>

          <div className="flex items-center gap-6">

            <Link
              href="#"
              className="text-sm opacity-80 hover:opacity-100 transition-opacity"
            >
              Privacybeleid
            </Link>

            <Link
              href="#"
              className="text-sm opacity-80 hover:opacity-100 transition-opacity"
            >
              Algemene Voorwaarden
            </Link>

          </div>
        </div>
      </div>
    </footer>
  )
}