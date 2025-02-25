const canvas = document.getElementById("weatherCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const raindrops = [];
const numSnowflakes = 150; 
const numRaindrops = 100; 

class Snowflake {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 3 + 1;
        this.speedY = Math.random() * 2 + 1;
        this.wind = Math.random() * 1.5 - 0.75; 
    }

    update() {
        this.y += this.speedY;
        this.x += this.wind;

        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Raindrop {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.length = Math.random() * 15 + 5;
        this.speedY = Math.random() * 8 + 4;
        this.wind = Math.random() * 2 - 1;
    }

    update() {
        this.y += this.speedY;
        this.x += this.wind;

        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.strokeStyle = "rgba(173, 216, 230, 0.6)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.wind, this.y + this.length);
        ctx.stroke();
    }
}

for (let i = 0; i < numSnowflakes; i++) {
    particles.push(new Snowflake());
}

for (let i = 0; i < numRaindrops; i++) {
    raindrops.push(new Raindrop());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let particle of particles) {
        particle.update();
        particle.draw();
    }

    for (let drop of raindrops) {
        drop.update();
        drop.draw();
    }

    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
