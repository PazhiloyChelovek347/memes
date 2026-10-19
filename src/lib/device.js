import { readJson, writeJson } from './storage.js'

const KEY = 'device'

function detectLabel(userAgent, shortId) {
  const os =
    /iPhone/.test(userAgent) ? 'iPhone'
    : /iPad/.test(userAgent) ? 'iPad'
    : /Android/.test(userAgent) ? 'Android'
    : /Mac OS X/.test(userAgent) ? 'Mac'
    : /Windows/.test(userAgent) ? 'Windows'
    : /Linux/.test(userAgent) ? 'Linux'
    : 'Устройство'

  const browser =
    /Edg\//.test(userAgent) ? 'Edge'
    : /OPR\//.test(userAgent) ? 'Opera'
    : /Firefox|FxiOS/.test(userAgent) ? 'Firefox'
    : /Chrome|CriOS/.test(userAgent) ? 'Chrome'
    : /Safari/.test(userAgent) ? 'Safari'
    : 'браузер'

  return `${os} · ${browser} #${shortId}`
}

/** Анонимное устройство: случайный id в localStorage + читаемая метка из user-agent */
export function getDevice() {
  let device = readJson(KEY, null)

  if (!device?.id) {
    const id = crypto.randomUUID()
    device = { id, label: detectLabel(navigator.userAgent, id.slice(0, 4)) }
    writeJson(KEY, device)
  }

  return device
}
