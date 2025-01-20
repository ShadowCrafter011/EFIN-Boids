let boids = [];

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    for (let i = 0; i < 200; i++) {
        boids.push(SmallBoid.random(i, width, height));
    }
}

function draw() {
    background(0);

    for (let boid of boids) {
        boid.update(boids);
    }
}
