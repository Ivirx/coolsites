const accordionHolder = document.querySelector('.accordion-holder');
const accordions = accordionHolder.querySelectorAll('.accordion');

accordionHolder.addEventListener('click', event => {
    const clickedAccordion = event.target.closest('.accordion');

    if (!clickedAccordion) return;

    accordions.forEach(accordion => accordion.classList.remove('accordion--active'));
    clickedAccordion.classList.add('accordion--active');
});
