import { NextResponse } from 'next/server';
import { escapeHtml, escapeHtmlAndConvertNewlines } from '@/lib/strings';
import { validatePayload } from '@/lib/schemas/contact';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO_EMAIL = 'info@mandados.cr';
const FROM_EMAIL = process.env.FROM_EMAIL || TO_EMAIL;

if (!RESEND_API_KEY) {
  console.error('Missing RESEND_API_KEY environment variable');
}

export async function POST(req: Request) {
  if (!RESEND_API_KEY) {
    return NextResponse.json({ error: 'Servidor no configurado' }, { status: 500 });
  }

  try {
    const data = await req.json();

    // Honeypot check - if filled, likely spam
    if (data.honeypot && String(data.honeypot).trim() !== '') {
      return NextResponse.json({ success: true }, { status: 200 }); // Silently reject spam
    }

    const validated = validatePayload(data);

    if (!validated.success) {
      return NextResponse.json({ error: 'validation', fieldErrors: validated.fieldErrors }, { status: 400 });
    }

    const { name, email, phone, message } = validated.data;

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeMessage = escapeHtmlAndConvertNewlines(message);

    const html = `
      <h2>Contacto desde el sitio</h2>
      <p><strong>Nombre:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Teléfono:</strong> ${safePhone}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${safeMessage}</p>
    `;

    // Send via Resend REST API (no SDK required)
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        subject: `Contacto desde sitio: ${safeName}`,
        html,
        headers: { 'Reply-To': safeEmail }
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error('Resend API error', resp.status, text);
      return NextResponse.json({ error: 'send', message: 'Error al enviar email' }, { status: 502 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('API /api/contact error:', error);
    return NextResponse.json({ error: 'server', message: 'Error del servidor' }, { status: 500 });
  }
}
