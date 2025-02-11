class BigFlockBoid extends SmallBoid {
    constructor(width, height, ...args) {
        super(...args);
        this.visual_range = Math.sqrt(width ** 2, height ** 2);
    }

    static random(i, width, height) {
        return new this(
            width, height,
            i,
            Math.random() * width,
            Math.random() * height,
            Math.random(),
            Math.random()
        )
    }
}