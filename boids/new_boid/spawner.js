class Spawner {
    constructor(...args) {
        if (args.length % 3 != 0) throw new Error("Spawner only accepts argument pairs of three");

        this.spawners = [];
        this.total_ratio = 0;
        for (let i = 0; i < args.length; i += 3) {
            this.spawners.push(new SpawnerCircle(args[i], args[i + 1], args[i + 2]));
            this.total_ratio += args[i + 2];
        }
    }

    show() {
        this.spawners.forEach(spawner => spawner.show());
    }

    spawn(total_boids, spawn_fn) {
        let boids = [];
        for (let spawner of this.spawners) {
            boids = boids.concat(spawner.spawn(this.total_ratio, total_boids, spawn_fn));
        }
        return boids;
    }
}

class SpawnerCircle {
    constructor(pos, r, ratio) {
        this.grid = grid;
        this.pos = pos;
        this.r = r;
        this.ratio = ratio;
    }

    show() {
        noFill();
        stroke("green");
        circle(this.pos.x, this.pos.y, this.r * 2);
        noStroke();
        fill("white");
    }

    spawn(total_ratio, total_boids, spawn_fn) {
        let num_boids = Math.ceil(total_boids * this.ratio / total_ratio);
        let boids = [];
        for (let i = 0; i < num_boids; i++) {
            let angle = Math.random() * 2 * PI;
            let dist = Math.random() * this.r;
            let x = Math.cos(angle) * dist;
            let y = Math.sin(angle) * dist;
            let pos = createVector(x, y).add(this.pos);
            boids.push(spawn_fn(pos.x, pos.y));
        }
        return boids;
    }
}
