import SearchOverlay from "@site/src/components/Common/Search/Search";
import React, { useCallback, useEffect, useState } from "react";

const Search = () => {
  const [metaKey, setMetaKey] = useState(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const focusHelperInputRef = React.useRef(null);

  function openOverlay() {
    // must be called from an event handler to be able to auto-focus the search input on ios
    setIsOverlayOpen(true);

    // hack part 1 to focus the input on ios with keyboard shown
    focusHelperInputRef.current.style.display = "block";
    focusHelperInputRef.current.focus();
    focusHelperInputRef.current.click();
  }

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    if (userAgent.includes("Win")) {
      setMetaKey("CTRL+");
    } else if (userAgent.includes("Mac") && !userAgent.includes("iPhone")) {
      setMetaKey("⌘");
    } else if (userAgent.includes("Linux")) {
      setMetaKey("CTRL+");
    } else {
      setMetaKey(null);
    }

    function onKeydown(e) {
      if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        e.stopPropagation();
        openOverlay();
      }
    }

    window.addEventListener("keydown", onKeydown);

    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, []);

  return (
    <>
      <button
        className="
          navbar__search-button group
          border-none md:border-2 md:border-solid md:border-infinite/50 md:rounded-xl md:docs:border-black
          bg-transparent px-2 md:px-5 py-2
          font-circular md:text-infinite md:docs:text-black
          flex gap-2 items-center 
          md:order-last md:ml-6 
          outline-offset-2
          absolute right-[64px] md:static
          text-black

          md:hover:bg-infinite md:hover:text-white md:docs:hover:bg-black md:docs:hover:text-white
          "
        onClick={openOverlay}
        aria-label="Search"
      >
        <svg
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 md:w-4 md:h-4"
        >
          <path
            d="M11.7668 11.024L14.6221 13.8786L13.6788 14.822L10.8241 11.9666C9.76193 12.8181 8.44077 13.2812 7.07944 13.2793C3.76744 13.2793 1.07944 10.5913 1.07944 7.2793C1.07944 3.9673 3.76744 1.2793 7.07944 1.2793C10.3914 1.2793 13.0794 3.9673 13.0794 7.2793C13.0814 8.64063 12.6183 9.96179 11.7668 11.024ZM10.4294 10.5293C11.2755 9.65922 11.748 8.49292 11.7461 7.2793C11.7461 4.70063 9.65744 2.61263 7.07944 2.61263C4.50077 2.61263 2.41277 4.70063 2.41277 7.2793C2.41277 9.8573 4.50077 11.946 7.07944 11.946C8.29306 11.9479 9.45936 11.4754 10.3294 10.6293L10.4294 10.5293V10.5293Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </svg>

        <span className="tw-title-navigation text-infinite md:group-hover:text-white hidden md:block docs:text-black">
          Search
        </span>
        <span className="hidden md:block min-w-[53px] text-right text-infinite/70 docs:text-black/50 md:group-hover:text-white">
          {metaKey && (
            <span className="tw-paragraph-sm relative top-[2px]">
              {metaKey}K
            </span>
          )}
        </span>
      </button>
      <input
        style={{
          display: "none",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          opacity: 0,
          height: "100px",
          fontSize: "30px",
        }}
        id="ios-tmp-input"
        ref={focusHelperInputRef}
      ></input>
      {isOverlayOpen && (
        <SearchOverlay onClose={() => setIsOverlayOpen(false)} />
      )}
    </>
  );
};

export default Search;
