class Predator extends Boid {
    constructor(...args) {
        super(...args);
        this.color = "red";
    }

    update(boids) {
        let average = createVector(0, 0);
        let num_boids = 0;

        this.loop_boids(boids, this.visual_range, (boid) => {
            average.add(boid.pos);
            num_boids++;
        });

        if (num_boids > 0) {
            average.div(num_boids);
            this.vel.add(average.sub(this.pos));
        }

        this.clamp_speed();
        this.pos.add(this.vel);
        this.show();
    }
}
