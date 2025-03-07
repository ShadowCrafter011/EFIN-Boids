class PredatorAvoidingBoid extends Boid {
    constructor(...args) {
        super(...args);
        this.recalculate_params(1);
        this.predator_avoiding_factor = 0.003;
        this.dead = false;
    }

    update(boids) {
        if (this.dead) return;

        let nearest_predator, predator_dist;

        this.loop_boids(boids, this.visual_range, (boid) => {
            if (!Predator.prototype.isPrototypeOf(boid)) return;

            if (!predator_dist || this.pos.dist(boid.pos) < predator_dist) {
                nearest_predator = boid;
                predator_dist = this.pos.dist(boid.pos);
            }
        });

        if (nearest_predator) {
            let direction = this.pos.copy().sub(nearest_predator.pos);
            this.vel.add(direction.mult(this.predator_avoiding_factor));
        }

        super.update(boids);
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
