import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Set test env vars
process.env.RESEND_API_KEY = process.env.RESEND_API_KEY || 'test-api-key'
process.env.FROM_EMAIL = process.env.FROM_EMAIL || 'test@example.com'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return ''
  },
}))

// Mock fetch globally
global.fetch = vi.fn()
