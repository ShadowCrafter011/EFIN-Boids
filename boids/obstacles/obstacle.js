class CircleObstacle {
    constructor(x, y, diameter) {
        this.pos = createVector(x, y);
        this.radius = diameter / 2;
    }

    show() {
        noStroke();
        fill(180);
        circle(this.pos.x, this.pos.y, this.radius * 2);
    }

    boid_in_range(boid) {
        return this.boid_distance(boid) <= boid.obstacle_range;
    }

    boid_distance(boid) {
        return boid.pos.dist(this.pos) - this.radius;
    }
}