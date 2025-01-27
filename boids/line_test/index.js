var line, lines;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    line = new Line(width / 2, height / 2, 0, 0);
    lines = [line];
    Math.randomSeed(69420);
    for (let i = 0; i < 5; i++) {
        lines.push(new Line(
            Math.random() * width,
            Math.random() * height,
            Math.random() * width,
            Math.random() * height
        ))
    }
}

function draw() {
    background(0);

    line2.p2 = createVector(mouseX, mouseY);

    line1.show();
    line2.show();
    fill("green");
    
}
