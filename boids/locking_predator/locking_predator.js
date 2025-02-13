class LockingPredator extends Predator {
    constructor(...args) {
        super(...args);
        this.killing_range = 5;
        this.lock_on_range = 100;
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
        let closest_boid, closest_boid_dist;

        this.loop_boids(boids, this.visual_range, (boid) => {
            let dist = boid.pos.dist(this.pos);

            if (!closest_boid || dist < closest_boid_dist) {
                closest_boid = boid;
                closest_boid_dist = dist;
            }

            if (dist <= this.killing_range) {
                boid.dead = true;
                this.hunger -= 0.5;
                this.hunger = Math.max(0.1, this.hunger);
            } else {
                average.add(boid.pos);
                num_boids++;
            }
        });

        if (
            (!this.target || this.target?.dead) &&
            closest_boid &&
            closest_boid_dist < this.lock_on_range &&
            this.hunger >= 0.5
        ) {
            this.target = closest_boid;
            closest_boid.color = "green";
        }

        if (this.target && !this.target.dead) {
            this.vel.add(this.target.pos.copy().sub(this.pos));
            console.log("chasing target");
        } else if (num_boids > 0) {
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
}
