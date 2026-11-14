const ENDPOINT = 'https://api.deepseek.com/chat/completions'

export function isAiConfigured() {
  return Boolean(process.env.DEEPSEEK_API_KEY)
}

export async function deepseekChat({
  messages,
  temperature = 0.2,
  json = false,
  maxTokens = 4000,
}) {
  const key = process.env.DEEPSEEK_API_KEY
  if (!key) {
    const error = new Error('DEEPSEEK_API_KEY belum diisi')
    error.code = 'NO_KEY'
    throw error
  }

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: process.env.DEEPSEEK_MODEL || 'deepseek-chat',
      messages,
      temperature,
      max_tokens: maxTokens,
      ...(json ? { response_format: { type: 'json_object' } } : {}),
    }),
    cache: 'no-store',
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(`DeepSeek ${response.status}: ${detail.slice(0, 300)}`)
  }

  const data = await response.json()
  return data.choices?.[0]?.message?.content ?? ''
}

const ALLOWED_TAGS = /^(b|strong|i|em|u|s|code|a|br)$/i

export function sanitizeInlineHtml(html = '') {
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<\/?([a-z0-9]+)([^>]*)>/gi, (match, tag, attrs) => {
      if (!ALLOWED_TAGS.test(tag)) return ''
      const cleanAttrs = tag.toLowerCase() === 'a'
        ? (attrs.match(/\bhref\s*=\s*"[^"]*"/i)?.[0] ?? '')
        : ''
      return match.startsWith('</') ? `</${tag.toLowerCase()}>` : `<${tag.toLowerCase()}${cleanAttrs ? ` ${cleanAttrs}` : ''}>`
    })
    .replace(/\son\w+\s*=/gi, ' data-blocked=')
}
