import './style.scss';

const container = document.querySelector('.container') as HTMLElement;
const horizontalNavIndicator = container?.querySelector('.horizontal-nav__indicator') as HTMLElement;
const verticalNavIndicator = container?.querySelector('.vertical-nav__indicator') as HTMLElement;

if (container)
  container.onclick = e => {
    const target = e.target as HTMLElement;
    const validIcon = target.closest('[class*="icon"]') as HTMLElement;

    // If the target is not an icon, return
    if (!validIcon) return;

    const iconId = validIcon.dataset.id;

    document.body.style.backgroundColor = `var(--theme-${iconId})`;

    if (iconId && parseInt(iconId) < 5) {
      if (horizontalNavIndicator) {
        horizontalNavIndicator.classList.remove('animate');
        horizontalNavIndicator.style.left = `calc(var(--padding-inline) + ((var(--svg-size) + var(--icon-gap)) * ${iconId}))`;
        setTimeout(() => horizontalNavIndicator.classList.add('animate'), 1);
      }
    }
    if (iconId && parseInt(iconId!) > 4) {
      if (verticalNavIndicator) {
        verticalNavIndicator.style.top = `calc(var(--padding-block) + ((var(--svg-size) + var(--icon-gap)) * ${parseInt(iconId) - 5}))`;
      }
    }
  };
