'use client';
import { useState, useRef, useMemo, FormEvent } from 'react';
import { contactSchema } from '@/lib/schemas/contact';

export type ContactHook = {
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'idle' | 'loading' | 'success' | 'error';
  statusMessage: string | null;
  errors: Record<string, string>;
  isValid: boolean;
  onNameChange: (v: string) => void;
  onEmailChange: (v: string) => void;
  onPhoneChange: (v: string | undefined) => void;
  onMessageChange: (v: string) => void;
  onFieldBlur: (field: string) => void;
  getDisplayedError: (field: string) => string | undefined;
  handleSubmit: (e?: FormEvent) => Promise<void>;
  reset: () => void;
};

type ApiValidationError = { error: 'validation'; fieldErrors: Record<string, string> };
type ApiMessage = { message?: string };

function isValidationError(obj: unknown): obj is ApiValidationError {
  if (!obj || typeof obj !== 'object') return false;
  const o = obj as Record<string, unknown>;
  return o['error'] === 'validation' && typeof o['fieldErrors'] === 'object' && o['fieldErrors'] !== null;
}
function hasMessage(obj: unknown): obj is ApiMessage {
  if (!obj || typeof obj !== 'object') return false;
  const o = obj as Record<string, unknown>;
  return 'message' in o;
}

export default function useContactForm(): ContactHook {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  // Compute client-side validation once per render
  const clientValidation = useMemo(() => {
    const trimmed = { name: name.trim(), email: email.trim(), phone: phone.trim(), message: message.trim() };
    const res = contactSchema.safeParse(trimmed);
    if (res.success) return { valid: true, fieldErrors: {} as Record<string, string> };
    const fieldErrors: Record<string, string> = {};
    for (const issue of res.error.issues) {
      const key = issue.path[0];
      if (typeof key === 'string') fieldErrors[key] = issue.message;
    }
    return { valid: false, fieldErrors };
  }, [name, email, phone, message]);

  const isValid = clientValidation.valid;

  function clearFieldError(field: string) {
    setErrors((p) => {
      if (!p[field]) return p;
      const next = { ...p };
      delete next[field];
      return next;
    });
  }

  function onNameChange(v: string) {
    setName(v);
    clearFieldError('name');
  }
  function onEmailChange(v: string) {
    setEmail(v);
    clearFieldError('email');
  }
  function onPhoneChange(v: string | undefined) {
    setPhone(v || '');
    clearFieldError('phone');
  }
  function onMessageChange(v: string) {
    setMessage(v);
    clearFieldError('message');
  }

  function mapClientValidation() {
    if (!clientValidation.valid) {
      setErrors(clientValidation.fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  }

  function onFieldBlur(field: string) {
    setTouched((p) => ({ ...p, [field]: true }));
    const fieldErr = clientValidation.fieldErrors[field];
    setErrors((prev) => {
      const next = { ...prev };
      if (fieldErr) next[field] = fieldErr;
      else delete next[field];
      return next;
    });
  }

  function getDisplayedError(field: string) {
    if (errors[field]) return errors[field];
    if (touched[field] || attemptedSubmit) return clientValidation.fieldErrors[field];
    return undefined;
  }

  async function handleSubmit(e?: FormEvent) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    setAttemptedSubmit(true);
    if (!mapClientValidation()) {
      setStatus('error');
      setStatusMessage('Corrige los errores en el formulario.');
      return;
    }

    setStatus('loading');
    setStatusMessage(null);
    setErrors({});

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), phone: phone.trim(), message: message.trim() }),
      });

      const json: unknown = await res.json().catch(() => null);

      if (res.ok) {
        setStatus('success');
        setStatusMessage('Mensaje enviado. Te responderemos pronto.');
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setErrors({});
        setAttemptedSubmit(false);
        setTouched({});

        if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(() => {
          setStatus('idle');
          setStatusMessage(null);
          timeoutRef.current = null;
        }, 6000) as unknown as number;
        return;
      }

      if (isValidationError(json)) {
        setErrors(json.fieldErrors);
        setStatus('error');
        setStatusMessage('Corrige los errores en el formulario.');
        return;
      }

      let serverMsg = 'Ocurrió un error. Intentá nuevamente.';
      if (hasMessage(json) && json.message) serverMsg = String(json.message);
      setStatus('error');
      setStatusMessage(serverMsg);
    } catch (error) {
      console.error('Contact form submit error:', error);
      setStatus('error');
      setStatusMessage('Ocurrió un error de red. Intentá nuevamente.');
    }
  }

  function reset() {
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setStatus('idle');
    setStatusMessage(null);
    setErrors({});
    setTouched({});
    setAttemptedSubmit(false);
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
  }

  return {
    name,
    email,
    phone,
    message,
    status,
    statusMessage,
    errors,
    isValid,
    onNameChange,
    onEmailChange,
    onPhoneChange,
    onMessageChange,
    onFieldBlur,
    getDisplayedError,
    handleSubmit,
    reset,
  };
}
