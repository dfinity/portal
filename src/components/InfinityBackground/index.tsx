import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";

const numDots = 500;
const speed = 6500;
const baseColor = {r: 59, g: 0, b: 185, a: 255};
const radiusDelta = [];
const weightDelta = [];
const colorDelta = [];
export default () => {
    const setup = (p5, canvasParentRef) => {
        const cnv = p5.createCanvas(screen.width, screen.height).parent(canvasParentRef);
        for (let x = 0; x < numDots; x++) {
            radiusDelta.push(p5.random(-200, 200));
            weightDelta.push(p5.random(15, 45));
            colorDelta.push(p5.random(-30, 30));
        }
        /* cnv.mousePressed((event) => {
             console.log("Clicked on the canvas. Event:", event)
         });*/
    };

    const draw = (p5) => {
        p5.background(243, 238, 242);
        p5.strokeWeight(4);
        for (let x = 0; x < numDots; x++) {
            p5.stroke(
                baseColor.r + colorDelta[x],
                baseColor.g + colorDelta[x],
                baseColor.b + colorDelta[x],
                baseColor.a
            );
            p5.strokeWeight(weightDelta[x]);
            let radius = p5.width / 3 + radiusDelta[x];
            p5.point(
                p5.width / 2 + radius * p5.cos(p5.millis() / speed + x),
                p5.height / 2 + radius * p5.sin(p5.millis() / speed + x) * p5.cos(p5.millis() / speed + x)
            );
        }
    };
    return (
        <BrowserOnly fallback={null}>
            {() => {
                const Sketch = require('react-p5');
                return <Sketch setup={setup} draw={draw}/>;
            }}
        </BrowserOnly>)
};
