import CustomMeme from './components/custom/CustomMeme'

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
		// requireConfirmation: true,
		title: 'Что же щас будет?',
		content: [
			// {
			// 	type: 'button',
			// 	id: 'confirm-1',
			// 	label: 'Подтвердить',
			// 	confirm: true,
			// },
			{
				type: 'text',
				value: 'Да ничего страшного, просто хочу как-то тебя повеселить. А может и не только...я сам не знаю что взбредет мне сюда добавить (знаю), начнем?',
			},
			{
				id: 'sixseven-1',
				type: 'button',
				label: 'Газ газ сиксевен!',
				message: 'Эээээ...не думал что будет так легко, свайпай вправо',
			},
			{
				type: 'button',
				id: 'no-1',
				label: 'Нет',
				message: '',
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
				id: 'no-2',
				label: 'Нет (еще и злое)',
				message: '',
				visibleWhen: {
					clicked: 'no-1',
				},
			},
			{
				type: 'text',
				value: 'Ты точно уверена?',
				visibleWhen: {
					oneFrom: ['no-2', 'no-3'],
				},
			},
			{
				type: 'button',
				id: 'no-3',
				label: 'ДА, ТОЧНО НЕТ!',
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
		id: 'special',
		type: 'custom',
		component: CustomMeme,
		requireConfirmation: true,
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