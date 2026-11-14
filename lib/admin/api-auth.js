import crypto from 'crypto'
import { isAdminAuthenticated } from './session'

function timingSafeMatch(a = '', b = '') {
  const bufA = Buffer.from(String(a))
  const bufB = Buffer.from(String(b))
  if (bufA.length !== bufB.length) return false
  return crypto.timingSafeEqual(bufA, bufB)
}

export function getBearerToken(request) {
  const header = request.headers.get('authorization') || ''
  if (!header.toLowerCase().startsWith('bearer ')) return ''
  return header.slice(7).trim()
}

export function isApiKeyValid(request) {
  const expected = process.env.BLOG_API_KEY
  if (!expected) return false
  const token = getBearerToken(request)
  if (!token) return false
  return timingSafeMatch(token, expected)
}

export async function isAuthorized(request) {
  if (isApiKeyValid(request)) return true
  return isAdminAuthenticated()
}
