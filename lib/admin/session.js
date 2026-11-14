import crypto from 'crypto'
import { cookies } from 'next/headers'

export const ADMIN_COOKIE = 'porto_admin'
export const SESSION_MAX_AGE = 60 * 60 * 8 // 8 jam

export function safeEqual(a = '', b = '') {
  const ha = crypto.createHash('sha256').update(String(a)).digest()
  const hb = crypto.createHash('sha256').update(String(b)).digest()
  return crypto.timingSafeEqual(ha, hb)
}

export function expectedSessionValue() {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) return null
  return crypto.createHmac('sha256', secret).update('porto-admin-v1').digest('hex')
}

export async function isAdminAuthenticated() {
  const expected = expectedSessionValue()
  if (!expected) return false
  const jar = await cookies()
  const value = jar.get(ADMIN_COOKIE)?.value
  if (!value) return false
  return safeEqual(value, expected)
}

export function checkCredentials(username, password) {
  const expectedUser = process.env.ADMIN_USERNAME
  const expectedPass = process.env.ADMIN_PASSWORD
  if (!expectedUser || !expectedPass) return false
  return Boolean(safeEqual(username, expectedUser) & safeEqual(password, expectedPass))
}
