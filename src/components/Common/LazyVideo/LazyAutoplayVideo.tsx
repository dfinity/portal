import clsx from "clsx";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

export const LazyAutoplayVideo: React.FC<{
  videoUrl: string;
  videoContentType: string;
  className?: string;
}> = ({ videoUrl, videoContentType, className }) => {
  const { ref, inView } = useInView({ threshold: 0 });
  const [shown, setShown] = React.useState(false);
  const videoRef = useRef<HTMLVideoElement>();

  useEffect(() => {
    if (inView && !shown) {
      setShown(true);
    }
  }, [inView]);

  useEffect(() => {
    if (!videoRef.current) return;
    // start playing the video when it comes in view
    if (shown && inView) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [shown, inView]);

  return (
    <div ref={ref} className="inline">
      {shown && (
        <video loop muted playsInline className={className} ref={videoRef}>
          <source src={videoUrl} type={videoContentType} />
        </video>
      )}
    </div>
  );
};
