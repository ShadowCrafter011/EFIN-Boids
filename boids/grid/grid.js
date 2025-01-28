class Grid {
    constructor(width, height, visual_range) {
        this.height = height;
        this.width = width;
        this.visual_range = visual_range;
        this.boids = [];
        this.obstacles = [];
        this.#reset_grid();
        this.boids_on_screen = -1;
    }

    update() {
        this.#reset_grid();
        this.#populate_grid();

        for (let boid of this.boids) {
            let x = Math.floor(boid.pos.x / this.visual_range);
            let y = Math.floor(boid.pos.y / this.visual_range);

            let other_boids = [];

            let neigh_cell_indices = [
                [-1, -1], [-1, 0], [-1, 1],
                [ 0, -1], [ 0, 0], [ 0, 1],
                [ 1, -1], [ 1, 0], [ 1, 1] 
            ]

            for (let neigh of neigh_cell_indices) {
                if (
                    neigh[0] + y >= 0 &&
                    neigh[0] + y < this.grid.length &&
                    neigh[1] + x >= 0 &&
                    neigh[1] + x < this.grid[0].length
                ) {
                    other_boids = other_boids.concat(this.grid[neigh[0] + y][neigh[1] + x]);
                }
            }

            boid.update(other_boids, this.obstacles);
        }

        for (let obstacle of this.obstacles) {
            obstacle.show();
        }
    }

    log_boids_on_screen() {
        let boids_on_screen = 0;
        for (let boid of this.boids) {
            if (boid.pos.x > 0 && boid.pos.x < width && boid.pos.y > 0 && boid.pos.y < height) {
                boids_on_screen++;
            }
        }
        if (boids_on_screen != this.boids_on_screen) {
            console.log(`There are ${boids_on_screen} boids on screen`);
            this.boids_on_screen = boids_on_screen;
        }
    }

    #reset_grid() {
        this.grid = [];

        for (let y = 0; y < Math.ceil(this.height / this.visual_range); y++) {
            this.grid.push([]);
            for (let x = 0; x < Math.ceil(this.width / this.visual_range); x++) {
                this.grid[y].push([]);
            }
        }
    }

    #populate_grid() {
        for (let boid of this.boids) {
            this.#add_boid_to_grid(boid);
        }
    }

    show() {
        // stroke("white");
        // for (let y in this.grid) {
        //     if (y == 0) continue;
        //     line(0, y * this.visual_range, this.width, y * this.visual_range);
        // }
        // for (let x in this.grid[0]) {
        //     if (x == 0) continue;
        //     line(x * this.visual_range, 0, x * this.visual_range, this.height);
        // }
        // noStroke();

        for (let y in this.grid) {
            for (let x in this.grid[0]) {
                fill(color(0, 255, 0, this.grid[y][x].length / this.boids.length * 255));
                square(x * this.visual_range, y * this.visual_range, this.visual_range);
            }
        }
    }

    add_boid(boid) {
        this.#add_boid_to_grid(boid);
        this.boids.push(boid);
    }

    add_obstacle(obstacle) {
        this.obstacles.push(obstacle);
    }

    #add_boid_to_grid(boid) {
        let x = Math.floor(boid.pos.x / this.visual_range);
        let y = Math.floor(boid.pos.y / this.visual_range);
        x = Math.max(0, Math.min(this.grid[0].length - 1, x));
        y = Math.max(0, Math.min(this.grid.length - 1, y));
        this.grid[y][x].push(boid);
    }
}