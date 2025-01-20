class NewBoid {
    static max_vel = 3;
    static min_vel = 2;

    constructor(x, y, vx, vy) {
        this.pos = createVector(x, y);
        this.vel = createVector(vx, vy);
    }

    static random(width, height) {
        let boid = new NewBoid(
            Math.random() * width,
            Math.random() * height,
            Math.random() - 0.5,
            Math.random() - 0.5
        );
        return boid;
    }

    update() {
        this.pos.add(this.vel);
        this.clamp_velocity();

        this.show();
    }

    clamp_velocity() {
        if (this.vel.mag() > NewBoid.max_vel) this.vel.setMag(NewBoid.max_vel);
        if (this.vel.mag() < NewBoid.min_vel) this.vel.setMag(NewBoid.min_vel);
    }

    show() {
        noStroke();
        fill("white");
        let normal = this.vel.copy().normalize().mult(3);
        let rotated = this.vel.copy().normalize().rotate(PI / 2).mult(2.5);
        let front = this.pos.copy().add(normal);
        let left = this.pos.copy().add(rotated).sub(normal);
        let right = this.pos.copy().sub(rotated).sub(normal);
        triangle(
            front.x, front.y,
            left.x, left.y,
            right.x, right.y
        )
    }
}