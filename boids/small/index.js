let boids = [];

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    for (let x = 0; x < 200; x++) {
        boids.push(new SmallBoid(
            x,
            Math.random() * width,
            Math.random() * height,
            Math.random() - 0.5,
            Math.random() - 0.5
        ))
    }
}

function draw() {
    background(0);

    for (let boid of boids) {
        boid.update(boids);
    }
}
