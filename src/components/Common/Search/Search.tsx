import React, { FC, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { createActor } from "./actor";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { PageSearchResult } from "@site/search/src/declarations/search/search.did";
import { createFocusTrap } from "focus-trap";
import Link from "@docusaurus/Link";
import { trackEvent } from "@site/src/utils/matomo";
import useLockBodyScroll from "../../../utils/use-lock-body-scroll";
import { useLocation } from "@docusaurus/router";

let initialTerm = "";
let initialResults: PageSearchResult[] | null = null;

const Search: FC<{ onClose: () => void }> = ({ onClose }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  const actorRefPromise = useRef<Promise<ReturnType<typeof createActor>>>(null);
  const [term, setTerm] = useState<string>(initialTerm);
  const [results, setResults] = useState<PageSearchResult[] | null>(
    initialResults
  );
  const [loadMoreExpanded, setLoadMoreExpanded] = useState<
    Record<string, true>
  >({});
  const [loading, setLoading] = useState(false);
  const location = useLocation(); // Get current location
  const isDocsPage = location.pathname.includes("/docs");

  useLockBodyScroll();

  useEffect(() => {
    actorRefPromise.current = import("./actor").then(({ createActor }) => {
      console.log("search module loaded");
      return createActor(customFields["searchCanisterId"] as string);
    });

    // hack part 2 to make sure the input is focused on ios and the keyboard opens
    const tmpInput = document.querySelector(
      "#ios-tmp-input"
    ) as HTMLInputElement;
    inputRef.current.focus();
    inputRef.current.click();
    tmpInput.style.display = "none";

    const trap = createFocusTrap(dialogRef.current, {});
    trap.activate();

    function onKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        e.stopPropagation();
      }
    }

    window.addEventListener("keydown", onKeydown);

    return () => {
      window.removeEventListener("keydown", onKeydown);
      trap.deactivate();
    };
  }, []);

  useEffect(() => {
    if (!term || term.trim() == "") {
      setResults(null);
      initialResults = null;
      return;
    }

    let unmounted = false;

    setLoading(true);

    actorRefPromise.current.then(async (actor) => {
      initialTerm = term;

      // Get the search results from the actor
      const rawResults = await actor.query(term);

      // Prioritize results based strictly on title matches first, then URL context
      let prioritizedResults = [...rawResults];

      // Create a normalized search term for matching
      const normalizedTerm = term.toLowerCase().trim();

      // Sort the results with title matches as absolute first priority
      prioritizedResults.sort((a, b) => {
        // First priority: Title matches (trumps everything else)
        const aHasTitleMatch = a.title.toLowerCase().includes(normalizedTerm);
        const bHasTitleMatch = b.title.toLowerCase().includes(normalizedTerm);

        if (aHasTitleMatch && !bHasTitleMatch) return -1;
        if (!aHasTitleMatch && bHasTitleMatch) return 1;

        // If title match status is the same for both results,
        // only then consider docs vs non-docs as a secondary factor
        if (aHasTitleMatch === bHasTitleMatch) {
          const aIsDoc = a.url.includes("/docs");
          const bIsDoc = b.url.includes("/docs");

          // If we're on a docs page, prioritize docs results
          if (isDocsPage) {
            if (aIsDoc && !bIsDoc) return -1;
            if (!aIsDoc && bIsDoc) return 1;
          }
          // If we're on a regular page, prioritize non-docs results
          else {
            if (!aIsDoc && bIsDoc) return -1;
            if (aIsDoc && !bIsDoc) return 1;
          }
        }

        return 0; // Keep original order for equally matched items
      });

      if (!unmounted) {
        setLoading(false);
        initialResults = prioritizedResults;
        setResults(prioritizedResults);
      }
    });
    return () => {
      unmounted = true;
    };
  }, [term, isDocsPage, setLoading]);

  function handleResultClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    term: string,
    title: string
  ) {
    if (!e.metaKey && !e.ctrlKey) {
      onClose();
    }

    try {
      trackEvent("Search", term, title);
    } catch {}
  }

  return (
    <>
      <motion.div
        className="fixed h-screen inset-0 backdrop-blur-lg z-[3001] touch-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-modal="true"
      ></motion.div>
      <motion.div
        className="fixed max-h-screen top-0 left-0 right-0 z-[3002] overflow-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        ref={dialogRef}
        aria-modal="true"
      >
        <div
          className="md:container-10 backdrop-blur-0 touch-auto"
          aria-label="Search the website"
        >
          <div
            className="bg-white md:rounded-xl md:mt-10 md:drop-shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex pr-4 gap-2 md:gap-4 sticky md:static top-0 bg-white md:bg-transparent">
              <div className="relative flex-1">
                <img
                  src="/img/search.svg"
                  alt=""
                  className="absolute w-6 left-4 top-1/2 -translate-y-1/2"
                />
                <input
                  // type="search"
                  className="mainsearchinput block border-none tw-lead-sm bg-transparent py-[22px] px-4 pl-14 w-full focus:outline-none"
                  placeholder={
                    isDocsPage ? "Search docs..." : "Search for anything"
                  }
                  ref={inputRef}
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  tabIndex={0}
                ></input>
                {loading && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-infinite/50 search-loading"></div>
                )}
              </div>
              {term.trim().length > 0 && (
                <button
                  className="bg-transparent px-4 py-4 border-none appearance-none self-center flex"
                  onClick={() => {
                    setTerm("");
                    initialTerm = "";
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 6.66688L12.6669 2L14 3.33312L9.33312 8L14 12.6669L12.6669 14L8 9.33312L3.33312 14L2 12.6669L6.66688 8L2 3.33312L3.33312 2L8 6.66688Z"
                      fill="#181818"
                    />
                  </svg>
                </button>
              )}
              <span className="w-px h-6 bg-black-20 self-center"></span>
              <button
                className="font-circular link-primary bg-transparent px-3 h-12 border-none appearance-none self-center"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>

            {results && results.length > 0 && (
              <ol className="flex flex-col p-0 md:shadow-[inset_0px_4px_4px_rgba(51,51,51,0.07)]">
                {results.map((result) => (
                  <li
                    key={result.url}
                    className="px-4 md:px-14 py-6 md:py-10 list-none even:bg-[#F1EEF5]"
                  >
                    <h2 className="mb-4">
                      <Link
                        className="tw-heading-5 mb-4 hover:text-black hover:no-underline"
                        href={result.url}
                        onClick={(e) =>
                          handleResultClick(e, term, result.title)
                        }
                      >
                        {result.title}
                      </Link>
                    </h2>
                    <div className="flex flex-col gap-4">
                      {(!loadMoreExpanded[result.url]
                        ? result.results.slice(
                            0,
                            result.results.length > 4 ? 3 : 4
                          )
                        : result.results
                      ).map((pageSection) => (
                        <div className="" key={pageSection.doc.id.toString()}>
                          <Link
                            className="tw-heading-7 text-infinite hover:no-underline hover:text-black"
                            href={pageSection.doc.url}
                            onClick={(e) =>
                              handleResultClick(
                                e,
                                term,
                                result.title + " / " + pageSection.doc.title
                              )
                            }
                          >
                            {pageSection.doc.title}
                          </Link>
                          <p className="tw-paragraph text-black-60 whitespace-nowrap text-ellipsis overflow-hidden mb-0">
                            {pageSection.doc.excerpt}
                          </p>
                        </div>
                      ))}

                      {result.results.length > 4 && (
                        <div className="">
                          {!loadMoreExpanded[result.url] && (
                            <button
                              className="font-circular tw-heading-7 bg-transparent border-none text-infinite hover:text-black p-0 inline-flex items-center gap-2"
                              onClick={() =>
                                setLoadMoreExpanded((v) => ({
                                  ...v,
                                  [result.url]: true,
                                }))
                              }
                            >
                              {result.results.length - 3} more results
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            )}

            {results && results.length == 0 && (
              <div className="flex flex-col px-4 pt-6 pb-14 shadow-[inset_0px_4px_4px_rgba(51,51,51,0.07)]">
                <div className="flex flex-col gap-6 items-center py-20">
                  <img
                    src="/img/astronaut-no-result.png"
                    alt=""
                    className="w-24"
                  />
                  <p className="tw-heading-6 mb-0">
                    No results found for "{term}"
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Search;
