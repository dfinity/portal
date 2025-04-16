import React, { useCallback, useEffect, useState } from "react";
import { AskAIWidget } from "@site/src/components/DocsHome/AskAIWidget";
import { DocSearch } from '@docsearch/react';
import './custom.css';


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
      <AskAIWidget />
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
      />
      <DocSearch
      appId="B0O3KB7MGW"
      indexName="internetcomputer"
      apiKey="43d8a7a6f4697a580cdf0cb021affddb"
      placeholder="Search internetcomputer.org"
      />


    </>
  );
};

export default Search;
