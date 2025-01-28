class CircleObstacle extends Obstacle {
    constructor(x, y, r) {
        super();
        this.pos = createVector(x, y);
        this.r = r;
    }

    static sgn(x) {
        if (x < 0) return -1;
        return 1;
    }

    show() {
        stroke("white");
        noFill();
        circle(this.pos.x, this.pos.y, this.r * 2);
        fill("white");
        noStroke();
    }

    ray_dist(ray) {
        let intersections = this.intersection_with(ray);
        if (intersections?.length > 0) {
            let min_dist = Number.MAX_VALUE;
            intersections.forEach(inter => min_dist = Math.min(min_dist, ray.origin.dist(inter)));
            return min_dist;
        }
    }

    intersection_with(line) {
        let tline = line.copy().sub(this.pos);
        let dx = tline.p2.x - tline.p1.x;
        let dy = tline.p2.y - tline.p1.y;
        let dr = Math.sqrt(dx ** 2 + dy ** 2);
        let D = tline.p1.x * tline.p2.y - tline.p2.x * tline.p1.y;
        let discriminant = this.r ** 2 * dr ** 2 - D ** 2;
        
        if (discriminant < 0) return;

        let x1 = D * dy + CircleObstacle.sgn(dy) * dx * Math.sqrt(discriminant);
        x1 /= dr ** 2;
        let y1 = -D * dx + Math.abs(dy) * Math.sqrt(discriminant);
        y1 /= dr ** 2;
        let point1 = createVector(x1, y1).add(this.pos);

        if (discriminant == 0) {
            if (line.contains_point(point1)) return [point1];
        } else {
            let x2 = D * dy - CircleObstacle.sgn(dy) * dx * Math.sqrt(discriminant);
            x2 /= dr ** 2;
            let y2 = -D * dx - Math.abs(dy) * Math.sqrt(discriminant);
            y2 /= dr ** 2;
            let point2 = createVector(x2, y2).add(this.pos);

            let points = [];
            if (line.contains_point(point1)) points.push(point1);
            if (line.contains_point(point2)) points.push(point2);
            return points;
        }
    }
}