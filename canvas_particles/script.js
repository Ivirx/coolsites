const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
    x: undefined,
    y: undefined,
}
const particles = [];
let hue = 0;


class Particle {
    constructor() {
        const SPEEDRATE = 3  //
        const SIZE = 10  //

        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * SIZE + 1;
        this.speedX = Math.random() * SPEEDRATE - (SPEEDRATE / 2);
        this.speedY = Math.random() * SPEEDRATE - (SPEEDRATE / 2);
        this.color = `hsl(${hue}, 100%, 50%)`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size >= 0.2)
            this.size -= 0.1;
    }

    draw() {
        canvasContext.fillStyle = this.color;  // for individual color change
        // canvasContext.fillStyle = this.color = `hsl(${hue}, 100%, 50%)`;  // for head to tail color change
        canvasContext.beginPath();
        canvasContext.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        canvasContext.fill();

        for (let i = 0; i < particles.length; i++) {
            const particle = particles[i];

            const distanceX = Math.abs(particle.x - this.x);
            const distanceY = Math.abs(particle.y - this.y);
            const distance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));

            if (distance < 100) {  // 
                canvasContext.strokeStyle = this.color;
                canvasContext.lineWidth = 0.2;
                canvasContext.beginPath();
                canvasContext.moveTo(particle.x, particle.y);
                canvasContext.lineTo(this.x, this.y);
                canvasContext.stroke();
            }
        }
    }
}

canvas.addEventListener('mousemove', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;

    particles.push(new Particle());
});

canvas.addEventListener('click', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;

    for (let i = 0; i < 15; i++)  //
        particles.push(new Particle());
});

function draw() {
    // canvasContext.fillStyle = '#0001'
    // canvasContext.fillRect(0, 0, window.innerWidth, window.innerHeight);
    canvasContext.clearRect(0, 0, window.innerWidth, window.innerHeight);

    if (hue >= 360) hue = 0;
    else hue += 1;

    for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        particle.update();
        particle.draw();

        if (particle.size < 0.2) {
            particles.splice(i, 1);
            i--;
        }
    }
}

function animate() {
    draw();
    requestAnimationFrame(animate);
}

window.onload = () => {
    animate();
    // setInterval(() => {
    //     draw();
    // }, 15);
}

window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
