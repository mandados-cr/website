import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import ContactForm from '../ContactForm';
import { IntlWrapper } from '@/lib/testing/intlWrapper';

vi.mock('react-phone-number-input', () => ({
  default: function PhoneInput({ value, onChange, onBlur, id }: any) {
    return (
      <input
        id={id}
        type="tel"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        data-testid="phone-input"
      />
    );
  },
}));

function renderForm() {
  return render(
    <IntlWrapper>
      <ContactForm />
    </IntlWrapper>
  );
}

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(global.fetch).mockClear();
  });

  it('should render all form fields', () => {
    renderForm();

    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/teléfono/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mensaje/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar mensaje/i })).toBeInTheDocument();
  });

  it('should render honeypot field as hidden', () => {
    renderForm();

    const honeypotField = screen.getByLabelText(/website/i);
    expect(honeypotField).toBeInTheDocument();
    expect(honeypotField.closest('div')).toHaveClass('hidden');
  });

  it('should allow user to type in all fields', async () => {
    const user = userEvent.setup();
    renderForm();

    const nameInput = screen.getByLabelText(/nombre/i);
    const emailInput = screen.getByLabelText(/correo electrónico/i);
    const phoneInput = screen.getByTestId('phone-input');
    const messageInput = screen.getByLabelText(/mensaje/i);

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(phoneInput, '+50612345678');
    await user.type(messageInput, 'Test message');

    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(phoneInput).toHaveValue('+50612345678');
    expect(messageInput).toHaveValue('Test message');
  });

  it('should show validation errors on blur', async () => {
    const user = userEvent.setup();
    renderForm();

    const emailInput = screen.getByLabelText(/correo electrónico/i);

    await user.click(emailInput);
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText(/correo inválido/i)).toBeInTheDocument();
    });
  });

  it('should not submit when form is invalid', async () => {
    const user = userEvent.setup();
    renderForm();

    const submitButton = screen.getByRole('button', { name: /enviar mensaje/i });

    expect(submitButton).toBeDisabled();

    await user.click(submitButton);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should disable submit button when form is invalid', () => {
    renderForm();

    const submitButton = screen.getByRole('button', { name: /enviar mensaje/i });
    expect(submitButton).toBeDisabled();
  });

  it('should enable submit button when form is valid', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText(/nombre/i), 'John Doe');
    await user.type(screen.getByLabelText(/correo electrónico/i), 'john@example.com');
    await user.type(screen.getByTestId('phone-input'), '+50612345678');
    await user.type(screen.getByLabelText(/mensaje/i), 'Test message');

    const submitButton = screen.getByRole('button', { name: /enviar mensaje/i });

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it('should submit form successfully', async () => {
    const user = userEvent.setup();
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    renderForm();

    await user.type(screen.getByLabelText(/nombre/i), 'John Doe');
    await user.type(screen.getByLabelText(/correo electrónico/i), 'john@example.com');
    await user.type(screen.getByTestId('phone-input'), '+50612345678');
    await user.type(screen.getByLabelText(/mensaje/i), 'Test message');

    const submitButton = screen.getByRole('button', { name: /enviar mensaje/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/mensaje enviado/i)).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith('/api/contact', expect.any(Object));
  });

  it('should clear form after successful submission', async () => {
    const user = userEvent.setup();
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    renderForm();

    const nameInput = screen.getByLabelText(/nombre/i);
    const emailInput = screen.getByLabelText(/correo electrónico/i);
    const phoneInput = screen.getByTestId('phone-input');
    const messageInput = screen.getByLabelText(/mensaje/i);

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(phoneInput, '+50612345678');
    await user.type(messageInput, 'Test message');

    const submitButton = screen.getByRole('button', { name: /enviar mensaje/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(nameInput).toHaveValue('');
      expect(emailInput).toHaveValue('');
      expect(phoneInput).toHaveValue('');
      expect(messageInput).toHaveValue('');
    });
  });

  it('should silently reject spam when honeypot is filled', async () => {
    const user = userEvent.setup();
    renderForm();

    const honeypotField = screen.getByLabelText(/website/i);

    await user.type(screen.getByLabelText(/nombre/i), 'Spam Bot');
    await user.type(screen.getByLabelText(/correo electrónico/i), 'spam@bot.com');
    await user.type(screen.getByTestId('phone-input'), '+50612345678');
    await user.type(screen.getByLabelText(/mensaje/i), 'Spam message');
    await user.type(honeypotField, 'I am a bot');

    const submitButton = screen.getByRole('button', { name: /enviar mensaje/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/mensaje enviado/i)).toBeInTheDocument();
    });

    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should show error message on API failure', async () => {
    const user = userEvent.setup();
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(global.fetch).mockRejectedValueOnce(new Error('Network error'));

    renderForm();

    await user.type(screen.getByLabelText(/nombre/i), 'John Doe');
    await user.type(screen.getByLabelText(/correo electrónico/i), 'john@example.com');
    await user.type(screen.getByTestId('phone-input'), '+50612345678');
    await user.type(screen.getByLabelText(/mensaje/i), 'Test message');

    const submitButton = screen.getByRole('button', { name: /enviar mensaje/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/error de red/i)).toBeInTheDocument();
    });

    consoleErrorSpy.mockRestore();
  });

  it('should show loading state during submission', async () => {
    const user = userEvent.setup();
    vi.mocked(global.fetch).mockImplementationOnce(
      () => new Promise((resolve) => setTimeout(() => resolve({ ok: true, json: async () => ({}) }), 100))
    );

    renderForm();

    await user.type(screen.getByLabelText(/nombre/i), 'John Doe');
    await user.type(screen.getByLabelText(/correo electrónico/i), 'john@example.com');
    await user.type(screen.getByTestId('phone-input'), '+50612345678');
    await user.type(screen.getByLabelText(/mensaje/i), 'Test message');

    const submitButton = screen.getByRole('button', { name: /enviar mensaje/i });
    await user.click(submitButton);

    expect(screen.getByRole('button', { name: /enviando/i })).toBeInTheDocument();
  });
});
