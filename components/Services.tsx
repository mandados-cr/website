export default function Services() {
  const items = [
    {
      title: 'Compras',
      bullets: ['Supermercado y tiendas', 'Recojo y entrega a domicilio', 'Factura y gestión de cambios'],
    },
    {
      title: 'Trámites',
      bullets: ['Gestión de documentos', 'Pagos y recogidas', 'Soporte para empresas y hoteles'],
    },
    {
      title: 'Entregas',
      bullets: ['Mensajería local', 'Paquetes y eventos', 'Coordinación para volúmenes medianos'],
    },
  ];

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold font-display">Servicios</h2>
      <div className="h-1 w-16 bg-secondary rounded-full mt-2" />
      <p className="text-gray-600 mt-3 max-w-2xl font-body">Soluciones personalizadas para personas, empresas y eventos. Rápido, confiable y con seguimiento.</p>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {items.map((s) => (
          <div key={s.title} className="p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="text-lg font-semibold font-body">{s.title}</div>
            <ul className="mt-3 text-sm text-gray-700 space-y-2 font-body">
              {s.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-primary text-white flex items-center justify-center font-bold">•</div>
                  <div>{b}</div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
