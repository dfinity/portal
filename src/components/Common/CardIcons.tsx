import React from "react";
import Link from "@docusaurus/Link";
import MotokoIcon from "@site/static/img/svgIcons/motoko.svg";
import RustIcon from "@site/static/img/svgIcons/rust.svg";
import YoutubeIcon from "@site/static/img/svgIcons/youtube.svg";
import DocsIcon from "@site/static/img/svgIcons/docs.svg";
import IC0Icon from "@site/static/img/svgIcons/ic0.svg";
import GitHubIcon from "@site/static/img/svgIcons/github.svg";
import LinkIcon from "@site/static/img/svgIcons/link.svg";

export function MotokoLink({ to }) {
  return (
    <div className="relative flex group">
      <div className="hidden group-hover:flex items-center justify-center w-40 absolute bottom-full left-1/2 -translate-x-[calc(50%+4px)]">
        <span className="mb-1 text-white py-1 px-3 h-8 rounded-full bg-black-60 backdrop-blur-2xl items-center">
          Motoko
        </span>
      </div>
      <Link
        className="flex items-center justify-center relative h-10 w-10 rounded-full border border-solid border-[#dfdfdf] p-2 text-infinite hover:border-infinite hover:text-white hover:bg-infinite hover:no-underline"
        to={to}
      >
        <MotokoIcon />
      </Link>
    </div>
  );
}

export function RustLink({ to }) {
  return (
    <div className="relative flex group">
      <div className="hidden group-hover:flex items-center justify-center w-40 absolute bottom-full left-1/2 -translate-x-[calc(50%+4px)]">
        <span className="mb-1 text-white py-1 px-3 h-8 rounded-full bg-black-60 backdrop-blur-2xl items-center">
          Rust
        </span>
      </div>
      <Link
        className="flex items-center justify-center relative h-10 w-10 rounded-full border border-solid border-[#dfdfdf] p-2 text-infinite hover:border-infinite hover:text-white hover:bg-infinite hover:no-underline"
        to={to}
      >
        <RustIcon />
      </Link>
    </div>
  );
}

export function DocsLink({ to }) {
  return (
    <div className="relative flex group">
      <div className="hidden group-hover:flex items-center justify-center w-40 absolute bottom-full left-1/2 -translate-x-[calc(50%+4px)]">
        <span className="mb-1 text-white py-1 px-3 h-8 rounded-full bg-black-60 backdrop-blur-2xl items-center">
          Developer Docs
        </span>
      </div>
      <Link
        className="flex items-center justify-center relative h-10 w-10 rounded-full border border-solid border-[#dfdfdf] p-2 text-infinite hover:border-infinite hover:text-white hover:bg-infinite hover:no-underline"
        to={to}
      >
        <DocsIcon />
      </Link>
    </div>
  );
}

export function YoutubeLink({ to }) {
  return (
    <div className="relative flex group">
      <div className="hidden group-hover:flex items-center justify-center w-40 absolute bottom-full left-1/2 -translate-x-[calc(50%+4px)]">
        <span className="mb-1 text-white py-1 px-3 h-8 rounded-full bg-black-60 backdrop-blur-2xl items-center">
          Watch Tutorials
        </span>
      </div>
      <Link
        className="flex items-center justify-center relative h-10 w-10 rounded-full border border-solid border-[#dfdfdf] p-2 text-infinite hover:border-infinite hover:text-white hover:bg-infinite hover:no-underline"
        to={to}
      >
        <YoutubeIcon />
      </Link>
    </div>
  );
}

export function LivePreviewLink({ to }) {
  return (
    <div className="relative flex group">
      <div className="hidden group-hover:flex items-center justify-center w-40 absolute bottom-full left-1/2 -translate-x-[calc(50%+4px)]">
        <span className="mb-1 text-white py-1 px-3 h-8 rounded-full bg-black-60 backdrop-blur-2xl items-center">
          See Live
        </span>
      </div>
      <Link
        className="flex items-center justify-center relative h-10 w-10 rounded-full border border-solid border-[#dfdfdf] p-2 text-infinite hover:border-infinite hover:text-white hover:bg-infinite hover:no-underline"
        to={to}
      >
        <IC0Icon />
      </Link>
    </div>
  );
}
export function GitHubLink({ to, label = "Link to GitHub" }) {
  return (
    <div className="relative flex group">
      <div className="hidden group-hover:flex items-center justify-center w-40 absolute bottom-full left-1/2 -translate-x-[calc(50%+4px)]">
        <span className="mb-1 text-white py-1 px-3 h-8 rounded-full bg-black-60 backdrop-blur-2xl items-center">
          Source Code
        </span>
      </div>
      <Link
        className="flex items-center justify-center relative h-10 w-10 rounded-full border border-solid border-[#dfdfdf] p-2 text-infinite hover:border-infinite hover:text-white hover:bg-infinite hover:no-underline"
        to={to}
        aria-label={label}
      >
        <GitHubIcon />
      </Link>
    </div>
  );
}
export function ExternalLink({ to, label = "External Link" }) {
  return (
    <div className="relative flex group">
      <div className="hidden group-hover:flex items-center justify-center w-40 absolute bottom-full left-1/2 -translate-x-[calc(50%+4px)]">
        <span className="mb-1 text-white py-1 px-3 h-8 rounded-full bg-black-60 backdrop-blur-2xl items-center">
          More Information
        </span>
      </div>
      <Link
        className="flex items-center justify-center relative h-10 w-10 rounded-full border border-solid border-[#dfdfdf] p-2 text-infinite hover:border-infinite hover:text-white hover:bg-infinite hover:no-underline"
        to={to}
        aria-label={label}
      >
        <LinkIcon />
      </Link>
    </div>
  );
}
