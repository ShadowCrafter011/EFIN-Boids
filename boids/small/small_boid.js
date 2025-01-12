class SmallBoid extends Boid {
    constructor(...args) {
        super(...args);

        this.max_speed = 0.8;
        this.min_speed = 0.2;

        this.protected_range = 10;
        this.visual_range = 100;
        this.separation_factor = 0.00004;
        this.matching_factor = 0.006;
        this.cohesion_factor = 0.0001;
        this.turnfactor = PI / 90;
        this.wall_margin = 15;
    }

    show() {
        noStroke();
        fill("white");
        circle(this.pos.x, this.pos.y, 5);
    }
}