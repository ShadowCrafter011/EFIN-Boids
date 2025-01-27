var grid = null;

function setup() {
    createCanvas(
        window.innerWidth,
        window.innerHeight
    );

    grid = new Grid(width, innerHeight, 100);

    for (let i = 0; i < 50; i++) {
        grid.add_boid(NewBoid.random(i, width, height))
    }

    let margin = 50;
    let bottom_margin = height - margin;
    let right_margin = width - margin;
    grid.add_obstacle(new LineObstacle(margin, margin, margin, bottom_margin));
    grid.add_obstacle(new LineObstacle(margin, margin, right_margin, margin));
    grid.add_obstacle(new LineObstacle(right_margin, margin, right_margin, bottom_margin));
    grid.add_obstacle(new LineObstacle(margin, bottom_margin, right_margin, bottom_margin));
}

function draw() {
    background(0);

    grid.update();
}