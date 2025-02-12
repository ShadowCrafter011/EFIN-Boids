let visual_range = 400;
var grid, spawner;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    grid = new Grid(width, height, visual_range);

    spawner = new Spawner(createVector(150, 150), 50, 1);

    grid.add_boids(
        spawner.spawn(
            50,
            PredatorAvoidingBoid.random_vel.bind(PredatorAvoidingBoid)
        )
    );

    grid.add_boid(new Predator(-1, width - 50, height - 50, -1, -1));
}

function draw() {
    background(0);
    grid.update();
    spawner.show();
}
