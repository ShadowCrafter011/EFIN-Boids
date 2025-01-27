class LineObstacle extends Line {
    constructor(...args) {
        super(...args);
    }

    ray_dist(ray) {
        let intersection = this.intersection_with(ray);
        if (intersection) {
            return ray.origin.dist(intersection);
        }
    }
}