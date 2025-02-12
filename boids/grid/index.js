let visual_range = 100;
var grid = null;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    grid = new Grid(width, height, visual_range);

    for (let i = 0; i < 50; i++) {
        grid.add_boid(Boid.random(i, width, height));
    }
}

function draw() {
    background(0);
    grid.update();
    grid.show();
}
