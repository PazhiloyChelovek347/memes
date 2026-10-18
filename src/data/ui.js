// Тексты интерфейса (не рассказа): кнопки навигации, подписи по умолчанию.

export const ui = {
  nav: {
    previous: 'Назад',
    next: 'Вперёд',
    label: 'Листать страницы',
    pageOf: (current, total) => `Страница ${current} из ${total}`,
  },
  tap: {
    button: 'Нажми меня',
    done: 'Готово',
  },
}
