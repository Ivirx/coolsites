window.onload = () => {
	const main = document.querySelector('main');

	const pageHeight = document.querySelector('main').clientHeight;
	let maxScroll = pageHeight - window.innerHeight;
	let minScroll = 0;

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			// To observer where the main is and set the minScroll & maxScroll value accordingly
			minScroll = entry.boundingClientRect.y;
			maxScroll = maxScroll + entry.boundingClientRect.y;
		});
	});
	observer.observe(main);

	let scrolled = 0;

	function scrollPage(shouldScroll) {
		const scrollTo = Math.min(shouldScroll + scrolled, maxScroll);

		if (scrollTo <= minScroll) {
			main.style.setProperty('--scroll', minScroll.toString() + 'px');
			return;
		}

		if (scrollTo >= maxScroll) {
			main.style.setProperty('--scroll', maxScroll.toString() + 'px');
			return;
		}

		main.style.setProperty('--scroll', scrollTo.toString() + 'px');

		scrolled = scrollTo;
	}

	function initScrollPage(deltaY, scrollValue) {
		// const scrollValue = 10;
		let shouldScroll = deltaY >= 0 ? scrollValue : -scrollValue;
		const scrollDirection = shouldScroll >= 0 ? 'down' : 'up';

		const setIntervalId = setInterval(() => {
			const nowScrollBy = shouldScroll;

			// console.log(
			// 	nowScrollBy,
			// 	scrolled,
			// 	minScroll + 1, // not to run pass minScroll
			// 	maxScroll - 1 // not to run pass maxScroll
			// );

			scrollPage(nowScrollBy);

			if ((scrollDirection === 'down' && nowScrollBy < 0.5) || scrolled >= maxScroll - 1)
				clearInterval(setIntervalId);

			if ((scrollDirection === 'up' && nowScrollBy > -0.5) || scrolled <= minScroll + 1)
				clearInterval(setIntervalId);

			shouldScroll = shouldScroll / 1.08;
		}, 30);
	}

	document.querySelector('html').addEventListener('wheel', (event) => {
		initScrollPage(parseFloat(event.deltaY), 10);
	});

	// For touch devices
	// 	let startY = 0;

	// 	function detectSwipeDirection(touchStartY, touchEndY) {
	// 		var swipeThreshold = 1;

	// 		if (touchEndY - touchStartY > swipeThreshold) {
	// 			return (touchEndY - touchStartY) * -1; // swiped down means scroll moves up
	// 		} else if (touchStartY - touchEndY > swipeThreshold) {
	// 			return touchStartY - touchEndY; // swiped up means scroll moves down
	// 		} else {
	// 			return null; // No significant swipe detected
	// 		}
	// 	}

	// 	document.addEventListener("touchstart", (event) => {
	// 		startY = event.touches[0].clientY;
	// 	});

	// 	document.addEventListener("touchmove", (event) => {
	// 		const endY = event.changedTouches[0].clientY;
	// 		const value = detectSwipeDirection(startY, endY);
	// 		if (value) initScrollPage(value, 2);
	// 		console.log(startY, endY, value);
	// 		startY = endY;
	// 	});
};
