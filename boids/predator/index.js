let visual_range = 400;
var grid, spawner, predator;
var predator_death_counter = 0;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    reset();
}

function reset() {
    grid = new Grid(width, height, visual_range);

    spawner = new Spawner(createVector(150, 150), 50, 1);

    grid.add_boids(
        spawner.spawn(
            100,
            PredatorAvoidingBoid.random_vel.bind(PredatorAvoidingBoid)
        )
    );

    predator = new Predator(-1, width - 50, height - 50, -1, -1);
    grid.add_boid(predator);
}

function draw() {
    background(0);
    grid.update();

    if (predator.dead) {
        predator_death_counter++;
    }

    if (predator_death_counter > frameRate() * 5) {
        predator_death_counter = 0;
        reset();
    }
}
