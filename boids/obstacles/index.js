let visual_range = 100;
var grid = null;
let boid = null;

function setup() {
    createCanvas(
        window.innerWidth,
        window.innerHeight
    );

    grid = new Grid(width, height, visual_range);

    let obstacle = new CircleObstacle(width / 2, height / 2, 200);

    grid.add_obstacle(obstacle);
    
    for (let i = 0; i < 500; i++) {
        grid.add_boid(new ObstacleBoid(
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
}
