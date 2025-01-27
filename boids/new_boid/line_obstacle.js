class LineObstacle extends Line {
    constructor(...args) {
        super(...args);
    }

    ray_dist(ray) {
        return this.intersection(ray);
    }
}