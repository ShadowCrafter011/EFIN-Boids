let boids = document.getElementsByTagName("iframe");

for (let boid of boids) {
    boid.addEventListener("click", function() {
        console.log("click")
    })
}
