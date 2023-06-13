import React, { useState, useRef, useEffect } from "react";

function animateTextCollapse(
  from: string,
  to: string,
  done: () => void,
  el: HTMLHeadingElement
): () => void {
  let len = from.length;
  let interval = 30;
  let start = Date.now();
  let direction = -1;
  const handle = setInterval(() => {
    const elapsed = Date.now() - start;
    if (elapsed < interval) return;

    start = Date.now();

    if (direction < 0) {
      // exit
      len -= 1;
      interval /= 1.1;

      el.innerText = from.slice(0, len);
      if (len === 0) {
        direction = 1;
        interval = 5;
      }
    } else {
      // enter
      len += 1;
      el.innerText = to.slice(0, len);

      interval *= 1.1;

      if (interval > 30) {
        interval = 30;
      }

      if (len === to.length) {
        clearInterval(handle);
        done();
      }
    }
  }, 5);

  return () => clearInterval(handle);
}

const RotatedHeadline: React.FC<{ lines: string[]; interval: number }> = ({
  lines,
  interval,
}) => {
  const [index, setIndex] = useState(0);
  const el = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    let abortTextCollapse: () => void = null;
    const handle = setInterval(() => {
      if (!document.hidden) {
        abortTextCollapse = animateTextCollapse(
          lines[index],
          lines[(index + 1) % lines.length],
          () => setIndex((index + 1) % lines.length),
          el.current
        );
      }
    }, interval);

    return () => {
      clearInterval(handle);
      abortTextCollapse && abortTextCollapse();
    };
  }, [interval, index, setIndex]);

  return (
    <>
      {lines.map((line, i) => (
        <span
          className="transition-all col-start-1 row-start-1 duration-500 opacity-0"
          key={line + "_" + i}
        >
          {line}
        </span>
      ))}
      <span className="col-start-1 row-start-1 will-change-contents" ref={el}>
        {lines[0]}
      </span>
    </>
  );
};

export default RotatedHeadline;
