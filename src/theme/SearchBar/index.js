/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef, useCallback, useState, useEffect } from "react";
import classnames from "classnames";
import { useHistory } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import "./styles.css";
import("./algolia.css");

const Search = (props) => {
  const initialized = useRef(false);
  const searchBarRef = useRef(null);
  const [indexReady, setIndexReady] = useState(false);
  const history = useHistory();
  const { siteConfig = {} } = useDocusaurusContext();
  const { baseUrl } = siteConfig;
  const initAlgolia = (DocSearch) => {
    new DocSearch({
      inputSelector: props.mobile
        ? ".navbar__search-input-mobile"
        : ".navbar__search-input-desktop",
      // Override algolia's default selection event, allowing us to do client-side
      // navigation and avoiding a full page refresh.
      handleSelected: (_input, _event, suggestion) => {
        const url = baseUrl + suggestion.url;
        // Use an anchor tag to parse the absolute url into a relative url
        // Alternatively, we can use new URL(suggestion.url) but its not supported in IE
        const a = document.createElement("a");
        a.href = url;
        // Algolia use closest parent element id #__docusaurus when a h1 page title does not have an id
        // So, we can safely remove it. See https://github.com/facebook/docusaurus/issues/1828 for more details.

        try {
          const titleDiv = document.createElement("div");
          titleDiv.innerHTML = suggestion.title;
          window._paq.push([
            "trackEvent",
            "Search",
            _input.getVal(),
            titleDiv.innerText,
          ]);
        } catch {}

        history.push(url);
      },
    });
  };

  useEffect(() => {
    (async () => {
      const DocSearch = await import("./lib/DocSearch");
      initAlgolia(DocSearch);
      setIndexReady(true);
      initialized.current = true;
    })();
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
    <div className="navbar__search" key="search-box">
      <span
        aria-label="expand searchbar"
        role="button"
        className={classnames("search-icon", {
          "search-icon-hidden": props.isSearchBarExpanded,
        })}
        onClick={toggleSearchIconClick}
        onKeyDown={toggleSearchIconClick}
        tabIndex={0}
      />
      <input
        id="search_input_react"
        type="search"
        placeholder={indexReady ? "Search website" : "Loading..."}
        aria-label="Search"
        className={classnames(
          "navbar__search-input",
          { "search-bar-expanded": props.isSearchBarExpanded },
          { "search-bar": !props.isSearchBarExpanded },
          { "navbar__search-input-mobile": props.mobile },
          { "navbar__search-input-desktop": !props.mobile }
        )}
        onFocus={toggleSearchIconClick}
        onBlur={toggleSearchIconClick}
        ref={searchBarRef}
        disabled={!indexReady}
      />
    </div>
  );
};

export default Search;
