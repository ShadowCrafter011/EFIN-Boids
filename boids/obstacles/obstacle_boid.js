class ObstacleBoid extends Boid {
    constructor(...args) {
        super(...args);
        this.visual_range = 100;
        this.obstacle_range = 100;
        this.obstacle_turn_factor = 0.5;
    }

    update(boids, obstacles) {
        for (let obstacle of obstacles) {
            if (!CircleObstacle.prototype.isPrototypeOf(obstacle)) continue;
            if (!obstacle.boid_in_range(this)) continue;
            let angle = this.vel.angleBetween(obstacle.pos.copy().sub(this.pos));
            angle = Math.max(1e-1, Math.abs(angle));
            let obstacle_boid = this.pos.copy().sub(obstacle.pos).normalize();
            obstacle_boid.mult(1 / angle * this.obstacle_turn_factor);
            this.vel.add(obstacle_boid);
        }

        super.update(boids);
    }
}