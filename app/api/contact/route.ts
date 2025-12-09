import { NextResponse } from 'next/server';
import {
  escapeHtml,
  escapeHtmlAndConvertNewlines,
} from '@/lib/strings';

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
    const { name, email, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Campos requeridos faltantes' }, { status: 400 });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtmlAndConvertNewlines(message);

    const html = `
      <h2>Contacto desde el sitio</h2>
      <p><strong>Nombre:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${safeMessage}</p>
    `;

    console.log('Posting to /api/contact with data:', data);

    console.log('Posting to resend with email content:');
    console.log('Resend API key:', RESEND_API_KEY);
    console.log('Sending email:', html);
    console.log('To:', TO_EMAIL);
    console.log('From:', FROM_EMAIL);

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
      return NextResponse.json({ error: 'Error al enviar email', message: text }, { status: 502 });
    }

    console.log('Email sent successfully', resp);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('API /api/contact error:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
