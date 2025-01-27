var controllable_line, lines;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    controllable_line = new Line(width / 2 - 100, height / 2 + 100, 0, 0);
    lines = [
        controllable_line,
        new Line(0, 100, width, 100),
        new Line(0, 0, width - 100, height - 100)
    ];
}

function draw() {
    background(0);

    controllable_line.p2 = createVector(mouseX, mouseY);
    controllable_line.show();

    for (let l of lines) {
        l.show();
        let intersection = l.intersection_with(controllable_line);
        if (intersection) {
            fill("green");
            circle(intersection.x, intersection.y, 10);
        }
    }   
}
