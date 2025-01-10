class Boid {
    constructor(index, x, y, vx, vy) {
        this.index = index;

        this.pos = createVector(x, y);
        this.vel = createVector(vx, vy);

        this.max_speed = 4;
        this.min_speed = 1;

        this.protected_range = 50;
        this.visual_range = 300;
        this.separation_factor = 0.0004;
        this.matching_factor = 0.02;
        this.cohesion_factor = 0.0005;
        this.turnfactor = PI / 90;
        this.wall_margin = 150;
    }

    update(boids) {
        this.separate(boids);
        this.match(boids);
        this.cohese(boids);
        this.avoid_walls();
        this.clamp_speed();
        this.pos.add(this.vel);

        // this.teleport_edge();

        this.show();
    }

    show() {
        // Show ranges
        // this.show_ranges()

        noStroke();
        fill("white");
        let normal = this.vel.copy().normalize().mult(6);
        let rotated = this.vel.copy().normalize().rotate(PI / 2).mult(5);
        let front = this.pos.copy().add(normal);
        let left = this.pos.copy().add(rotated).sub(normal);
        let right = this.pos.copy().sub(rotated).sub(normal);
        triangle(
            front.x, front.y,
            left.x, left.y,
            right.x, right.y
        )
    }

    clamp_speed() {
        if (this.vel.mag() > this.max_speed) this.vel.setMag(this.max_speed);
        if (this.vel.mag() < this.min_speed) this.vel.setMag(this.min_speed);
    }

    separate(boids) {
        let close = createVector();
        this.loop_boids(boids, this.protected_range, boid => {
            let dist = this.pos.dist(boid.pos);
            close.add(this.pos.copy().sub(boid.pos).mult(this.protected_range - dist));
        });
        // stroke("white");
        // line(this.pos.x, this.pos.y, this.pos.x + close.x, this.pos.y + close.y);
        this.vel.add(close.mult(this.separation_factor));
    }

    match(boids) {
        let neigh_boids = 0;
        let average = createVector(0, 0);
        this.loop_boids(boids, this.visual_range, boid => {
            neigh_boids++;
            average.add(boid.vel);
        });
        if (neigh_boids == 0) return;
        let avg = average.div(neigh_boids);
        this.vel.add(avg.sub(this.vel).mult(this.matching_factor));
    }

    cohese(boids) {
        let neigh_boids = 0;
        let average = createVector(0, 0);
        this.loop_boids(boids, this.visual_range, boid => {
            neigh_boids++;
            average.add(boid.pos);
        });
        if (neigh_boids == 0) return;
        let avg = average.div(neigh_boids);
        this.vel.add(avg.sub(this.pos).mult(this.cohesion_factor));
    }

    loop_boids(boids, max_dist, fn) {
        for (let boid of boids) {
            if (boid === this) continue;
            if (this.pos.dist(boid.pos) > max_dist) continue;
            fn(boid);
        }
    }

    show_ranges() {
        noFill();
        stroke("green");
        circle(this.pos.x, this.pos.y, this.visual_range);
        stroke("red");
        circle(this.pos.x, this.pos.y, this.protected_range);
    }

    teleport_edge() {
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.y < 0) this.pos.y = height;
        if (this.pos.y > height) this.pos.y = 0;
    }

    avoid_walls() {
        if (this.pos.x < this.wall_margin) this.wall_rotation(-1, 0);
        if (this.pos.x > width - this.wall_margin) this.wall_rotation(1, 0);
        if (this.pos.y < this.wall_margin) this.wall_rotation(0, -1);
        if (this.pos.y > height - this.wall_margin) this.wall_rotation(0, 1);

        let middle = createVector(width / 2, height / 2);
        if (this.pos.dist(middle) > Math.sqrt(width ** 2 + height ** 2) + 100) {
            this.vel.rotate(this.vel.angleBetween(middle.sub(this.pos)));
        }
    }

    wall_rotation(x, y) {
        let angle = this.vel.angleBetween(createVector(x, y));
        if (angle > 0 && angle < PI) this.vel.rotate(-this.turnfactor);
        if (angle < 0 && angle > -PI) this.vel.rotate(this.turnfactor);
    }

    on_screen() {
        return (
            this.pos.x > 0 &&
            this.pos.x < width &&
            this.pos.y > 0 &&
            this.pos.y < height
        )
    }
}