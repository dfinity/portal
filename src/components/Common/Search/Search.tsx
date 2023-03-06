import React, { FC, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { createActor } from "./actor";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { PageSearchResult } from "@site/search/src/declarations/search/search.did";

const Search: FC<{ onClose: () => void }> = ({ onClose }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  const actorRef = useRef<ReturnType<typeof createActor>>(null);
  const [term, setTerm] = useState<string>("");
  const [results, setResults] = useState<PageSearchResult[]>([]);
  const [loadMoreExpanded, setLoadMoreExpanded] = useState<
    Record<string, true>
  >({});

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    if (!actorRef.current) {
      actorRef.current = createActor(
        customFields["searchCanisterId"] as string
      );
    }

    function onKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        e.stopPropagation();
      }
    }

    window.addEventListener("keydown", onKeydown);

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", onKeydown);
    };
  }, []);

  useEffect(() => {
    let unmounted = false;

    (async () => {
      if (actorRef.current) {
        const results = await actorRef.current.query(term);

        if (!unmounted) {
          setResults(results);
        }
      }
    })();
    return () => {
      unmounted = true;
    };
  }, [term]);

  return (
    <>
      <motion.div
        className="fixed inset-0 overflow-auto bg-white-80 z-[3000]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div
          className="container-10 bg-white rounded-xl p-10 min-h-[calc(100%-80px)] mt-10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <img
              src="/img/showcase/search.svg"
              alt=""
              className="absolute w-4 left-3 top-1/2 -translate-y-1/2"
            />
            <input
              className="input-text pl-10 w-full"
              placeholder="Search the website..."
              ref={inputRef}
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            ></input>
          </div>

          <ol className="flex flex-col gap-8">
            {results.map((result) => (
              <li key={result.url} className=" p-2 list-decimal">
                <h2 className="text-xl font-semibold mb-2">
                  <a
                    className="underline"
                    target="_blank"
                    href={`https://internetcomputer.org${result.url}`}
                  >
                    {result.title}
                  </a>
                </h2>
                <div className="flex flex-col gap-4 border-l-4 border-solid border-gray-300">
                  {(!loadMoreExpanded[result.url]
                    ? result.results.slice(0, result.results.length > 4 ? 3 : 4)
                    : result.results
                  ).map((result) => (
                    <div className="pl-4" key={result.doc.id.toString()}>
                      <a
                        className="text font-semibold underline"
                        href={`https://internetcomputer.org${result.doc.url}`}
                        target="_blank"
                      >
                        {result.doc.title}
                      </a>
                      <div className="text-sm text-gray-500 whitespace-nowrap text-ellipsis overflow-hidden">
                        {result.doc.excerpt}
                      </div>
                    </div>
                  ))}

                  {result.results.length > 4 && (
                    <div className="pl-4">
                      {!loadMoreExpanded[result.url] && (
                        <button
                          className="text-sm text-gray-500"
                          onClick={() =>
                            setLoadMoreExpanded((v) => ({
                              ...v,
                              [result.url]: true,
                            }))
                          }
                        >
                          {result.results.length - 3} more results...
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </motion.div>
    </>
  );
};

export default Search;
