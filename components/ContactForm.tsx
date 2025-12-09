'use client';
import { useState, FormEvent, useEffect, useRef } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function validateEmail(emailStr: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  }

  const isValid = name.trim() !== '' && validateEmail(email) && message.trim() !== '';

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isValid) {
      setStatus('error');
      setStatusMessage('Por favor completá todos los campos correctamente.');
      return;
    }

    setStatus('loading');
    setStatusMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
      });

      if (res.ok) {
        setStatus('success');
        setStatusMessage('Mensaje enviado. Te responderemos pronto.');
        setName('');
        setEmail('');
        setMessage('');

        // clear success after a short delay
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = window.setTimeout(() => {
          setStatus('idle');
          setStatusMessage(null);
          timeoutRef.current = null;
        }, 6000);
      } else {
        let serverMsg = 'Ocurrió un error. Intentá nuevamente.';
        try {
          const json = await res.json();
          if (json && json.error) serverMsg = String(json.error);
        } catch (err){
          console.error('Failed to parse JSON from server response:', err);
        }
        setStatus('error');
        setStatusMessage(serverMsg);
      }
    } catch (error) {
      console.error('Contact form submit error:', error);
      setStatus('error');
      setStatusMessage('Ocurrió un error de red. Intentá nuevamente.');
    }
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow border">
      <h4 className="text-xl font-bold font-display">Contacto</h4>
      <p className="text-gray-600 mt-1 font-body">Escribinos para solicitar un servicio o cotización personalizada.</p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3" noValidate>
        <div>
          <label htmlFor="contact-name" className="text-sm font-body">Nombre</label>
          <input
            id="contact-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full mt-1 p-3 rounded-xl border font-body focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="text-sm font-body">Correo electrónico</label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mt-1 p-3 rounded-xl border font-body focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="contact-message" className="text-sm font-body">Mensaje</label>
          <textarea
            id="contact-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            required
            className="w-full mt-1 p-3 rounded-xl border font-body focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={status === 'loading' || !isValid}
            aria-busy={status === 'loading'}
            className={`px-5 py-3 rounded-2xl text-white font-rounded font-semibold ${status === 'loading' || !isValid ? 'bg-primary/60 cursor-not-allowed' : 'bg-primary'}`}>
            {status === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
          </button>

          <a href="https://wa.me/50687634630" className="px-4 py-3 rounded-2xl border border-secondary/30 text-secondary hover:bg-secondary/10 font-body">WhatsApp</a>
          <a href="tel:+50687634630" className="px-4 py-3 rounded-2xl border border-secondary/30 text-secondary hover:bg-secondary/10 font-body">Llamar</a>
        </div>

        <div aria-live="polite" role="status" className="min-h-[1.25rem]">
          {statusMessage && (
            <div className={`text-sm mt-2 font-body ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>{statusMessage}</div>
          )}
        </div>
      </form>
    </div>
  );
}
