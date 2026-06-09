'use client'

import { config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBriefcase,
  faBug,
  faCartShopping,
  faChartLine,
  faCloud,
  faCodeBranch,
  faDatabase,
  faHeadset,
  faLayerGroup,
  faLaptopCode,
  faMobileScreen,
  faPalette,
  faPlug,
  faRocket,
  faServer,
  faShieldHalved,
} from '@fortawesome/free-solid-svg-icons'
import { DEFAULT_SERVICE_ICON, resolveServiceIconKey } from '@/lib/serviceIcons'

config.autoAddCss = false

const ICON_MAP = {
  'laptop-code': faLaptopCode,
  'mobile-screen': faMobileScreen,
  database: faDatabase,
  server: faServer,
  'layer-group': faLayerGroup,
  cloud: faCloud,
  palette: faPalette,
  'cart-shopping': faCartShopping,
  'chart-line': faChartLine,
  'shield-halved': faShieldHalved,
  plug: faPlug,
  rocket: faRocket,
  headset: faHeadset,
  'code-branch': faCodeBranch,
  bug: faBug,
  briefcase: faBriefcase,
}

export default function ServiceIcon({ icon, name, className = 'service-card-fa-icon' }) {
  const iconKey = resolveServiceIconKey(icon || name)
  const faIcon = ICON_MAP[iconKey] || ICON_MAP[DEFAULT_SERVICE_ICON]

  return <FontAwesomeIcon icon={faIcon} className={className} aria-hidden="true" />
}
