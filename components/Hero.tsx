import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
      <div className="w-full md:w-1/2">
        <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-rounded font-semibold mb-3">Nuevo • Servicio ágil</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight font-display">
          Entregas y mandados ultra-rápidos en toda Costa Rica
        </h1>
        <p className="mt-4 text-gray-700 text-lg font-body max-w-xl">
          Mandados gestiona compras, entregas y trámites con personal confiable y
          atención personalizada. Pedí ahora y recibí actualizaciones claras en cada paso.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/#contacto"
            className="inline-flex items-center px-6 py-3 rounded-2xl bg-primary text-white font-rounded font-semibold shadow-soft"
          >
            Pedir ahora
          </Link>
          <Link
            href="/#precios"
            className="inline-flex items-center px-6 py-3 rounded-2xl border border-secondary/30 text-secondary hover:bg-secondary/10 font-body"
          >
            Ver precios
          </Link>
        </div>

        <div className="mt-10 bg-white rounded-2xl shadow p-5 w-full max-w-sm">
          <div className="flex items-start gap-4">
            <div className="bg-primary text-white rounded-xl w-12 h-12 flex items-center justify-center font-bold font-rounded text-lg">
              M
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold font-body">Pedido: Compras rápidas</div>
              <div className="text-xs text-gray-500 mt-1 font-body">Recogida: Supermercado La Central • Entrega: Oficina en Escazú</div>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-sm font-medium font-body">Tiempo estimado</div>
                <div className="text-sm font-semibold font-body">45 min</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex justify-center">
        <div className="w-80 h-80 rounded-3xl bg-secondary flex items-center justify-center shadow-lg">
          <Image
            src="/logos/stacked-with-tagline-white.png"
            alt="Mandados"
            width={380}
            height={380}
            loading="eager"
            style={{ height: "auto", width: "380px" }}
          />
        </div>
      </div>
    </section>
  );
}
