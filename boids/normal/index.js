var boids = []
var last_num = NaN;

function setup() {
    createCanvas(
        window.innerWidth,
        window.innerHeight
    );

    for (let i = 0; i < 50; i++) {
        boids.push(Boid.random(i, width, height));
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