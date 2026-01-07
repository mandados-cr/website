import { renderHook, act, waitFor } from '@testing-library/react';
import useContactForm from '../useContactForm';

describe('useContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  it('should initialize with empty values', () => {
    const { result } = renderHook(() => useContactForm());

    expect(result.current.name).toBe('');
    expect(result.current.email).toBe('');
    expect(result.current.phone).toBe('');
    expect(result.current.message).toBe('');
    expect(result.current.honeypot).toBe('');
    expect(result.current.status).toBe('idle');
    expect(result.current.isValid).toBe(false);
  });

  it('should update name field', () => {
    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.onNameChange('John Doe');
    });

    expect(result.current.name).toBe('John Doe');
  });

  it('should update email field', () => {
    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.onEmailChange('john@example.com');
    });

    expect(result.current.email).toBe('john@example.com');
  });

  it('should update phone field', () => {
    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.onPhoneChange('+50612345678');
    });

    expect(result.current.phone).toBe('+50612345678');
  });

  it('should update message field', () => {
    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.onMessageChange('Test message');
    });

    expect(result.current.message).toBe('Test message');
  });

  it('should update honeypot field', () => {
    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.onHoneypotChange('spam value');
    });

    expect(result.current.honeypot).toBe('spam value');
  });

  it('should validate form and show errors on field blur', () => {
    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.onFieldBlur('email');
    });

    expect(result.current.getDisplayedError('email')).toBeDefined();
  });

  it('should clear field error when field is updated', () => {
    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.onFieldBlur('email');
    });

    expect(result.current.getDisplayedError('email')).toBeDefined();

    act(() => {
      result.current.onEmailChange('valid@example.com');
    });

    // Error should be cleared from the errors object but validation may still fail
    expect(result.current.errors.email).toBeUndefined();
  });

  it('should mark form as valid when all required fields are filled correctly', () => {
    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.onNameChange('John Doe');
      result.current.onEmailChange('john@example.com');
      result.current.onPhoneChange('+50612345678');
      result.current.onMessageChange('Test message');
    });

    expect(result.current.isValid).toBe(true);
  });

  it('should silently reject spam when honeypot is filled', async () => {
    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.onNameChange('John Doe');
      result.current.onEmailChange('john@example.com');
      result.current.onPhoneChange('+50612345678');
      result.current.onMessageChange('Test message');
      result.current.onHoneypotChange('spam bot');
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.status).toBe('success');
    expect(result.current.statusMessage).toBe('Mensaje enviado. Te responderemos pronto.');
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should show validation errors on submit when form is invalid', async () => {
    const { result } = renderHook(() => useContactForm());

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.status).toBe('error');
    expect(result.current.statusMessage).toBe('Corrige los errores en el formulario.');
  });

  it('should submit form successfully when valid', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.onNameChange('John Doe');
      result.current.onEmailChange('john@example.com');
      result.current.onPhoneChange('+50612345678');
      result.current.onMessageChange('Test message');
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(global.fetch).toHaveBeenCalledWith('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+50612345678',
        message: 'Test message',
        honeypot: '',
      }),
    });

    await waitFor(() => {
      expect(result.current.status).toBe('success');
      expect(result.current.statusMessage).toBe('Mensaje enviado. Te responderemos pronto.');
    });
  });

  it('should handle API validation errors', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        error: 'validation',
        fieldErrors: { email: 'Correo inválido' },
      }),
    });

    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.onNameChange('John Doe');
      result.current.onEmailChange('invalid');
      result.current.onPhoneChange('+50612345678');
      result.current.onMessageChange('Test message');
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    await waitFor(() => {
      expect(result.current.status).toBe('error');
      expect(result.current.errors.email).toBe('Correo inválido');
    });
  });

  // Note: Network error handling is also tested in the component tests

  it('should reset form', () => {
    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.onNameChange('John Doe');
      result.current.onEmailChange('john@example.com');
      result.current.onPhoneChange('+50612345678');
      result.current.onMessageChange('Test message');
      result.current.onHoneypotChange('spam');
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.name).toBe('');
    expect(result.current.email).toBe('');
    expect(result.current.phone).toBe('');
    expect(result.current.message).toBe('');
    expect(result.current.honeypot).toBe('');
    expect(result.current.status).toBe('idle');
    expect(result.current.statusMessage).toBe(null);
  });
});
