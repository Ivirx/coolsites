import './style.scss';

const horizontalNav = document.querySelector('.horizontal-nav') as HTMLElement;
const iconDivs = horizontalNav?.querySelectorAll('[class*="icon-"]');
const horizontalNavIndicator = horizontalNav?.querySelector('.horizontal-nav__indicator') as HTMLElement;

if (horizontalNav)
  horizontalNav.addEventListener('click', e => {
    const target = e.target as HTMLElement;
    const whichIcon = target.closest('[class*="icon-"]') as HTMLElement;

    // If the target is not an icon, return
    if (!whichIcon) return;

    // If the target is the icon, then first remove the active class from all icons
    iconDivs?.forEach(iconDiv => iconDiv.classList.remove('active'));

    // Then add the active class to the target icon
    whichIcon.classList.add('active');

    // Changing the body background color accodingly
    document.body.style.backgroundColor = `var(--theme-${whichIcon.dataset.id})`;

    if (horizontalNavIndicator) {
      horizontalNavIndicator.classList.remove('animate');
      horizontalNavIndicator.style.left = `calc(var(--padding-inline) + ((var(--svg-size) + var(--icon-gap)) * ${String((parseInt(whichIcon.dataset.id!) - 1))}))`;

      horizontalNavIndicator.classList.add('animate');
    }

    // animating the indicator
    // if (horizontalNavIndicator)
    //   horizontalNavIndicator.animate(
    //     [
    //       { scale: '1' },
    //       { scale: '1.15 .85' },
    //       { scale: '.85 1.15' },
    //       { scale: '1.15 .85' },
    //       { scale: '1' },
    //     ],
    //     { duration: 400, iterations: 1, fill: 'forwards', easing: 'ease-in-out' }
    //   );

  });
