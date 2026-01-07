'use client';
import useContactForm from '@/lib/hooks/useContactForm';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export default function ContactForm() {
  const {
    name,
    email,
    phone,
    message,
    honeypot,
    status,
    statusMessage,
    isValid,
    onNameChange,
    onEmailChange,
    onPhoneChange,
    onMessageChange,
    onHoneypotChange,
    onFieldBlur,
    getDisplayedError,
    handleSubmit,
  } = useContactForm();

  return (
    <div className="bg-white p-6 rounded-2xl shadow border">
      <h4 className="text-xl font-bold font-display">Contacto</h4>
      <p className="text-gray-600 mt-1 font-body">Escribinos para solicitar un servicio o cotización personalizada.</p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3" noValidate>
        {/* Honeypot field - hidden from users, catches bots */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            value={honeypot}
            onChange={(e) => onHoneypotChange(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="contact-name" className="text-sm font-body">Nombre</label>
          <input
            id="contact-name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            onBlur={() => onFieldBlur('name')}
            required
            aria-invalid={!!getDisplayedError('name')}
            aria-describedby={getDisplayedError('name') ? 'contact-name-error' : undefined}
            className={`w-full mt-1 p-3 rounded-xl border font-body focus:ring-2 ${getDisplayedError('name') ? 'focus:ring-red-400' : 'focus:ring-primary'} focus:outline-none ${getDisplayedError('name') ? 'border-red-400' : ''}`}
          />
          {getDisplayedError('name') && <div id="contact-name-error" className="text-sm text-red-600 mt-1">{getDisplayedError('name')}</div>}
        </div>
        <div>
          <label htmlFor="contact-email" className="text-sm font-body">Correo electrónico</label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            onBlur={() => onFieldBlur('email')}
            required
            aria-invalid={!!getDisplayedError('email')}
            aria-describedby={getDisplayedError('email') ? 'contact-email-error' : undefined}
            className={`w-full mt-1 p-3 rounded-xl border font-body focus:ring-2 ${getDisplayedError('email') ? 'focus:ring-red-400' : 'focus:ring-primary'} focus:outline-none ${getDisplayedError('email') ? 'border-red-400' : ''}`}
          />
          {getDisplayedError('email') && <div id="contact-email-error" className="text-sm text-red-600 mt-1">{getDisplayedError('email')}</div>}
        </div>
        <div>
          <label htmlFor="contact-phone" className="text-sm font-body">Teléfono</label>
          <PhoneInput
            id="contact-phone"
            international
            defaultCountry="CR"
            value={phone}
            onChange={onPhoneChange}
            onBlur={() => onFieldBlur('phone')}
            className={`phone-input-wrapper mt-1 ${getDisplayedError('phone') ? 'phone-input-error' : ''}`}
            aria-invalid={!!getDisplayedError('phone')}
            aria-describedby={getDisplayedError('phone') ? 'contact-phone-error' : undefined}
          />
          {getDisplayedError('phone') && <div id="contact-phone-error" className="text-sm text-red-600 mt-1">{getDisplayedError('phone')}</div>}
        </div>
        <div>
          <label htmlFor="contact-message" className="text-sm font-body">Mensaje</label>
          <textarea
            id="contact-message"
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            onBlur={() => onFieldBlur('message')}
            rows={4}
            required
            aria-invalid={!!getDisplayedError('message')}
            aria-describedby={getDisplayedError('message') ? 'contact-message-error' : undefined}
            className={`w-full mt-1 p-3 rounded-xl border font-body focus:ring-2 ${getDisplayedError('message') ? 'focus:ring-red-400' : 'focus:ring-primary'} focus:outline-none ${getDisplayedError('message') ? 'border-red-400' : ''}`}
          />
          {getDisplayedError('message') && <div id="contact-message-error" className="text-sm text-red-600 mt-1">{getDisplayedError('message')}</div>}
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

        {/* No global summary: errors are shown per-field only (onBlur or after submit) */}

        <div aria-live="polite" role="status" className="min-h-[1.25rem]">
          {statusMessage && (
            <div className={`text-sm mt-2 font-body ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>{statusMessage}</div>
          )}
        </div>
      </form>
    </div>
  );
}
