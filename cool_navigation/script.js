const links = document.querySelector('.links').children;

Array.from(links).forEach((link, index) => {
    link.onmouseover = () => {
        document.querySelector('.backImage').dataset.imageindex = index;
    };
});
