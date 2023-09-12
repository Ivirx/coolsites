const slides = Array.from(document.querySelectorAll('.slide'));
const hours = [slides[0], slides[1]];
const minutes = [slides[2], slides[3]];
const seconds = [slides[4], slides[5]];

function setSlide(slide, value) {
	slide.style.setProperty('--_on-element', value);
}

function setTime(time, id) {
	const ones = parseInt(time % 10);
	const tens = parseInt(time / 10);

	if (id === 'h') {
		setSlide(hours[0], tens);
		setSlide(hours[1], ones);
	}
	if (id === 'm') {
		setSlide(minutes[0], tens);
		setSlide(minutes[1], ones);
	}
	if (id === 's') {
		setSlide(seconds[0], tens);
		setSlide(seconds[1], ones);
	}
}

setTimeout(() => {
	const d = new Date();
	let hr = d.getHours();
	let min = d.getMinutes();
	let sec = d.getSeconds();

	setTime(hr, 'h');
	setTime(min, 'm');
	setTime(sec, 's');

	setInterval(() => {
		sec++;
		if (sec >= 60) {
			sec = 0;

			min++;
			if (min >= 60) {
				min = 0;

				hr++;
				if (hr >= 24) {
					hr = 0;
				}

				setTime(hr, 'h');
			}

			setTime(min, 'm');
		}

		setTime(sec, 's');
	}, 1000);
}, 700);
