const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
let hue = 0;


class Particle {
    constructor(x = null, y = null) {
        const SPEEDRATE = 1.5;  //
        const DURATION = 10;  //

        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.isArtificial = false;
        if (x && y) {
            this.x = x;
            this.y = y;
            this.isArtificial = true;
        }
        this.duration = Math.random() * DURATION + 1;
        this.speedX = Math.random() * SPEEDRATE - (SPEEDRATE / 2);
        this.speedY = Math.random() * SPEEDRATE - (SPEEDRATE / 2);
        this.color = `hsl(${hue}, 100%, 50%)`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.duration > 0.1)
            this.duration -= 0.1;
    }

    draw() {
        for (let i = 0; i < particles.length; i++) {
            const particle = particles[i];

            const distanceX = Math.abs(particle.x - this.x);
            const distanceY = Math.abs(particle.y - this.y);
            const distance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));

            if (distance < 100) {  //
                canvasContext.strokeStyle = this.color;
                canvasContext.lineWidth = 0.3;
                canvasContext.beginPath();
                canvasContext.moveTo(particle.x, particle.y);
                canvasContext.lineTo(this.x, this.y);
                canvasContext.stroke();
            }
        }
    }
}

canvas.addEventListener('click', event => {
    for (let i = 0; i < 20; i++)  //
        particles.push(new Particle(event.clientX, event.clientY));
});

function draw() {
    // canvasContext.fillStyle = '#0001'  //
    // canvasContext.fillRect(0, 0, window.innerWidth, window.innerHeight);
    canvasContext.clearRect(0, 0, window.innerWidth, window.innerHeight);

    if (hue >= 360) hue = 0;
    else hue += 1;

    for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        particle.update();
        particle.draw();

        if (particle.duration < 0.1 && !particle.isArtificial) {
            particles[i] = new Particle();
        }
        if (particle.duration < 0.1 && particle.isArtificial) {
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
    for (let i = 0; i < 400; i++) particles.push(new Particle());

    animate();
    // setInterval(() => {
    //     draw();
    // }, 40);
}

window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
