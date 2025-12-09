'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Contact form submit error:', error);
      setStatus('error');
    }
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow border">
      <h4 className="text-xl font-bold font-display">Contacto</h4>
      <p className="text-gray-600 mt-1 font-body">Escribinos para solicitar un servicio o cotización personalizada.</p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <div>
          <label className="text-sm font-body">Nombre</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full mt-1 p-3 rounded-xl border font-body focus:ring-2 focus:ring-primary focus:outline-none" />
        </div>
        <div>
          <label className="text-sm font-body">Correo electrónico</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full mt-1 p-3 rounded-xl border font-body focus:ring-2 focus:ring-primary focus:outline-none" />
        </div>
        <div>
          <label className="text-sm font-body">Mensaje</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} required className="w-full mt-1 p-3 rounded-xl border font-body focus:ring-2 focus:ring-primary focus:outline-none" />
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" disabled={status === 'loading'} className="px-5 py-3 rounded-2xl bg-primary text-white font-rounded font-semibold">
            {status === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
          </button>

          <a href="https://wa.me/50660000000" className="px-4 py-3 rounded-2xl border text-gray-800 font-body">WhatsApp</a>
          <a href="tel:+50660000000" className="px-4 py-3 rounded-2xl border text-gray-800 font-body">Llamar</a>
        </div>

        {status === 'success' && <div className="text-sm text-green-600 mt-2 font-body">Mensaje enviado. Te responderemos pronto.</div>}
        {status === 'error' && <div className="text-sm text-red-600 mt-2 font-body">Ocurrió un error. Intentá nuevamente.</div>}
      </form>
    </div>
  );
}
