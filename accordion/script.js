const accordionHolder = document.querySelector('.accordion-holder');
const accordions = accordionHolder.querySelectorAll('.accordion');

function activateAccordion(event) {
    const clickedAccordion = event.target.closest('.accordion');

    if (!clickedAccordion) return;

    accordions.forEach(accordion => accordion.classList.remove('active'));
    clickedAccordion.classList.add('active');
}

accordionHolder.addEventListener('click', (event) => {
    const clickedAccordion = event.target.closest('.accordion');

    if (!clickedAccordion) return;

    clickedAccordion.querySelector('button').focus();
});

accordionHolder.querySelectorAll('button').forEach(button => button.addEventListener('focus', activateAccordion));


accordionHolder.querySelector('button').focus();
