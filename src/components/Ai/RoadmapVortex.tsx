import React, { FC } from "react";

const RoadmapVortex: FC = () => {
  return (
    <article id="Ignition"
      className="milestone-large bg-white/50 rounded-xl relative">
      <div className="p-5 relative z-3 aspect-[7/2]">
        <div className="md:grid md:grid-cols-[6fr,10fr] gap-2">
          <div>
            <h4 className="tw-heading-5 md:tw-heading-3 mb-2 flex items-center">Vortex</h4>
            <h3 className="tw-heading-7">Sovereign AI Agents</h3>
          </div>
          <div>
            <p className="text-black/60 tw-paragraph md:mr-9 line-clamp-4">Focus on the security and the decentralization of the LLM services available on the Internet Computer</p>
          </div>
        </div>
      </div>
      <div className="p-1 relative z-3">
        <div className="grid gap-1 grid-cols-1 md:grid-cols-2">

            <article className="flex flex-col justify-between px-6 pt-6 pb-6 bg-white rounded-lg text-black aspect-[1/0.5] md:aspect-[1/1.022222]">
              <div>
                <header className="flex gap-2 justify-between self-stretch">
                <h5 className="tw-heading-6">LLM Workers</h5>
                </header>
                <p className="tw-paragraph-sm ">Introduce worker nodes that specialize in processing LLM prompts. Workers will have security guarantees similar to canister smart contracts on the Internet Computer</p>
              </div>
              <div className="flex gap-2 pr-20 mt-2"></div>
            </article>

        </div>
      </div>
    </article>
  );
}

export default RoadmapVortex;
