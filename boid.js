class Boid {
    constructor(x, y, vx, vy) {
        this.pos = createVector(x, y);
        this.vel = createVector(vx, vy);
    }

    update() {
        this.pos.add(this.vel);

        this.show();
    }

    show() {
        let normal = this.vel.copy().normalize().mult(12);
        let rotated = this.vel.copy().normalize().rotate(PI / 2).mult(5);
        let front = this.pos.copy().add(normal);
        let left = this.pos.copy().add(rotated);
        let right = this.pos.copy().sub(rotated);
        triangle(
            front.x, front.y,
            left.x, left.y,
            right.x, right.y
        )
    }
}