class NewBoid {
    constructor(index, x, y, vx, vy) {
        this.index = index;
        this.pos = createVector(x, y);
        this.vel = createVector(vx, vy);

        this.max_vel = 3;
        this.min_vel = 2;
        this.max_angular_velocity = 1 * PI / 360;
    }

    static random(index, width, height) {
        return new this(
            index,
            Math.random() * width,
            Math.random() * height,
            Math.random() - 0.5,
            Math.random() - 0.5
        );
    }

    update(boids, obstacles) {
        let separation = this.separate(boids, obstacles);
        this.rotate_towards(separation);
        this.clamp_velocity();

        this.pos.add(this.vel);

        this.show();
    }

    separate(boids, obstacles) {
        return createVector(0, 1);
    }

    rotate_towards(...directions) {
        let direction = createVector(0, 0);
        for (let dir of directions) {
            direction.add(dir);
        }

        if (direction.mag() == 0) return;

        let desired_angle = createVector(1, 0).angleBetween(direction);
        let delta_angle = desired_angle - createVector(1, 0).angleBetween(this.vel);
        if (delta_angle > PI) delta_angle = -2 * PI - delta_angle;
        if (delta_angle < -PI) delta_angle = 2 * PI + delta_angle;
        let rotation = Math.min(this.max_angular_velocity, Math.max(-this.max_angular_velocity, delta_angle));
        this.vel.rotate(rotation);
    }

    clamp_velocity() {
        if (this.vel.mag() > this.max_vel) this.vel.setMag(this.max_vel);
        if (this.vel.mag() < this.min_vel) this.vel.setMag(this.min_vel);
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