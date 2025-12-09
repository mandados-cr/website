import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 bg-white/95 backdrop-blur z-40 border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4">
          {/* Small: logomark */}
          <div className="md:hidden">
            <Image
              src="/logos/logo.png"
              alt="Mandados"
              width={40}
              height={40}
              loading="eager"
            />
          </div>
          {/* Desktop: stacked logo with tagline - avoid horizontal files */}
          <div className="hidden md:block">
            <Image
              src="/logos/horizontal-cropped.png"
              alt="Mandados — Hacemos que suceda"
              width={285}
              height={69}
              loading="eager"
              style={{width: "285px", height: "69px"}}
            />
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/#servicios"
            className="text-gray-700 hover:text-secondary font-body"
          >
            Servicios
          </Link>
          <Link
            href="/#precios"
            className="text-gray-700 hover:text-secondary font-body"
          >
            Precios
          </Link>
          <Link
            href="/#contacto"
            className="text-gray-700 hover:text-secondary font-body"
          >
            Contacto
          </Link>
          <Link
            href="/#contacto"
            className="ml-4 inline-flex items-center px-5 py-3 rounded-2xl bg-primary text-white font-rounded font-semibold shadow-soft hover:brightness-95"
          >
            Pedir ahora
          </Link>
        </nav>

        <div className="md:hidden">
          <Link
            href="/#contacto"
            className="inline-flex items-center px-3 py-2 rounded-lg bg-primary text-white font-rounded"
          >
            Pedir
          </Link>
        </div>
      </div>
    </header>
  );
}
