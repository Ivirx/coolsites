const section = document.querySelector("section");

const numbers = document.querySelectorAll(".number");
const totalNumbers = numbers.length;
const trayNumbers = totalNumbers - 4;
const trayMaxPosition = trayNumbers - 4;
const staticPosition = 4;

const doubles = document.querySelectorAll(".double");
const doubleFirst = doubles[0];
const doubleLast = doubles[1];

const nextButton = document.querySelector(".next-button");
const preButton = document.querySelector(".pre-button");

function setIndicator(value) {
	let indicatorPosition = 0;
	if (value - staticPosition < 0) {
		indicatorPosition = value;
	} else if (value - staticPosition > trayMaxPosition) {
		indicatorPosition = value - trayMaxPosition;
	} else {
		indicatorPosition = staticPosition;
	}
	const trayPosition =
		value - staticPosition > trayMaxPosition
			? trayMaxPosition
			: Math.max(value - staticPosition, 0);

	section.style.setProperty("--indicator-position", indicatorPosition);
	section.style.setProperty("--tray-position", trayPosition);

	if (value - (staticPosition + 1) < 0) {
		doubleFirst.classList.remove("dots");
		doubleLast.classList.add("dots");
	} else if (value - (staticPosition - 1) > trayMaxPosition) {
		doubleFirst.classList.add("dots");
		doubleLast.classList.remove("dots");
	} else {
		doubleFirst.classList.add("dots");
		doubleLast.classList.add("dots");
	}

	section.dataset.currentPage = value;
}

numbers.forEach((number) => {
	const value = parseInt(number.dataset.value);

	number.addEventListener("click", () => {
		setIndicator(value);
	});
});

nextButton.onclick = () => {
	const currentPage = parseInt(section.dataset.currentPage);

	if (currentPage >= 20) return;

	setIndicator(currentPage + 1);
};

preButton.onclick = () => {
	const currentPage = parseInt(section.dataset.currentPage);

	if (currentPage <= 1) return;

	setIndicator(currentPage - 1);
};
