class Ray extends Line {
    constructor(...args) {
        super(...args);
        
        this.origin = this.p1.copy();
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