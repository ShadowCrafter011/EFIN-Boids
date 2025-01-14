const elements = document.getElementsByTagName("iframe");
const remSize = parseFloat(getComputedStyle(document.documentElement).fontSize); // 1rem in pixels
const parentWidth = document.getElementById("boids").offsetWidth;
console.log(parentWidth)

for (let element of elements) {
    console.log(element)
    let scaleValue = 0.25 - (remSize / parentWidth);
    element.style.transform = `scale(${scaleValue})`;
}
