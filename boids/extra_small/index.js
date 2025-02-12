let grid;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    grid = new Grid(width, height, 20);

    for (let i = 0; i < 3000; i++) {
        grid.add_boid(ExtraSmallBoid.random(i, width, height));
    }
}

function draw() {
    background(0);

    grid.update();
}
