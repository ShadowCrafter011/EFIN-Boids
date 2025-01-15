let visual_range = 50;
var grid = null;

function setup() {
    createCanvas(
        window.innerWidth,
        window.innerHeight
    );

    grid = new Grid(width, height, visual_range);
}

function draw() {
    background(0);
    grid.show();
}
