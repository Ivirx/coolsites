const blob = document.querySelector('#blob');

document.body.onpointermove = event => {
    const { clientX, clientY } = event;

    blob.animate([{ top: `${clientY}px`, left: `${clientX}px`, },], { duration: 2000, fill: 'forwards' });
};
