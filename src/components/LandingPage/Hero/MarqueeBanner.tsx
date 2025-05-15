import React, { useEffect, useRef } from "react";

const MarqueeBanner = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;

    if (!container || !content) return;

    // Clone the content multiple times to create a seamless loop
    const contentWidth = content.offsetWidth;
    const windowWidth = window.innerWidth;

    // Calculate how many clones we need to fill the screen width + extra for smooth looping
    const clonesCount = Math.ceil(windowWidth / contentWidth) + 1;

    // Remove any existing clones before adding new ones
    const existingClones = container.querySelectorAll(".marquee-clone");
    existingClones.forEach((clone) => clone.remove());

    // Add the necessary number of clones
    for (let i = 0; i < clonesCount; i++) {
      const clone = content.cloneNode(true);
      clone.classList.add("marquee-clone");
      container.appendChild(clone);
    }

    // Animation function for the marquee effect
    let animationFrame;
    let position = 0;
    const speed = 0.5; // Adjust speed for subtle movement

    const animate = () => {
      position -= speed;

      // Reset position when first content is completely off screen
      if (position <= -contentWidth) {
        position += contentWidth;
      }

      container.style.transform = `translateX(${position}px)`;
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize to adjust the number of clones if needed
    const handleResize = () => {
      cancelAnimationFrame(animationFrame);

      // Restart the animation with updated calculations
      position = 0;
      container.style.transform = `translateX(0px)`;

      // Rerun the effect to recalculate clones
      const clones = container.querySelectorAll(".marquee-clone");
      clones.forEach((clone) => clone.remove());

      const newContentWidth = content.offsetWidth;
      const newWindowWidth = window.innerWidth;
      const newClonesCount = Math.ceil(newWindowWidth / newContentWidth) + 1;

      for (let i = 0; i < newClonesCount; i++) {
        const clone = content.cloneNode(true);
        clone.classList.add("marquee-clone");
        container.appendChild(clone);
      }

      animate();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      id="marquee-banner"
      className="w-full overflow-hidden bg-black h-12 flex items-center fixed top-0 left-0 right-0 z-50"
    >
      <div
        ref={containerRef}
        className="inline-flex whitespace-nowrap"
        style={{ willChange: "transform" }}
      >
        <div
          ref={contentRef}
          className="flex items-center justify-start text-white"
        >
          {/* Create a single flex container for each pair of logos with fixed width */}
          <div className="flex items-center mx-4" style={{ width: "400px" }}>
            <div className="mr-8">
              <img
                src="/img/home/icp4th.svg"
                alt="ICP Fourth Anniversary"
                className="h-10"
                style={{ display: "block" }}
              />
            </div>
            <div>
              <img
                src="/img/home/wcs25.svg"
                alt="WCS25"
                className="h-15"
                style={{ display: "block" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarqueeBanner;
