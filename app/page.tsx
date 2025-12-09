import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <section id="servicios" className="bg-secondary/10 py-16">
          <div className="max-w-6xl mx-auto px-6">
            <Services />
          </div>
        </section>
        <section id="precios" className="bg-graphite/100 py-16">
          <div className="max-w-4xl mx-auto px-6">
            <Pricing />
          </div>
        </section>
        <section id="contacto" className="bg-secondary/10 py-16">
          <div className="max-w-3xl mx-auto px-6">
            <ContactForm />
          </div>
        </section>
      </main>
      <footer className="border-t border-graphite/10 py-8 text-center text-sm text-gray-600">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image src="/logos/horizontal-with-tagline.png" alt="Mandados" width={190} height={46} style={{width: "285px", height: "69px"}} loading="lazy"/>
          </div>
          <div>© {new Date().getFullYear()} Mandados — Todos los derechos reservados</div>
        </div>
      </footer>
    </>
  );
}
