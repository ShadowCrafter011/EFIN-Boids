let visual_range = 100;
var grid = null;
let boid = null;

function setup() {
    createCanvas(
        window.innerWidth,
        window.innerHeight
    );

    grid = new Grid(width, height, visual_range);
    
    for (let i = 0; i < 10; i++) {
        grid.add_boid(new Boid(
            i,
            Math.random() * width,
            Math.random() * height,
            Math.random(),
            Math.random()
        ))
    } 
}

function draw() {
    background(0);
    grid.update();
    grid.show();
}
