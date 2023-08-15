import React from "react";

const Stats: React.FC = () => {
  return (
    <div className="mt-20 backdrop-blur-2xl bg-white/80 border border-white border-solid rounded-xl py-12 px-6 md:px-20 flex flex-col md:flex-row md:justify-between gap-10">
      <figure className="m-0 flex flex-col gap-2 items-center">
        <span className="tw-heading-60 text-gradient">80</span>
        <figcaption className="tw-lead-sm">Node providers</figcaption>
      </figure>
      <figure className="m-0 flex flex-col gap-2 items-center">
        <span className="tw-heading-60 text-gradient">79</span>
        <figcaption className="tw-lead-sm">Data centers</figcaption>
      </figure>
      <figure className="m-0 flex flex-col gap-2 items-center">
        <span className="tw-heading-60 text-gradient">1164</span>
        <figcaption className="tw-lead-sm">Total node machines</figcaption>
      </figure>
      <figure className="m-0 flex flex-col gap-2 items-center">
        <span className="tw-heading-60 text-gradient">309 kW</span>
        <figcaption className="tw-lead-sm">Total energy consumption</figcaption>
      </figure>
    </div>
  );
};

export default Stats;
