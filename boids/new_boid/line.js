class Line {
    constructor(x1, y1, x2, y2) {
        this.p1 = createVector(x1, y1);
        this.p2 = createVector(x2, y2);
    }

    show() {
        stroke("white");
        line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
        noStroke();
    }

    intersection_with(line) {
        let x1 = this.p1.x;
        let x2 = this.p2.x;
        let x3 = line.p1.x;
        let x4 = line.p2.x;
        let y1 = this.p1.y;
        let y2 = this.p2.y;
        let y3 = line.p1.y;
        let y4 = line.p2.y;
        let t2 = x2 * y3 - x1 * y3 - x2 * y1 + x1 * y1 - x3 * y2 + x1 * y2 + x3 * y1 + x1 * y1;
        t2 /= x4 * y2 - x3 * y2 + x4 * y1 - x3 * y1 - x2 * y4 + x2 * y3 + x1 * y4 - x1 * y3;
        let x = x3 + t2 * (x4 - x3);
        let y = y3 + t2 * (y4 - y3);
        let point = createVector(x, y);

        // Check wether intersection point is on both lines
        if (this.contains_point(point) && line.contains_point(point)) {
            return point;
        }
    }

    contains_point(point) {
        let x_max = Math.max(this.p1.x, this.p2.x);
        let x_min = Math.min(this.p1.x, this.p2.x);
        let y_max = Math.max(this.p1.y, this.p2.y);
        let y_min = Math.min(this.p1.y, this.p2.y);
        return (
            x_max >= point.x && x_min <= point.x &&
            y_max >= point.y && y_min <= point.y
        );
    }
}