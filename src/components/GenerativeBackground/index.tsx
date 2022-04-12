import React, {useCallback, useEffect, useState} from 'react';
import {motion} from "framer-motion";

const transition = {duration: 25, ease: "easeInOut"};
const transition2 = {duration: 24, delay: 1, ease: "easeInOut"};

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const catmullRomFitting = function (data, alpha) {

    if (alpha == 0 || alpha === undefined) {
        return false;
    } else {
        let p0, p1, p2, p3, bp1, bp2, d1, d2, d3, A, B, N, M;
        let d3powA, d2powA, d3pow2A, d2pow2A, d1pow2A, d1powA;
        let d = Math.round(data[0].x) + ',' + Math.round(data[0].y) + ' ';
        let length = data.length;
        for (let i = 0; i < length - 1; i++) {

            p0 = i == 0 ? data[0] : data[i - 1];
            p1 = data[i];
            p2 = data[i + 1];
            p3 = i + 2 < length ? data[i + 2] : p2;

            d1 = Math.sqrt(Math.pow(p0.x - p1.x, 2) + Math.pow(p0.y - p1.y, 2));
            d2 = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
            d3 = Math.sqrt(Math.pow(p2.x - p3.x, 2) + Math.pow(p2.y - p3.y, 2));

            // Catmull-Rom to Cubic Bezier conversion matrix

            // A = 2d1^2a + 3d1^a * d2^a + d3^2a
            // B = 2d3^2a + 3d3^a * d2^a + d2^2a

            // [   0             1            0          0          ]
            // [   -d2^2a /N     A/N          d1^2a /N   0          ]
            // [   0             d3^2a /M     B/M        -d2^2a /M  ]
            // [   0             0            1          0          ]

            d3powA = Math.pow(d3, alpha);
            d3pow2A = Math.pow(d3, 2 * alpha);
            d2powA = Math.pow(d2, alpha);
            d2pow2A = Math.pow(d2, 2 * alpha);
            d1powA = Math.pow(d1, alpha);
            d1pow2A = Math.pow(d1, 2 * alpha);

            A = 2 * d1pow2A + 3 * d1powA * d2powA + d2pow2A;
            B = 2 * d3pow2A + 3 * d3powA * d2powA + d2pow2A;
            N = 3 * d1powA * (d1powA + d2powA);
            if (N > 0) {
                N = 1 / N;
            }
            M = 3 * d3powA * (d3powA + d2powA);
            if (M > 0) {
                M = 1 / M;
            }

            bp1 = {
                x: (-d2pow2A * p0.x + A * p1.x + d1pow2A * p2.x) * N,
                y: (-d2pow2A * p0.y + A * p1.y + d1pow2A * p2.y) * N
            };

            bp2 = {
                x: (d3pow2A * p1.x + B * p2.x - d2pow2A * p3.x) * M,
                y: (d3pow2A * p1.y + B * p2.y - d2pow2A * p3.y) * M
            };

            if (bp1.x == 0 && bp1.y == 0) {
                bp1 = p1;
            }
            if (bp2.x == 0 && bp2.y == 0) {
                bp2 = p2;
            }

            d += 'C' + bp1.x + ',' + bp1.y + ' ' + bp2.x + ',' + bp2.y + ' ' + p2.x + ',' + p2.y + ' ';
        }

        return d;
    }
};

function Test() {
    const [index, setIndex] = useState(0);
    const next = useCallback(() => {
        let next = index + 1;
        if (next === 3) {
            next = 0;
        }
        setIndex(next);
    }, [index]);
    useEffect(() => {
        setTimeout(() => {
            next();
        }, 26500);
    }, [index]);
    const angles = [];
    const nBalls = 50;
    const angleStep = 360 / nBalls;
    for (let i = 0; i < nBalls; i++) {
        angles.push(i * angleStep);
    }

    const calculatePoints = (width, height, angle, distance) => {
        const radian = (Math.PI * angle) / 180;
        const center = {x: width / 2, y: height / 2};
        const radianOffset = (Math.PI * (angle + randomIntFromInterval(-5, 5))) / 180;
        const distanceOffset = distance / 10;
        const middle = {
            x: center.x + ((distance + randomIntFromInterval(-distanceOffset, distanceOffset)) * Math.cos(radianOffset)),
            y: center.y + ((distance + randomIntFromInterval(-distanceOffset, distanceOffset)) * Math.sin(radianOffset))
        }
        const end = {x: (center.x) + (distance * Math.cos(radian)), y: center.y + (distance * Math.sin(radian))};
        return [center, middle, end];
    }
    return (
        <motion.div
            key={index}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{opacity: {duration: 1.5, ease: "easeIn"}}}>
            <svg width="1000" height="1000" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                {
                    angles.map((angle) => {
                        const path = "M" + catmullRomFitting(calculatePoints(1000, 1000, angle, randomIntFromInterval(1000 / 10, 1000 / 2)), 1);
                        return <>
                            <motion.path fill="transparent"
                                         stroke="#3B00B9"
                                         strokeLinecap="round"
                                         initial={{pathLength: 0, strokeWidth: 6}}
                                         animate={{pathLength: 1, strokeWidth: 2}}
                                         transition={transition} d={path}/>
                            <motion.path fill="transparent"
                                         stroke="#e9deff"
                                         strokeLinecap="round"
                                         initial={{pathLength: 0, strokeWidth: 7, opacity: 1}}
                                         animate={{pathLength: 1, strokeWidth: 2, opacity: 0}}
                                         transition={transition2} d={path}/>
                            <motion.path fill="transparent"
                                         strokeWidth="2"
                                         stroke="white"
                                         strokeLinecap="square"
                                         initial={{pathLength: 0, strokeWidth: 6, opacity: 0}}
                                         animate={{pathLength: 1, strokeWidth: 6, opacity: 1}}
                                         transition={transition} d={path}/>
                        </>
                    })}
            </svg>
        </motion.div>
    );
}

export default Test;
