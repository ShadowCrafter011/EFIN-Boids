class BigFlockBoid extends SmallBoid {
    constructor(width, height, ...args) {
        super(...args);
        this.visual_range = Math.sqrt(width ** 2, height ** 2);
    }
}