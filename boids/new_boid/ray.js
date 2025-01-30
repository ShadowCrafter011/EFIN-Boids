class Ray extends LineObstacle {
    constructor(...args) {
        super(...args);

        this.min_dist_obstacle = null;
        this.collided = false;
        this.origin = this.p1.copy();
    }

    direction() {
        let origin_p2 = this.p2.copy().sub(this.origin);
        return origin_p2.normalize();
    }

    calculate_min_dist(obstacles) {
        this.collided = false;

        let min_dist = this.mag();
        for (let obstacle of obstacles) {
            let dist = obstacle.ray_dist(this);
            if (dist && dist < min_dist) {
                min_dist = dist;
                this.min_dist_obstacle = obstacle;
                this.collided = true;
            }
        }
        return min_dist;
    }

    rotate(rotation) {
        let origin_p2 = this.p2.copy().sub(this.origin);
        origin_p2.rotate(rotation);
        this.p2 = this.origin.copy().add(origin_p2);
    }

    add(translation_vector) {
        this.p1.add(translation_vector);
        this.p2.add(translation_vector);
        this.origin.add(translation_vector);
    }
}