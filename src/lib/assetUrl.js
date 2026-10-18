/**
 * Превращает путь из data-файла в рабочий URL.
 * 'images/me.jpg' → файл из папки public/images, корректно и локально, и на GitHub Pages.
 * Полные ссылки (https://...) возвращаются как есть.
 */
export function assetUrl(path) {
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) {
    return path
  }

  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}
