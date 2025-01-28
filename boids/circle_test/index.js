var controllable_line, lines;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    controllable_line = new LineObstacle(width, 0, 0, 0);
    test_circle = new CircleObstacle(width / 2, height / 2, 200);
}

function draw() {
    background(0);

    controllable_line.p2 = createVector(mouseX, mouseY);
    controllable_line.show();
    test_circle.show();
    let intersections = test_circle.intersection_with(controllable_line);
    if (intersections?.length > 0) {
        fill("green");
        for (let inter of intersections) {
            circle(inter.x, inter.y, 10);
        }
    }
}
