const word = document.querySelector('#word');

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let interval = null;

function jumble({ target }) {
    clearInterval(interval);

    const value = target.dataset.value;

    let iteration = 0;
    interval = setInterval(() => {
        target.innerText = value.split('').map((_letter, index) => {
            if (index < iteration) return value[index];

            return LETTERS[Math.floor(Math.random() * 26)];
        }).join('');

        if (iteration > value.length) clearInterval(interval);
        iteration += 1 / 3;
    }, 30);
}

word.addEventListener('mouseover', jumble);
word.addEventListener('touchstart', jumble);
