import { useState, useEffect } from "react";

export function useDarkHeaderInHero(heroRef: React.RefObject<HTMLDivElement>) {
  const [bgDark, setBgDark] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    setHeaderHeight(
      document.querySelector("nav.navbar").getBoundingClientRect().height
    );
  }, []);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY > heroRef.current.clientHeight - headerHeight &&
        bgDark
      ) {
        setBgDark(false);
      } else if (
        window.scrollY < heroRef.current.clientHeight - headerHeight &&
        !bgDark
      ) {
        setBgDark(true);
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [bgDark, headerHeight]);

  return bgDark;
}
