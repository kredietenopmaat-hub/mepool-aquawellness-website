import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { WhyChooseUs } from "@/components/why-choose-us"
import { MaintenanceSection } from "@/components/maintenance-section"
import { HeatPumpSection } from "@/components/heat-pump-section"
import { PoolCoverSection } from "@/components/pool-cover-section"
import { InfraredSection } from "@/components/infrared-section"
import { Testimonials } from "@/components/testimonials"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <WhyChooseUs />
      <MaintenanceSection />
      <HeatPumpSection />
      <PoolCoverSection />
      <InfraredSection />
      <Testimonials />
      <ContactSection />
      <Footer />
    </main>
  )
}
