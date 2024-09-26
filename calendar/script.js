const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let month = new Date().getMonth();  // 0 - 11
let year = new Date().getFullYear();

window.onload = () => {
    const dateGrid = document.querySelector('.date-grid');
    dateGrid.innerHTML = "";

    const dateWrapperTemplate = document.querySelector("#date-wrapper-template");
    for (let i = 0; i < 35; i++) {
        const dateWrapper = dateWrapperTemplate.content.cloneNode(true);
        const [s1, s2, s3] = dateWrapper.querySelectorAll('span');
        s1.textContent = i + 1;
        s1.style.transitionDelay = `${10 * i}ms`;
        s2.textContent = i + 2;
        s2.style.transitionDelay = `${10 * i}ms`;
        s3.textContent = i + 3;
        s3.style.transitionDelay = `${10 * i}ms`;
        dateGrid.appendChild(dateWrapper);
    }

    const dateWrappers = document.querySelectorAll('.date-wrapper');
    const spanYear = document.querySelector('#year');
    const monthWrapper = document.querySelector('#month-wrapper');

    function fillTheDates(year, month, dates, monthEle) {
        const date = new Date(year, month);
        const startDay = date.getDay();
        const noOfDays = new Date(year, (month + 1), 0).getDate();

        monthEle.innerHTML = MONTHS[month];
        spanYear.innerHTML = year;

        for (let i = 0; i < 35; i++) {
            dates[(i + startDay) % 35].innerHTML = i + 1 > noOfDays ? '' : i + 1;
        }
    }

    const nxt = document.querySelector('#nxt');
    const pre = document.querySelector('#pre');

    nxt.onclick = () => {
        nxt.disabled = true;
        pre.disabled = true;

        month = month + 1;
        if (month > 11) {
            month = 0;
            year++;
        }
        fillTheDates(year, month, document.querySelectorAll(".date-wrapper>span:last-child"), document.querySelector("#month-wrapper>span:last-child"));

        dateWrappers.forEach(dateWrapper => {
            dateWrapper.appendChild(dateWrapper.querySelector('span:first-child'));
        });
        monthWrapper.appendChild(monthWrapper.querySelector('span:first-child'));

        nxt.disabled = false;
        pre.disabled = false;
    }

    pre.onclick = () => {
        nxt.disabled = true;
        pre.disabled = true;

        month = month - 1;
        if (month < 0) {
            month = 11;
            year--;
        }
        fillTheDates(year, month, document.querySelectorAll(".date-wrapper>span:first-child"), document.querySelector("#month-wrapper>span:first-child"));

        dateWrappers.forEach(dateWrapper => {
            dateWrapper.insertBefore(dateWrapper.querySelector('span:last-child'), dateWrapper.querySelector('span:first-child'));
        });
        monthWrapper.insertBefore(monthWrapper.querySelector('span:last-child'), monthWrapper.querySelector('span:first-child'));

        nxt.disabled = false;
        pre.disabled = false;
    }

    fillTheDates(year, month, document.querySelectorAll(".date-wrapper>span:nth-child(2)"), document.querySelector("#month-wrapper>span:nth-child(2)"));
}