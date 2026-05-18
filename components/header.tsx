"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Diensten", href: "/#diensten" },
    { label: "Onderhoud", href: "/#onderhoud" },
    { label: "Producten", href: "/producten" },
    { label: "Over Ons", href: "/#over-ons" },
    { label: "Contact", href: "/#contact" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a3a5c] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="AquaWellness - Zwembad, Jacuzzi, Infrarood Cabines"
              width={220}
              height={73}
              className="h-16 lg:h-20 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+32123456789" className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors">
              <Phone className="w-4 h-4" />
              <span>+32 471 040 416</span>
            </a>
            <Button asChild className="bg-white text-[#1a3a5c] hover:bg-white/90">
              <Link href="#contact">Contacteer ons</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/20">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-white/80 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/20">
                <a href="tel:+32123456789" className="flex items-center gap-2 text-sm text-white/80 mb-4">
                  <Phone className="w-4 h-4" />
                  <span>+32 123 456 789</span>
                </a>
                <Button asChild className="w-full bg-white text-[#1a3a5c] hover:bg-white/90">
                  <Link href="#contact">Contacteer ons</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
