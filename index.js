var boids = []
var last_num = NaN;

function setup() {
    createCanvas(
        window.innerWidth,
        window.innerHeight
    );

    for (let x = 0; x < 30; x++) {
        boids.push(
            new Boid(
                x,
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

    let boids_on_screen = 0;
    for (let boid of boids) {
        boid.update(boids);
        boids_on_screen += boid.on_screen();
    }
    if (last_num != boids_on_screen) {
        print(`We have ${boids_on_screen} boids on screen`);
        last_num = boids_on_screen;
    }
}