/*
  Демо всех возможностей. Открывается по адресу с ?demo (например http://localhost:5173/?demo).
  Это шпаргалка: копируй отсюда блоки в story.js.
*/

/** @type {import('../types/story.js').Story} */
export const demoStory = {
  id: 'demo',
  pages: [
    {
      id: 'demo-blocks',
      title: 'Все типы блоков',
      blocks: [
        {
          id: 'demo-text',
          type: 'text',
          text: 'Обычный текст. Здесь можно писать любой текст страницы.\nПеренос строки тоже работает.',
        },
        {
          id: 'demo-image',
          type: 'image',
          src: 'images/ya1.jpeg',
          alt: 'Картинка без подписи',
        },
        {
          id: 'demo-image-caption',
          type: 'image',
          src: 'images/lich1.jpeg',
          alt: 'Картинка с подписью',
          caption: 'Подпись под картинкой (поле caption)',
        },
        {
          id: 'demo-positive',
          type: 'button',
          label: 'Положительная кнопка',
          variant: 'positive',
          message: 'Ты нажала положительную кнопку!',
        },
        {
          id: 'demo-neutral',
          type: 'button',
          label: 'Нейтральная кнопка',
          message: 'Обычная нейтральная кнопка (variant можно не указывать).',
        },
        {
          id: 'demo-negative',
          type: 'button',
          label: 'Отрицательная кнопка',
          variant: 'negative',
          message: 'Ой. Зачем ты это нажала?',
        },
        {
          id: 'demo-secret',
          type: 'button',
          label: 'Секретная кнопка',
          message: 'Появилась после положительной кнопки',
          visibleWhen: { clicked: 'demo-positive' },
        },
        {
          id: 'demo-tap',
          type: 'tap',
          text: 'Нажми кнопку 10 раз',
          target: 10,
          message: 'Всё, можно продолжать 😌',
        },
        {
          id: 'demo-choice',
          type: 'choice',
          question: 'Что мы сейчас выбираем?',
          options: [
            { label: 'Вариант А', message: 'Неплохо 😌' },
            { label: 'Вариант Б', message: 'Вот именно ❤️' },
            { label: 'Вариант В', message: 'Попробуй ещё раз' },
          ],
        },
      ],
    },
    {
      id: 'demo-conditions',
      title: 'Проверка условий',
      blocks: [
        { id: 'demo-opt-1', type: 'button', label: 'Вариант 1' },
        { id: 'demo-opt-2', type: 'button', label: 'Вариант 2' },
        { id: 'demo-opt-3', type: 'button', label: 'Вариант 3' },
        {
          id: 'demo-if-clicked',
          type: 'text',
          text: 'clicked — ты нажала вариант 1',
          visibleWhen: { clicked: 'demo-opt-1' },
        },
        {
          id: 'demo-if-all',
          type: 'text',
          text: 'all — ты нажала и вариант 1, и вариант 2',
          visibleWhen: { all: ['demo-opt-1', 'demo-opt-2'] },
        },
        {
          id: 'demo-if-one',
          type: 'text',
          text: 'oneFrom — ты нажала хотя бы один из вариантов',
          visibleWhen: { oneFrom: ['demo-opt-1', 'demo-opt-2', 'demo-opt-3'] },
        },
        {
          id: 'demo-if-not',
          type: 'text',
          text: 'not + clicked — вариант 3 пока не нажат',
          visibleWhen: { not: { clicked: 'demo-opt-3' } },
        },
        {
          id: 'demo-if-not-all',
          type: 'text',
          text: 'not + all — варианты 1 и 2 ещё не нажаты вместе',
          visibleWhen: { not: { all: ['demo-opt-1', 'demo-opt-2'] } },
        },
        {
          id: 'demo-if-none',
          type: 'text',
          text: 'not + oneFrom — пока не выбран ни один вариант',
          visibleWhen: { not: { oneFrom: ['demo-opt-1', 'demo-opt-2', 'demo-opt-3'] } },
        },
        {
          id: 'demo-if-image',
          type: 'image',
          src: 'images/ya1.jpeg',
          alt: 'Картинка, которая появляется по условию',
          caption: 'Условие работает для любого блока',
          visibleWhen: { clicked: 'demo-opt-1' },
        },
      ],
    },
    {
      id: 'demo-gate',
      title: 'Подтверждение страницы',
      blocks: [
        {
          id: 'demo-gate-text',
          type: 'text',
          text: 'Блок с allowNext закрывает переход дальше, пока его не нажмут.',
        },
        {
          id: 'demo-agree',
          type: 'button',
          label: 'Да, хочу дальше',
          variant: 'positive',
          allowNext: true,
        },
        {
          id: 'demo-decline',
          type: 'button',
          label: 'Нет',
          variant: 'negative',
          message: 'Ну ладно...',
        },
      ],
    },
    {
      id: 'demo-gate-chain',
      title: 'Условное подтверждение',
      blocks: [
        {
          id: 'demo-chain-text',
          type: 'text',
          text: 'Следующая страница откроется только после цепочки нажатий. allowNext работает и для tap, и для choice.',
        },
        { id: 'demo-first', type: 'button', label: 'Сначала нажми меня' },
        {
          id: 'demo-second',
          type: 'button',
          label: 'Теперь меня',
          visibleWhen: { clicked: 'demo-first' },
        },
        {
          id: 'demo-finish',
          type: 'button',
          label: 'Готово',
          variant: 'positive',
          allowNext: true,
          visibleWhen: { all: ['demo-first', 'demo-second'] },
        },
      ],
    },
    {
      id: 'demo-custom',
      title: 'Свой блок',
      blocks: [
        {
          id: 'demo-custom-text',
          type: 'text',
          text: 'Если нужен блок с особой логикой — создай компонент в src/components/blocks/custom и добавь его в реестр (registry.js).',
        },
        {
          id: 'demo-custom-block',
          type: 'example-custom',
          text: 'Это кастомный блок. Он сам решает, когда «выполнено».',
          buttonLabel: 'Выполнить условие',
          message: 'Условие выполнено, можно дальше',
          allowNext: true,
        },
      ],
    },
    {
      id: 'demo-end',
      title: 'Конец демо',
      blocks: [{ id: 'demo-end-text', type: 'text', text: 'Сюда можно попасть только через кастомный блок.' }],
    },
  ],
}
