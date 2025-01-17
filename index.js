const elements = document.getElementsByTagName("iframe");
const remSize = parseFloat(getComputedStyle(document.documentElement).fontSize); // 1rem in pixels
const parentWidth = document.getElementById("boids").offsetWidth;

for (let element of elements) {
    let scaleValue = 0.25 - (remSize / parentWidth);
    element.style.transform = `scale(${scaleValue})`;
}
