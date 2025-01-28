class Obstacle {
    ray_dist(ray) {
        let intersection = this.intersection_with(ray);
        if (intersection) {
            return ray.origin.dist(intersection);
        }
    }
}