class LineObstacle extends Obstacle {
    constructor(x1, y1, x2, y2) {
        super();
        this.p1 = createVector(x1, y1);
        this.p2 = createVector(x2, y2);
    }

    show() {
        stroke("white");
        line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
        noStroke();
    }

    mag() {
        let p1_p2 = this.p2.copy().sub(this.p1);
        return p1_p2.mag();
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

        // let t2 = x1 * y2 - x2 * y1 - x3 * y1 + x3 * y3 - x2 * y3 - x1 * y3;
        // t2 /= x4 * y2 - x3 * y2 - x4 * y1 + x3 * y1 - x2 * y4 + x2 * y3 + x1 * y4 - x1 * y3;
        // let x = x3 + t2 * (x4 - x3);
        // let y = y3 + t2 * (y4 - y3);
        // let point = createVector(x, y);

        let x = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4);
        x /= (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        let y = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - x4 * y3);
        y /= (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        
        let point = createVector(x, y);

        // Check wether intersection point is on both lines
        if (this.contains_point(point) && line.contains_point(point)) {
            return point;
        }
    }

    contains_point(point) {
        let d1 = this.p1.dist(point);
        let d2 = this.p2.dist(point);
        let d3 = this.p1.dist(this.p2);
        return d1 + d2 < d3 + 1e-2 && d1 + d2 > d2 - 1e-2;
    }

    copy() {
        return new LineObstacle(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
    }

    sub(vector) {
        this.p1.sub(vector);
        this.p2.sub(vector);
        return this;
    }
}