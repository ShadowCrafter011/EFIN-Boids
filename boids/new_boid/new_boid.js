class NewBoid extends CircleObstacle {
    constructor(index, x, y, vx, vy) {
        super(x, y, 10);

        this.index = index;
        this.pos = createVector(x, y);
        this.vel = createVector(vx, vy);

        this.max_vel = 3;
        this.min_vel = 2;

        this.protected_range = 10;
        this.blind_spot_angle = 90;
        this.num_rays = 50;
        this.rays = [];
        this.calculate_rays();
    }

    static ease_in_circ(x) {
        return 1 - Math.sqrt(1 - Math.pow(x, 2));
    }

    static random(index, width, height) {
        return new this(
            index,
            (Math.random() * (width / 2)) + width / 4,
            (Math.random() * (height / 2)) + height / 4,
            Math.random() - 0.5,
            Math.random() - 0.5
        );
    }

    update(boids, obstacles) {
        let separation = this.separate(boids, obstacles);
        this.rotate_towards(separation);
        this.clamp_velocity();

        this.pos.add(this.vel);
        for (let ray of this.rays) {
            ray.add(this.vel);
        }

        this.show();
        super.show();
        // this.show_rays();
    }

    separate(boids, obstacles) {
        let max_dist_dir = createVector(0, 0);
        let max_dist = 0;
        let min_dist_dir = createVector(0, 0);
        let min_dist = this.protected_range;
        for (let ray of this.rays) {
            let ray_dist = ray.calculate_min_dist(obstacles.concat(boids));
            if (ray_dist > max_dist){
                max_dist_dir = ray.direction();
                max_dist = ray_dist;
            }
            if (ray_dist < min_dist) {
                min_dist_dir = ray.direction();
                min_dist = ray_dist;
            }

        }

        let dir;
        if (max_dist == this.protected_range && min_dist != this.protected_range) {
            dir = min_dist_dir.mult(-1);
        } else {
            dir = max_dist_dir;
        }

        let normalized_dist = min_dist / this.protected_range;
        let inverted_dist = 1 - normalized_dist;
        return dir.setMag(NewBoid.ease_in_circ(inverted_dist));
    }

    calculate_rays() {
        let ray_angle_dist = (360 - this.blind_spot_angle) / this.num_rays;
        ray_angle_dist *= PI;
        ray_angle_dist /= 180;
        let mult = 1;
        for (let i = 0; i < this.num_rays; i++) {
            let rotation = Math.ceil(i / 2) * mult * ray_angle_dist;
            mult *= -1;
            let rotated = this.vel.copy().normalize().rotate(rotation);
            rotated.setMag(this.protected_range);
            this.rays.push(
                new Ray(this.pos.x, this.pos.y, this.pos.x + rotated.x, this.pos.y + rotated.y)
            )
        }
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
        let rotation = 0.5 * PI * direction.mag();
        this.vel.rotate(rotation);
        for (let ray of this.rays) {
            ray.rotate(rotation);
        }
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

    show_rays() {
        stroke("white");
        this.rays.forEach(ray => ray.show());
        noStroke();
    }
}