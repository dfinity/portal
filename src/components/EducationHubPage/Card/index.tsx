import React, { useState, useEffect, useRef } from "react";
import MotokoIcon from "@site/static/img/svgIcons/motoko.svg";
import RustIcon from "@site/static/img/svgIcons/rust.svg";
import TypescriptIcon from "@site/static/img/svgIcons/typescript.svg";
import Link from "@docusaurus/Link";

function MotokoLink() {
  return (
    <div
      onClick={(event) => {
        event.preventDefault();
      }}
      className="relative flex group"
    >
      <div className="hidden group-hover:flex items-center justify-center w-40 absolute bottom-full left-1/2 -translate-x-[calc(50%+4px)] z-2">
        <span className="mb-1 text-white py-1 px-3 h-8 rounded-full bg-black-60 backdrop-blur-2xl items-center">
          Motoko
        </span>
      </div>
      <div className="flex items-center justify-center relative h-10 w-10 rounded-full border border-solid border-[#dfdfdf] p-2 text-infinite hover:border-infinite hover:text-white hover:bg-infinite hover:no-underline">
        <MotokoIcon />
      </div>
    </div>
  );
}

function RustLink() {
  return (
    <div
      onClick={(event) => {
        event.preventDefault();
      }}
      className="relative flex group"
    >
      <div className="hidden group-hover:flex items-center justify-center w-40 absolute bottom-full left-1/2 -translate-x-[calc(50%+4px)]">
        <span className="mb-1 text-white py-1 px-3 h-8 rounded-full bg-black-60 backdrop-blur-2xl items-center">
          Rust
        </span>
      </div>
      <div className="flex items-center justify-center relative h-10 w-10 rounded-full border border-solid border-[#dfdfdf] p-2 text-infinite hover:border-infinite hover:text-white hover:bg-infinite hover:no-underline">
        <RustIcon />
      </div>
    </div>
  );
}

function TypeScriptLink() {
  return (
    <div
      onClick={(event) => {
        event.preventDefault();
      }}
      className="relative flex group"
    >
      <div className="hidden group-hover:flex items-center justify-center w-40 absolute bottom-full left-1/2 -translate-x-[calc(50%+4px)]">
        <span className="mb-1 text-white py-1 px-3 h-8 rounded-full bg-black-60 backdrop-blur-2xl items-center">
          Typescript
        </span>
      </div>
      <div className="flex items-center justify-center relative h-10 w-10 rounded-full border border-solid border-[#dfdfdf] p-2 text-infinite hover:border-infinite hover:text-white hover:bg-infinite hover:no-underline">
        <TypescriptIcon />
      </div>
    </div>
  );
}
function Index({ title, body, languages, tags, link, level, image, category }) {
  const [showTags, setShowTags] = useState(false);
  const tagsRef = useRef(null);

  const handleClickOutside = (event) => {
    if (tagsRef.current && !tagsRef.current.contains(event.target)) {
      setShowTags(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Link
      href={link}
      className="link-primary link-with-icon no-underline cursor-pointer hover:-translate-y-2 transition-transform text-black"
    >
      <article
        className={`flex flex-col rounded-2xl  bg-white border-t-[4px] h-full w-full justify-start `}
      >
        {image && (
          <img src={image} className="w-full h-40 object-cover rounded-t-xl" />
        )}
        <div className={`px-4 py-6`}>
          <p
            className={`tw-paragraph font-medium capitalize text-razzmatazz mb-0 mt-1`}
          >
            {category === "Course"
              ? `Course:  ${Array.isArray(level) ? level.join(", ") : level}`
              : null}
          </p>
          <p className="tw-heading-6 my-2">{title}</p>
          <div className="flex gap-2 my-2">
            {" "}
            {languages && languages.includes("motoko") && <MotokoLink />}
            {languages && languages.includes("rust") && <RustLink />}
            {languages && languages.includes("typescript") && (
              <TypeScriptLink />
            )}
          </div>

          <p className="tw-paragraph-sm text-black-60 line-clamp-4 mt-1">
            {body}
          </p>
          <p
            ref={tagsRef}
            className="flex flex-wrap space-x-1 transition-all duration-500 mt-auto white"
          >
            {tags.slice(0, 2).map((tag) => (
              <span className="text-[11px] mt-1 text-black/60  border-solid border border-black/20 justify-center px-2 rounded-[100px] ">
                {tag}
              </span>
            ))}
            {tags.length > 2 && !showTags && (
              <span
                onClick={(event) => {
                  event.preventDefault();
                  setShowTags(!showTags);
                }}
                className="text-[11px] mt-1 text-black/60  border-solid border border-black/20 justify-center px-2 rounded-[100px]  hover:border-black/60"
              >
                + {tags.slice(2).length}
              </span>
            )}
            {showTags &&
              tags
                .slice(2)
                .map((tag) => (
                  <span className="text-[11px] mt-1  text-black/60  border-solid border border-black/20 justify-center px-2 rounded-[100px] ">
                    {tag}
                  </span>
                ))}
          </p>
        </div>
      </article>{" "}
    </Link>
  );
}

export default Index;
