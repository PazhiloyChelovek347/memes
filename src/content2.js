export const pages = [
  {
    id: 'all-types',
    title: 'Все возможности',
    content: [
      {
        type: 'text',
        text: 'Обычный текст. Здесь можно писать любой текст страницы.',
      },

      {
        type: 'image',
        src: 'src/assets/images/ya1.jpeg',
      },

      {
        type: 'meme',
        src: 'src/assets/images/lich1.jpeg',
      },

      {
        type: 'button',
        id: 'positive',
        label: 'Положительная кнопка',
        variant: 'positive',
        message: 'Ты нажала положительную кнопку!',
      },

      {
        type: 'button',
        id: 'neutral',
        label: 'Нейтральная кнопка',
        variant: 'neutral',
        message: 'Обычная нейтральная кнопка.',
      },

      {
        type: 'button',
        id: 'negative',
        label: 'Отрицательная кнопка',
        variant: 'negative',
        message: 'Ой. Зачем ты это нажала?',
      },

      {
        type: 'button',
        id: 'secret',
        label: 'Секретная кнопка',
        visibleWhen: {
          clicked: 'positive',
        },
      },

      {
        type: 'tap',
        id: 'tap-test',
        text: 'Нажми меня 10 раз',
        target: 10,
      },

      {
        type: 'task',
        id: 'task-test',
        text: 'Выполни это задание',
      },
    ],
  },

  {
    id: 'conditions',
    title: 'Проверка условий',
    content: [
      {
        type: 'button',
        id: 'no-1',
        label: 'Вариант 1',
      },

      {
        type: 'button',
        id: 'no-2',
        label: 'Вариант 2',
      },

      {
        type: 'button',
        id: 'no-3',
        label: 'Вариант 3',
      },

      // Показывается после конкретной кнопки
      {
        type: 'text',
        text: 'Ты нажала вариант 1',
        visibleWhen: {
          clicked: 'no-1',
        },
      },

      // Показывается, если нажаты ВСЕ указанные кнопки
      {
        type: 'text',
        text: 'Ты нажала и вариант 1, и вариант 2',
        visibleWhen: {
          all: ['no-1', 'no-2'],
        },
      },

      // Показывается, если нажата хотя бы ОДНА
      {
        type: 'text',
        text: 'Ты нажала хотя бы один из вариантов',
        visibleWhen: {
          oneFrom: ['no-1', 'no-2', 'no-3'],
        },
      },

      // НЕ нажата конкретная кнопка
      {
        type: 'text',
        text: 'Вариант 3 пока не нажат',
        visibleWhen: {
          not: {
            clicked: 'no-3',
          },
        },
      },

      // НЕ нажаты ВСЕ указанные
      {
        type: 'text',
        text: 'Ни вариант 1, ни вариант 2 ещё не нажаты',
        visibleWhen: {
          not: {
            all: ['no-1', 'no-2'],
          },
        },
      },

      // НЕ нажата НИ ОДНА из указанных
      {
        type: 'text',
        text: 'Пока не выбран ни один вариант',
        visibleWhen: {
          not: {
            oneFrom: ['no-1', 'no-2', 'no-3'],
          },
        },
      },

      // Условие можно использовать не только для текста
      {
        type: 'meme',
        src: 'src/assets/images/ya1.jpeg',
        visibleWhen: {
          clicked: 'no-1',
        },
      },
    ],
  },

  {
    id: 'confirmation',
    title: 'Подтверждение страницы',
    content: [
      {
        type: 'text',
        text: 'Здесь проверяем кнопку, которая разрешает переход на следующую страницу.',
      },

      {
        type: 'button',
        id: 'agree',
        label: 'Да, хочу дальше',
        variant: 'positive',
        allowNext: true,
      },

      {
        type: 'button',
        id: 'decline',
        label: 'Нет',
        variant: 'negative',
        message: 'Ну ладно...',
      },

      {
        type: 'button',
        id: 'angry-decline',
        label: 'Нет (еще и злое)',
        variant: 'negative',
        message: 'Вот это уже обидно.',
      },
    ],
  },

  {
    id: 'conditional-confirmation',
    title: 'Условное подтверждение',
    content: [
      {
        type: 'text',
        text: 'Следующая страница станет доступна только после выполнения условия.',
      },

      {
        type: 'button',
        id: 'first',
        label: 'Сначала нажми меня',
      },

      {
        type: 'button',
        id: 'second',
        label: 'Теперь меня',
        visibleWhen: {
          clicked: 'first',
        },
      },

      {
        type: 'button',
        id: 'finish',
        label: 'Готово',
        variant: 'positive',
        visibleWhen: {
          all: ['first', 'second'],
        },
        allowNext: true,
      },
    ],
  },
]