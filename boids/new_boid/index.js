var grid = null;

function setup() {
    createCanvas(
        window.innerWidth,
        window.innerHeight
    )

    grid = new Grid(width, innerHeight, 100);

    for (let i = 0; i < 50; i++) {
        grid.add_boid(NewBoid.random(width, height))
    }
}

function draw() {
    background(0);

    grid.update();
}