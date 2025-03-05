import React, { useEffect } from "react";

const GradientBackground = ({ color1, color2, segments, isFullWidth = false }: { color1: string, color2: string, segments: number[][], isFullWidth: boolean }) => {
  // watch mouse move for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      document.documentElement.style.setProperty('--gradient-x', `${x}`);
      document.documentElement.style.setProperty('--gradient-y', `${y}`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="absolute z-0 top-0 left-0 w-full h-full"
      style={{
        display: 'grid',
        gridTemplateRows: `repeat(${segments.length}, 1fr)`,
        width: '100%',
        height: '100%',
      }}
    >
      {segments.map((row, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            display: 'grid',
            gridTemplateColumns: row.map(fr => `${fr}fr`).join(' '),
          }}
        >
          {row.map((_, colIndex) => (
            <div
              className="relative overflow-hidden"
              key={colIndex}
            >
              <div
                className={`absolute top-0 left-0 h-full 
                ${isFullWidth
                    ? 'w-[100vw]'
                    : 'w-[200%]'}
                `}
                style={{
                  willChange: 'background',
                  background: `radial-gradient(circle, ${color1} calc(30% * var(--gradient-x, 0.5)), ${color2} calc(max(70%, 90% * var(--gradient-y, 0.5))))`,
                }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GradientBackground;
