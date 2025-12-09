export default function Pricing() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border">
      <h3 className="text-2xl sm:text-3xl font-bold font-display">Precios simples y transparentes</h3>
      <p className="text-gray-600 mt-2 font-body">Tarifas claras según distancia y complejidad. Sin sorpresas.</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl border hover:shadow-md transition-shadow">
          <div className="font-semibold font-body">Mandados y entregas</div>
          <div className="text-sm text-gray-700 mt-2 font-body">₡1,500 — ₡12,500</div>
          <div className="text-xs text-gray-500 mt-2 font-body">Varía según distancia y complejidad.</div>
        </div>

        <div className="p-6 rounded-xl border hover:shadow-md transition-shadow">
          <div className="font-semibold font-body">Servicios diarios</div>
          <div className="text-sm text-gray-700 mt-2 font-body">₡15,000 — ₡35,000 / día</div>
          <div className="text-xs text-gray-500 mt-2 font-body">Para cliente con necesidades de personal dedicado.</div>
        </div>

        <div className="p-6 rounded-xl border hover:shadow-md transition-shadow">
          <div className="font-semibold font-body">Compras y facturación</div>
          <div className="text-sm text-gray-700 mt-2 font-body">Precio según distancia</div>
          <div className="text-xs text-gray-500 mt-2 font-body">
            Si Mandados realiza compras: factura semanal (viernes), 2% sobre monto de compras + IVA 13% sobre la
            comisión.
          </div>
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-600 font-body">
        <strong>Facturación:</strong> crédito semanal con factura cada viernes. <strong>Pago:</strong> transferencia bancaria.
      </div>
    </div>
  );
}
