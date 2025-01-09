boids = []

function setup() {
    createCanvas(
        window.innerWidth,
        window.innerHeight
    );

    for (let x = 0; x < 100; x++) {
        boids.push(
            new Boid(
                Math.random() * width,
                Math.random() * height,
                Math.random() - 0.5,
                Math.random() - 0.5
            )
        )
    }

    noStroke();
}


function draw() {
    background(0);

    for (let boid of boids) {
        boid.update();
    }
}