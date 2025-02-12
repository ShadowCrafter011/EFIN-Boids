class NewBoid {
    constructor(x, y, vx, vy) {
        this.pos = createVector(x, y);
        this.vel = createVector(vx, vy);

        this.max_vel = 5;
        this.min_vel = 4;

        this.separation_factor = 1;
        this.matching_factor = 0.08;
        this.cohesion_factor = 0.005;
        this.protected_range = 100;
        this.visual_range = 200;
        this.blind_spot_angle = 90;
        this.num_rays = 50;
        this.rays = [];
        this.calculate_rays();
    }

    static ease_in_circ(x) {
        return 1 - Math.sqrt(1 - Math.pow(x, 2));
    }

    static random(width, height) {
        return new this(
            index,
            (Math.random() * (width / 2)) + width / 4,
            (Math.random() * (height / 2)) + height / 4,
            Math.random() - 0.5,
            Math.random() - 0.5
        );
    }

    static random_vel(x, y) {
        return new this(
            x, y,
            Math.random() - 0.5,
            Math.random() - 0.5
        )
    }

    update(boids, obstacles) {
        let separation = this.separate_obstacles(obstacles);
        let boid_separation = this.separate_boids(boids);
        let cohesion = this.cohese(boids);
        let matching = this.match(boids);
        this.vel.add(matching);
        this.vel.add(boid_separation);
        this.vel.add(cohesion);
        this.rotate_towards(separation);
        this.clamp_velocity();

        this.pos.add(this.vel);
        for (let ray of this.rays) {
            ray.add(this.vel);
        }

        if (!this.on_screen()) {
            this.pos = createVector(width / 2, height / 2);
            this.rays = [];
            this.calculate_rays();
        }

        this.show();
        // this.show_rays();
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
        return avg.sub(this.pos).mult(this.cohesion_factor);
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
        return avg.sub(this.vel).mult(this.matching_factor);
    }

    separate_boids(boids) {
        let average = createVector(0, 0);
        let num_boids = 0;
        this.loop_boids(boids, this.protected_range, boid => {
            let boid_this = this.pos.copy().sub(boid.pos);
            let normalized_dist = this.pos.dist(boid.pos) / this.protected_range;
            boid_this.setMag(1 - normalized_dist);
            average.add(boid_this);
            num_boids++;
        });

        if (num_boids == 0) return createVector(0, 0);

        return average.div(num_boids).mult(this.separation_factor);
    }

    separate_obstacles(obstacles) {
        let max_dist_ray, min_dist_ray;
        let max_dist = 0, min_dist = this.protected_range;
        for (let ray of this.rays) {
            let dist = ray.calculate_min_dist(obstacles);
            if (dist > max_dist) {
                max_dist = dist;
                max_dist_ray = ray;
            }
            if (dist < min_dist) {
                min_dist = dist;
                min_dist_ray = ray;
            }
        }
        
        let direction = max_dist_ray.direction();
        
        if (!max_dist_ray.collided && min_dist_ray.collided) {
            direction = min_dist_ray.min_dist_obstacle.normal;
        }
        
        let normalized_dist = min_dist / this.protected_range;

        return direction.setMag(NewBoid.ease_in_circ(1 - normalized_dist));
    }

    loop_boids(boids, max_dist, fn) {
        for (let boid of boids) {
            if (boid === this) continue;
            if (this.pos.dist(boid.pos) > max_dist) continue;
            fn(boid);
        }
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
            rotated.setMag(this.protected_range - i);
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

        let delta_angle = direction.angleBetween(this.vel);
        if (delta_angle > PI) delta_angle = -2 * PI - delta_angle;
        if (delta_angle < -PI) delta_angle = 2 * PI + delta_angle;
        let rotation = 0.15 * -delta_angle * direction.mag();
        this.vel.rotate(rotation);
        for (let ray of this.rays) {
            ray.rotate(rotation);
        }
    }

    clamp_velocity() {
        if (this.vel.mag() > this.max_vel) this.vel.setMag(this.max_vel);
        if (this.vel.mag() < this.min_vel) this.vel.setMag(this.min_vel);
    }

    on_screen() {
        return (
            this.pos.x > 0 &&
            this.pos.x < width &&
            this.pos.y > 0 &&
            this.pos.y < height
        );
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