const degreeElement = document.querySelector("#deg"),
	INCREMENT = 6,
	DURATION = 166.6666 * INCREMENT,
	days = document.querySelector("#days>span:first-child"),
	hours = document.querySelector("#hours>span:first-child"),
	minutes = document.querySelector("#minutes>span:first-child"),
	targetDate = parseInt(Date.parse("Apr 11 2024") / 1000);

let degree = 0,
	degreeStartTime = null,
	degreeElapsedTime = 0,
	todayDate = parseInt(Date.now() / 1000),
	timeLeft = targetDate - todayDate;

function calcCountdown() {
	timeLeft = targetDate - todayDate;

	const daysLeft = parseInt(timeLeft / (24 * 60 * 60));
	if (!(daysLeft <= 0)) timeLeft %= daysLeft * 24 * 60 * 60;

	const hoursLeft = parseInt(timeLeft / (60 * 60));
	if (!(hoursLeft <= 0)) timeLeft %= hoursLeft * 60 * 60;

	const minutesLeft = parseInt(timeLeft / 60);
	if (!(minutesLeft <= 0)) timeLeft %= minutesLeft * 60;

	days.textContent = daysLeft < 10 ? `0${daysLeft}` : daysLeft;
	hours.textContent = hoursLeft < 10 ? `0${hoursLeft}` : hoursLeft;
	minutes.textContent = minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft;
}

function updateDrgree(currentTime) {
	if (!degreeStartTime) degreeStartTime = currentTime;
	degreeElapsedTime = currentTime - degreeStartTime;

	if (degreeElapsedTime > DURATION) {
		deg.style.setProperty("--deg", `${degree}deg`);
		degree += INCREMENT;

		if (degree % (360 + 12) === 0) {
			todayDate += 60;
			calcCountdown();
		}

		degreeStartTime = currentTime;
	}

	requestAnimationFrame(updateDrgree);
}

// Adding event listener on window
window.onload = () => {
	degreeElement.style.setProperty("transition-duration", `${DURATION}ms`); // Updating the duaration according to the INCREMENT and DURATION values
	calcCountdown();

	requestAnimationFrame(updateDrgree);
};

window.onfocus = () => {
	degreeStartTime = null;

	todayDate = parseInt(Date.now() / 1000);
	calcCountdown();
};

/* -------------------------------------------------------------------------------------- */

// Code for updating the countdown
/* const days = document.querySelector("#days>span:first-child"),
  hours = document.querySelector("#hours>span:first-child"),
  minutes = document.querySelector("#minutes>span:first-child"),
  targetDate = parseInt(Date.parse("Apr 11 2024") / 1000);

let todayDate = parseInt(Date.now() / 1000),
  timeLeft = targetDate - todayDate,
  timerStartTime = null,
  timerElapsedTime = 0;

function calcCountdown() {
  timeLeft = targetDate - todayDate;

  const daysLeft = parseInt(timeLeft / (24 * 60 * 60));
  if (!(daysLeft <= 0)) timeLeft %= daysLeft * 24 * 60 * 60;

  const hoursLeft = parseInt(timeLeft / (60 * 60));
  if (!(hoursLeft <= 0)) timeLeft %= hoursLeft * 60 * 60;

  const minutesLeft = parseInt(timeLeft / 60);
  if (!(minutesLeft <= 0)) timeLeft %= minutesLeft * 60;

  days.textContent = daysLeft < 10 ? `0${daysLeft}` : daysLeft;
  hours.textContent = hoursLeft < 10 ? `0${hoursLeft}` : hoursLeft;
  minutes.textContent = minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft;
}

function updateCountdown(currentTime) {
  if (targetDate - todayDate < 0) return;

  if (!timerStartTime) timerStartTime = currentTime;
  timerElapsedTime = currentTime - timerStartTime;

  if (timerElapsedTime > 1000 * 60) {
    todayDate += 60;
    calcCountdown();

    timerStartTime = currentTime;
  }

  requestAnimationFrame(updateCountdown);
} */

/* -------------------------------------------------------------------------------------- */
