class ExtraSmallBoid extends Boid {
    constructor(...args) {
        super(...args);

        let param_factor = 0.1;

        this.max_speed = 4 * param_factor;
        this.min_speed = this.max_speed - 1;

        this.protected_range = 20 * param_factor;
        this.visual_range = 200 * param_factor;
        this.separation_factor = 0.005 * param_factor;
        this.matching_factor = 0.005 * param_factor;
        this.cohesion_factor = 0.0005 * param_factor;
        this.turnfactor = 0.2 * param_factor;
        this.wall_margin = 50;
    }

    show() {
        fill("white");
        noStroke();
        circle(this.pos.x, this.pos.y, 2);
    }
}