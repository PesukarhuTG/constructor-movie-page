/*new Swiper('.swiper-container', {
	loop: true,
	navigation: {
		nextEl: '.arrow',
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 20
		},
		541: {
			slidesPerView: 2,
			spaceBetween: 40
		}
	}
});

const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.header');
menuButton.addEventListener('click', function () {
	menuButton.classList.toggle('menu-button-active');
	menu.classList.toggle('header-active');
})*/


/* ========================= КОНСТРУКТОР ОТДЕЛЬНЫХ ЭЛЕМЕНТОВ ========================= */

const getElement = (tagName, classNames, attributes) => {
	//создание элемента с заданным именем тега
	const element = document.createElement(tagName);

	if (classNames) {
		element.classList.add(...classNames);
	}

	if (attributes) {
		//перебираем атрибуты и добавляем к нашему элементу т.е. из объекта переносим св-во в элемент
		for (const attribute in attributes) {
			element[attribute] = attributes[attribute];
		}
	}
	return element;
};

/* ========================= ФОРМИРОВАНИЕ HEADER ========================= */

const createHeader = (param) => {
	//создаем элементы на основе ф-ции getElement
	const header = getElement('header');
	const container = getElement('div', ['container']);
	const wrapper = getElement('div', ['header']);

	//если logo указано
	if (param.header.logo) {
		const logo  = getElement('img', ['logo'], {
			src: param.header.logo,
			alt: 'Логотип '+ param.title,
		});

		wrapper.append(logo);
	}

	//если menu указано
	if (param.header.menu) {
		const navWrapper = getElement('nav', ['menu-list']);

		const allMenuLink = param.header.menu.map(item => {
			const navLink = getElement('a', ['menu-link'], {
				href:item.link,
				textContent: item.title,
			});
			return navLink;
		});

		navWrapper.append(...allMenuLink);
		wrapper.append(navWrapper);
	}

	//если соц сети указаны
	if (param.header.social) {
		const socialWrapper = getElement('div', ['social']);

		const allSocial = param.header.social.map(item => {
			const socialLink = getElement('a', ['social-link']);
			socialLink.append(getElement('img', [], {
				src: item.image,
				alt: item.title,
			}));
			socialLink.href = item.link;
			return socialLink;
		});

		socialWrapper.append(...allSocial);
		wrapper.append(socialWrapper);
	}

	header.append(container);
	container.append(wrapper);

	return header;
};

/* ========================= ФОРМИРОВАНИЕ ВСЕЙ СТРАНИЦЫ ========================= */

const movieConstructor = (selector, options) => {

	//получили элемент со страницы с заданным селектором
	const app = document.querySelector(selector);
	
	app.classList.add('body-app');

	//есть ли header в нашем передаваемом объекте options
	if (options.header) {
		//вставляем на страницу в div.app наш header
		app.append(createHeader(options));
	}

	//замена title страницы
	document.title = options.title;

};

/* ========================= ПЕРЕДАВАЕМЫЕ ДАННЫЕ ДЛЯ BODY========================= */

movieConstructor('.app', {
	title: 'Witcher', 
	header: {
		logo: 'witcher/logo.png',
		social: [
			{
				title: 'Twitter',
				link: 'https://twitter.com/home?lang=ru',
				image: 'witcher/social/twitter.svg',
			},
			{
				title: 'Instagram',
				link: 'https://www.instagram.com/?hl=ru',
				image: 'witcher/social/instagram.svg',
			},
			{
				title: 'Facebook',
				link: 'https://www.facebook.com/',
				image: 'witcher/social/facebook.svg',
			},
		],
		menu: [
			{
				title: 'Описание',
				link: '#',
			},
			{
				title: 'Трейлер',
				link: '#',
			},
			{
				title: 'Отзывы',
				link: '#',
			},
		],
	},
});