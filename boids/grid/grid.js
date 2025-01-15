class Grid {
    constructor(width, height, visual_range) {
        this.height = height;
        this.width = width;
        this.visual_range = visual_range;
        this.reset_grid();
    }

    reset_grid() {
        this.grid = [];

        for (let y = 0; y < Math.ceil(this.height / this.visual_range); y++) {
            this.grid.push([]);
            for (let x = 0; x < Math.ceil(this.width / this.visual_range); x++) {
                this.grid[y].push([]);
            }
        }
    }

    show() {
        stroke("white");
        for (let y in this.grid) {
            if (y == 0) continue;
            line(0, y * this.visual_range, this.width, y * this.visual_range);
        }
        for (let x in this.grid[0]) {
            if (x == 0) continue;
            line(x * this.visual_range, 0, x * this.visual_range, this.height);
        }
        noStroke();
    }

    #add_boid_to_cell(x, y, boid) {
        this.grid[y][x].push(boid);
    }
}