class Predator extends Boid {
    constructor(...args) {
        super(...args);
        this.color = "red";
        this.chase_factor = 0.005;
        this.killing_range = 15;
        this.hunger = 0.2;

        this.original_max_speed = this.max_speed;
        this.original_min_speed = this.min_speed;

        this.dead = false;
    }

    update(boids) {
        if (this.dead) return;

        this.hunger += 0.001;

        if (this.hunger >= 2) this.dead = true;

        this.max_speed = this.original_max_speed * this.hunger;
        this.min_speed = this.original_min_speed * this.hunger;

        this.max_speed = Math.max(1, Math.min(15, this.max_speed));
        this.min_speed = Math.max(1, Math.min(15, this.min_speed));

        let average = createVector(0, 0);
        let num_boids = 0;

        this.loop_boids(boids, this.visual_range, (boid) => {
            if (boid.pos.dist(this.pos) <= this.killing_range) {
                boid.dead = true;
                this.hunger -= 0.5;
                this.hunger = Math.max(0.1, this.hunger);
            } else {
                average.add(boid.pos);
                num_boids++;
            }
        });

        if (num_boids > 0) {
            average.div(num_boids);
            this.vel.add(
                average.sub(this.pos).mult(this.chase_factor * this.hunger)
            );
        }

        let avoiding = this.avoid_walls();
        this.vel.add(avoiding);

        this.clamp_speed();
        this.pos.add(this.vel);
        this.show();
    }

    loop_boids(boids, max_dist, fn) {
        for (let boid of boids) {
            if (boid === this) continue;
            if (boid.dead) continue;
            if (this.pos.dist(boid.pos) > max_dist) continue;
            fn(boid);
        }
    }
}
