const container = document.querySelector('.container');

const errorTemplate = document.querySelector('#error');
const successTemplate = document.querySelector('#success');
const infoTemplate = document.querySelector('#info');

function flash(template, msgText) {
	const element = template.content.cloneNode(true);

	const wrapper = element.querySelector('.wrapper');
	const text = element.querySelector('.text');
	const dismiss = element.querySelector('.dismiss');

	const id = Date.now();
	wrapper.dataset.id = id;
	text.innerText = msgText;

	const insertAfterThis = container.firstElementChild;
	insertAfterThis
		? container.insertBefore(element, insertAfterThis)
		: container.appendChild(element);

	setTimeout(() => {
		const wrapper = document.querySelector(`[data-id='${id}']`);
		wrapper.classList.add('enter');

		const message = wrapper.querySelector(`.message`);

		wrapper.animate([{ height: 0 }, { height: `${message.offsetHeight}px` }], {
			duration: 150,
			fill: 'forwards',
			easing: 'ease-in-out',
		});

		dismiss.onclick = () => {
			wrapper.classList.add('exit');
			wrapper.animate(
				[{ height: `${message.offsetHeight}px` }, { height: 0, margin: 0 }],
				{ duration: 250, fill: 'forwards', delay: 400, easing: 'ease-in-out' }
			);

			setTimeout(() => {
				wrapper.remove();
				flash(template, msgText);
			}, 700);
		};
	}, 100);
}

setTimeout(() => {
	flash(successTemplate, 'Life has its highs and lows.');
}, 50);
setTimeout(() => {
	flash(infoTemplate, `Maybe today didn't go as well as you hoped.`);
}, 100);
setTimeout(() => {
	flash(errorTemplate, 'Has life not treated you kindly today?');
}, 150);
