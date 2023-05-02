import './style.scss';

const horizontalNav = document.querySelector('.horizontal-nav') as HTMLElement;
const horizontalNavIndicator = horizontalNav?.querySelector('.horizontal-nav__indicator') as HTMLElement;

if (horizontalNav)
  horizontalNav.onclick = e => {
    const target = e.target as HTMLElement;
    const validIcon = target.closest('[class*="icon-"]') as HTMLElement;

    // If the target is not an icon, return
    if (!validIcon) return;

    document.body.style.backgroundColor = `var(--theme-${validIcon.dataset.id})`;
    if (horizontalNavIndicator) {
      horizontalNavIndicator.classList.remove('animate');
      horizontalNavIndicator.style.left = `calc(var(--padding-inline) + ((var(--svg-size) + var(--icon-gap)) * ${validIcon.dataset.id}))`;
      setTimeout(() => horizontalNavIndicator.classList.add('animate'), 1);
    }
  };
