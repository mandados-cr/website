import { z } from 'zod';
import { isPossiblePhoneNumber } from 'libphonenumber-js';

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, 'name_required')
    .max(100, 'name_too_long'),
  email: z.email('email_invalid'),
  phone: z
    .string()
    .min(1, 'phone_required')
    .refine((val) => isPossiblePhoneNumber(val), 'phone_invalid'),
  message: z
    .string()
    .min(1, 'message_required')
    .max(2000, 'message_too_long'),
});

export type Contact = z.infer<typeof contactSchema>;

export function mapZodErrors(err: z.ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  for (const issue of err.issues) {
    const key = issue.path[0];
    if (typeof key === 'string') fieldErrors[key] = issue.message;
  }
  return fieldErrors;
}

export type ValidatePayloadSuccess = { success: true; data: Contact };
export type ValidatePayloadFailure = { success: false; fieldErrors: Record<string, string> };
export type ValidatePayloadResult = ValidatePayloadSuccess | ValidatePayloadFailure;

export function validatePayload(data: unknown): ValidatePayloadResult {
  const result = contactSchema.safeParse(data);
  if (!result.success) return { success: false, fieldErrors: mapZodErrors(result.error) };
  return { success: true, data: result.data as Contact };
}
