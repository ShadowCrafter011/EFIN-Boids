class SocialDistancingBoid extends SmallBoid {
    constructor(...args) {
        super(...args);
        this.protected_range = 35;
        this.visual_range = 150;
    }
}