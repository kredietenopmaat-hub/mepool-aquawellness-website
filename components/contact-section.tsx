"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react"

const contactInfo = [
  {
    icon: Phone,
    label: "Telefoon",
    value: "+32 471 040 416",
    href: "tel:+32471040416",
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "info@mepool.be",
    href: "mailto:info@mepool.be",
  },
  {
    icon: MapPin,
    label: "Adres",
    value: "Dorp 111, 2820 Bonheiden",
    href: "#",
  },
  {
    icon: Clock,
    label: "Openingsuren",
    value: "WOE - FRI 16U-20U | ZA 10U-16U",
    href: "#",
  },
]

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <>
      <section id="contact" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-sm font-medium text-accent uppercase tracking-wider">
              Contact
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mt-4 mb-6 text-balance">
              Klaar om te beginnen?
            </h2>

            <p className="text-lg text-muted-foreground text-pretty">
              Neem contact met ons op voor een vrijblijvende offerte of advies.
              AquaWellness BV staat klaar om u te helpen.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">

            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">
                  Neem contact op
                </h3>

                <p className="text-muted-foreground mb-8">
                  Wij zijn gespecialiseerd in zwembad onderhoud,
                  sauna installatie, wellness renovatie
                  en jacuzzi service in Antwerpen,
                  Mechelen, Vlaams-Brabant en Brussel.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-start gap-4 group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>

                    <div>
                      <span className="block text-sm text-muted-foreground">
                        {item.label}
                      </span>

                      <span className="text-foreground font-medium group-hover:text-primary transition-colors">
                        {item.value}
                      </span>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">

                <a
                  href="https://wa.me/32471040416"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-lg font-medium transition-colors"
                >
                  WhatsApp
                </a>

                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium transition-colors"
                >
                  Facebook
                </a>

                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-3 rounded-lg font-medium transition-colors"
                >
                  Instagram
                </a>

              </div>
            </div>

            <div className="lg:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="bg-card p-8 rounded-lg border border-border"
              >
                <h3 className="font-serif text-xl font-semibold text-foreground mb-6">
                  Stuur ons een bericht
                </h3>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Naam *
                    </label>

                    <Input
                      id="name"
                      type="text"
                      placeholder="Uw naam"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      E-mail *
                    </label>

                    <Input
                      id="email"
                      type="email"
                      placeholder="uw@email.be"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Telefoon
                    </label>

                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+32 XXX XX XX XX"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Onderwerp *
                    </label>

                    <Input
                      id="subject"
                      type="text"
                      placeholder="Waarover gaat uw vraag?"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Bericht *
                  </label>

                  <Textarea
                    id="message"
                    placeholder="Beschrijf uw vraag of wens..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  <Send className="w-4 h-4 mr-2" />
                  Verstuur bericht
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

         </>
  )
}