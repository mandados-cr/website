import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1, 'Nombre es requerido').max(100, 'Nombre demasiado largo'),
  email: z.email('Correo inválido'),
  message: z.string().min(1, 'Mensaje requerido').max(2000, 'Mensaje demasiado largo'),
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
