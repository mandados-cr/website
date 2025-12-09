import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Campos requeridos faltantes' }, { status: 400 });
    }

    // En un entorno real, aquí se integraría envío de email o almacenamiento en DB.
    // Para despliegue en Vercel, se puede integrar un webhook o función externa.

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('API /api/contact error:', error);
    return NextResponse.json({ error: 'Solicitud inválida' }, { status: 400 });
  }
}
