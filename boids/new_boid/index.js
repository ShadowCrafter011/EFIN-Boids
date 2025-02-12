var grid, spawner;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    grid = new Grid(width, innerHeight, 200);

    spawner = new Spawner(
        createVector(200, 200),
        50,
        1,
        createVector(width - 200, height - 200),
        50,
        1
    );

    let boids = spawner.spawn(50, NewBoid.random_vel.bind(NewBoid));
    grid.add_boids(boids);

    let margin = 50;
    let bottom_margin = height - margin;
    let right_margin = width - margin;
    grid.add_obstacle(
        new LineObstacle(
            margin,
            margin,
            margin,
            bottom_margin,
            createVector(1, 0),
            true
        )
    );
    grid.add_obstacle(
        new LineObstacle(
            margin,
            margin,
            right_margin,
            margin,
            createVector(0, 1),
            true
        )
    );
    grid.add_obstacle(
        new LineObstacle(
            right_margin,
            margin,
            right_margin,
            bottom_margin,
            createVector(-1, 0),
            true
        )
    );
    grid.add_obstacle(
        new LineObstacle(
            margin,
            bottom_margin,
            right_margin,
            bottom_margin,
            createVector(0, -1),
            true
        )
    );

    grid.add_obstacle(
        new LineObstacle(
            2 * margin,
            margin,
            margin,
            2 * margin,
            createVector(1, 1),
            true
        )
    );
    grid.add_obstacle(
        new LineObstacle(
            right_margin - margin,
            margin,
            right_margin,
            2 * margin,
            createVector(-1, 1),
            true
        )
    );
    grid.add_obstacle(
        new LineObstacle(
            margin,
            bottom_margin - margin,
            2 * margin,
            bottom_margin,
            createVector(1, -1),
            true
        )
    );
    grid.add_obstacle(
        new LineObstacle(
            right_margin,
            bottom_margin - margin,
            right_margin - margin,
            bottom_margin,
            createVector(-1, -1),
            true
        )
    );
}

function draw() {
    background(0);

    grid.update();
}
