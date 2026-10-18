/*
  Твой рассказ. Меняй тексты, порядок страниц и блоков — компоненты трогать не нужно.

  Правила:
  - у каждой страницы и у каждого блока свой уникальный id (латиницей, через дефис);
    не меняй id после того, как отправишь ссылку — на них держатся условия и лайки;
  - картинки клади в public/images и указывай путь 'images/имя-файла.jpg';
  - все типы блоков и их поля — в src/data/demo.js (открой сайт с ?demo в адресе).
*/

/** @type {import('../types/story.js').Story} */
export const story = {
  id: 'main',
  pages: [
    {
      id: 'hello',
      title: 'Привет))))',
      blocks: [
        {
          id: 'hello-intro',
          type: 'text',
          text: 'Зря ты сказала что в пинтересте можно искать мемы...теперь я....',
        },
        {
          id: 'hello-meme-pictures',
          type: 'image',
          src: 'images/ya1.jpeg',
          alt: 'Лесная дорога с подписью: «Да, я выражаю свои мысли через вот такие картинки с текстом»',
        },
        {
          id: 'hello-also',
          type: 'text',
          text: 'а еще',
        },
        {
          id: 'hello-meme-personality',
          type: 'image',
          src: 'images/lich1.jpeg',
          alt: 'Лес с ручьём и подписью: «У меня нет личности, я набор интернет приколов»',
          caption:
            'Это конечно не полная правда, я все же еще не полностью набор картинок, чуток мыслей еще присутствует',
        },
      ],
    },
    {
      id: 'start',
      title: 'Что же щас будет?',
      blocks: [
        {
          id: 'start-intro',
          type: 'text',
          text: 'Да ничего страшного, просто хочу как-то тебя повеселить. А может и не только...я сам не знаю что взбредет мне сюда добавить (знаю), начнем?',
        },
        {
          id: 'sixseven-1',
          type: 'button',
          label: 'Газ газ сиксевен!',
          message: 'Эээээ...не думал что будет так легко, свайпай вправо',
          variant: 'positive',
        },
        {
          id: 'no-1',
          type: 'button',
          label: 'Нет',
          variant: 'negative',
        },
        {
          id: 'start-ask-again',
          type: 'text',
          text: 'Ну ладно... а если ещё раз спросить?',
          visibleWhen: { clicked: 'no-1' },
        },
        {
          id: 'no-2',
          type: 'button',
          label: 'Нет (еще и злое)',
          variant: 'negative',
          visibleWhen: { clicked: 'no-1' },
        },
        {
          id: 'start-maybe',
          type: 'text',
          text: 'А может....',
          visibleWhen: { oneFrom: ['no-2', 'no-3'] },
        },
        {
          id: 'no-3',
          type: 'button',
          label: 'ТОЧНО НЕТ!',
          variant: 'negative',
          visibleWhen: { all: ['no-1', 'no-2'] },
        },
      ],
    },
  ],
}
