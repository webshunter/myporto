/** Daftar ikon Font Awesome untuk service — dipakai di Studio & UI */
export const DEFAULT_SERVICE_ICON = 'laptop-code'

export const SERVICE_ICON_LIST = [
  { value: 'laptop-code', title: 'Web Development', hint: 'Websites & web applications' },
  { value: 'mobile-screen', title: 'Mobile Development', hint: 'iOS & Android apps' },
  { value: 'database', title: 'Database Management', hint: 'SQL & data storage' },
  { value: 'server', title: 'Backend / API', hint: 'Server-side & REST API' },
  { value: 'layer-group', title: 'Full Stack', hint: 'End-to-end development' },
  { value: 'cloud', title: 'Cloud & DevOps', hint: 'Deploy & infrastructure' },
  { value: 'palette', title: 'UI / UX Design', hint: 'Interface & experience' },
  { value: 'cart-shopping', title: 'E-Commerce', hint: 'Online stores & payments' },
  { value: 'chart-line', title: 'SEO & Analytics', hint: 'Growth & performance tracking' },
  { value: 'shield-halved', title: 'Security', hint: 'App & data protection' },
  { value: 'plug', title: 'API Integration', hint: 'Third-party connections' },
  { value: 'rocket', title: 'Performance', hint: 'Speed optimization' },
  { value: 'headset', title: 'Consulting & Support', hint: 'Advice & maintenance' },
  { value: 'code-branch', title: 'Custom Software', hint: 'Tailored business solutions' },
  { value: 'bug', title: 'Bug Fixing', hint: 'Debugging & troubleshooting' },
  { value: 'briefcase', title: 'General Service', hint: 'Default fallback icon' },
]

/** Map nama service lama → icon key (untuk migrasi) */
export const SERVICE_NAME_ICON_MAP = {
  'web development': 'laptop-code',
  'mobile development': 'mobile-screen',
  'database management': 'database',
}

export function resolveServiceIconKey(iconOrName) {
  if (!iconOrName) return DEFAULT_SERVICE_ICON
  if (typeof iconOrName === 'string' && !iconOrName.startsWith('http')) {
    const known = SERVICE_ICON_LIST.some((item) => item.value === iconOrName)
    if (known) return iconOrName
    const byName = SERVICE_NAME_ICON_MAP[iconOrName.toLowerCase()]
    if (byName) return byName
  }
  return DEFAULT_SERVICE_ICON
}

export function getServiceIconLabel(iconKey) {
  return SERVICE_ICON_LIST.find((item) => item.value === iconKey)?.title ?? 'Service'
}
