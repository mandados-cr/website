import '@testing-library/jest-dom'
import { loadEnvConfig } from '@next/env'

// Load test environment variables
loadEnvConfig(process.cwd())

// Set test env vars
process.env.RESEND_API_KEY = process.env.RESEND_API_KEY || 'test-api-key'
process.env.FROM_EMAIL = process.env.FROM_EMAIL || 'test@example.com'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
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
global.fetch = jest.fn()
