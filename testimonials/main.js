window.onload = () => {
	const comments = document.querySelector(".comments");
	const profiles = document.querySelector(".profiles");

	const minus = document.querySelector("#minus");
	const plus = document.querySelector("#plus");

	plus.onclick = () => {
		const active = document.querySelector(".active");
		active.classList.remove("active");

		if (active.nextElementSibling) active.nextElementSibling.classList.add("active");
		else document.querySelector(".dots>:nth-child(1)").classList.add("active");

		comments.appendChild(comments.firstElementChild);
		profiles.appendChild(profiles.firstElementChild);
	};

	minus.onclick = () => {
		const active = document.querySelector(".active");
		active.classList.remove("active");

		if (active.previousElementSibling) active.previousElementSibling.classList.add("active");
		else document.querySelector(".dots>:last-child").classList.add("active");

		comments.insertBefore(comments.lastElementChild, comments.firstElementChild);
		profiles.insertBefore(profiles.lastElementChild, profiles.firstElementChild);
	};
};
