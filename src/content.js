export const pages = [
    {
        id: 'hello',
        title: 'Привет))))',
        content: [
            {
                type: 'text',
                value: 'Зря ты сказала что в пинтересте можно искать мемы...теперь я....',
            },
            {
                type: 'image',
                src: 'src/assets/images/ya1.jpeg',
                alt: '1',
            },
            {
                type: 'text',
                value: 'а еще',
            },
            {
                type: 'meme',
                src: 'src/assets/images/lich1.jpeg',
                alt: '2',
                caption: 'Это конечно не полная правда, я все же еще не полностью набор картинок, чуток мыслей еще присутствует',
            },
        ],
    },
    {
        id: 'second',
        title: 'Что же щас будет?',
        content: [
            {
                type: 'text',
                value: 'Да ничего страшного, просто хочу как-то тебя повеселить. А может и не только...я сам не знаю что взбредет мне сюда добавить (знаю), начнем?',
            },
            {
                type: 'button',
                id: 'no-1',
                label: 'Нет',
                message: '',
            },

            {
                type: 'button',
                id: 'no-2',
                label: 'Нет (еще и злое)',
                message: '',
                visibleWhen: {
                    clicked: 'no-1',
                },
            },

            {
                type: 'text',
                value: 'Ну ладно... а если ещё раз спросить?',
                visibleWhen: {
                    clicked: 'no-1',
                },
            },
            {
                type: 'button',
                id: 'no-3',
                label: 'Нет, задолбал',
                message: '',
                visibleWhen: {
                    all: ['no-1', 'no-2'],
                },
            },
            // {
            //     type: 'tap',
            //     text: 'Нажми сюда 10 раз',
            //     count: 10,
            //     message: 'Всё, можно продолжать 😌',
            // },
        ],
    },
    {
        id: 'choice',
        title: 'Небольшое задание',
        content: [
            {
                type: 'task',
                question: 'Что мы сейчас выбираем?',
                options: [
                    {
                        label: 'Вариант А',
                        message: 'Неплохо 😌',
                        correct: false,
                    },
                    {
                        label: 'Вариант Б',
                        message: 'Вот именно ❤️',
                        correct: true,
                    },
                    {
                        label: 'Вариант В',
                        message: 'Попробуй ещё раз',
                        correct: false,
                    },
                ],
            },
        ],
    },
    {
        id: 'meme',
        title: 'Мем',
        content: [
            {
                type: 'image',
                src: 'https://placehold.co/400x300',
                alt: 'Тестовая картинка',
            },
            {
                type: 'meme',
                src: 'https://placehold.co/400x300',
                alt: 'Тестовый мем',
                caption: 'Когда решил сделать маленький сайт, а уже пишешь восьмой шаг',
            },
        ],
    },
]