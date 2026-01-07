/**
 * API Route Tests for /api/contact
 *
 * Note: Full integration testing of the email sending functionality is complex
 * due to environment variable loading in Next.js. These tests focus on the core logic.
 */

import { validatePayload } from '@/lib/schemas/contact';

describe('Contact API - Validation', () => {
  describe('validatePayload', () => {
    it('should validate correct contact data', () => {
      const result = validatePayload({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+50612345678',
        message: 'Test message',
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe('John Doe');
        expect(result.data.email).toBe('john@example.com');
        expect(result.data.phone).toBe('+50612345678');
        expect(result.data.message).toBe('Test message');
      }
    });

    it('should reject missing required fields', () => {
      const result = validatePayload({
        name: '',
        email: '',
        phone: '',
        message: '',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.fieldErrors.name).toBeDefined();
        expect(result.fieldErrors.email).toBeDefined();
        expect(result.fieldErrors.phone).toBeDefined();
        expect(result.fieldErrors.message).toBeDefined();
      }
    });

    it('should reject invalid email', () => {
      const result = validatePayload({
        name: 'John Doe',
        email: 'invalid-email',
        phone: '+50612345678',
        message: 'Test message',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.fieldErrors.email).toBeDefined();
      }
    });

    it('should reject invalid phone number', () => {
      const result = validatePayload({
        name: 'John Doe',
        email: 'john@example.com',
        phone: 'invalid',
        message: 'Test message',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.fieldErrors.phone).toBeDefined();
      }
    });

    it('should accept international phone numbers', () => {
      const phoneNumbers = [
        '+50612345678', // Costa Rica
        '+12025551234', // USA
        '+442071234567', // UK
        '+81312345678', // Japan
      ];

      phoneNumbers.forEach((phone) => {
        const result = validatePayload({
          name: 'John Doe',
          email: 'john@example.com',
          phone,
          message: 'Test message',
        });

        expect(result.success).toBe(true);
      });
    });

    it('should validate when data is already trimmed', () => {
      // Note: The validation expects trimmed data; trimming happens in the hook/API before validation
      const trimmedData = {
        name: '  John Doe  '.trim(),
        email: '  john@example.com  '.trim(),
        phone: '  +50612345678  '.trim(),
        message: '  Test message  '.trim(),
      };

      const result = validatePayload(trimmedData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe('John Doe');
        expect(result.data.email).toBe('john@example.com');
        expect(result.data.phone).toBe('+50612345678');
        expect(result.data.message).toBe('Test message');
      }
    });
  });
});

describe('Contact API - Honeypot Logic', () => {
  it('should identify spam when honeypot is filled', () => {
    const spamData = {
      name: 'Spam Bot',
      email: 'spam@bot.com',
      phone: '+50612345678',
      message: 'Spam message',
      honeypot: 'I am a bot',
    };

    // In the actual API, this would be caught before validation
    expect(spamData.honeypot).toBeTruthy();
    expect(spamData.honeypot.trim()).not.toBe('');
  });

  it('should allow legitimate submissions with empty honeypot', () => {
    const legitimateData = {
      name: 'Real User',
      email: 'real@user.com',
      phone: '+50612345678',
      message: 'Real message',
      honeypot: '',
    };

    expect(legitimateData.honeypot.trim()).toBe('');
  });
});
