// Small utility to safely escape user-provided strings for HTML output
export function escapeHtml(input: unknown): string {
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Escape HTML and convert newlines to <br/> (handles CRLF/CR/LF)
export function newLinesToLineBreaks(input: string): string {
  return input.replace(/\r\n|\r|\n/g, '<br/>');
}

// Escape HTML and convert newlines to <br/>
export function escapeHtmlAndConvertNewlines(input: unknown): string {
  const escaped = escapeHtml(input);
  return newLinesToLineBreaks(escaped);
}

// Simple email validation
export function validateEmail(emailStr: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
}