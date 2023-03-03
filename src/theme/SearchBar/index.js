import classnames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./styles.css";
import SearchOverlay from "@site/src/components/Common/Search/Search";

const Search = (props) => {
  const searchBarRef = useRef(null);

  const [metaKey, setMetaKey] = useState(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

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
  }, []);

  const toggleSearchIconClick = useCallback(
    (e) => {
      if (!searchBarRef.current.contains(e.target)) {
        searchBarRef.current.focus();
      }

      props.handleSearchBarToggle &&
        props.handleSearchBarToggle(!props.isSearchBarExpanded);
    },
    [props.isSearchBarExpanded]
  );

  return (
    <>
      <div className="navbar__search cursor-pointer" key="search-box">
        <span
          aria-label="expand searchbar"
          role="button"
          className={classnames("search-icon", {
            "search-icon-hidden": props.isSearchBarExpanded,
          })}
          onClick={() => setIsOverlayOpen(true)}
          tabIndex={0}
        />
        <button
          id="search_input_react"
          aria-label="Search"
          className={classnames(
            "navbar__search-input",
            { "search-bar-expanded": props.isSearchBarExpanded },
            { "search-bar": !props.isSearchBarExpanded },
            { "navbar__search-input-mobile": props.mobile },
            { "navbar__search-input-desktop": !props.mobile }
          )}
          onClick={() => setIsOverlayOpen(true)}
          ref={searchBarRef}
        >
          Search {metaKey && <span>{metaKey}K</span>}
        </button>
        <span className="navbar__search-indicator"></span>
      </div>
      {isOverlayOpen && (
        <SearchOverlay onClose={() => setIsOverlayOpen(false)} />
      )}
    </>
  );
};

export default Search;
