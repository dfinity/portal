import React, { FC } from "react";

const RoadmapIgnition: FC = () => {
  return (
    <article
      id="Ignition"
      className="milestone-large bg-white/50 rounded-xl relative"
    >
      <div className="p-5 relative z-3 aspect-[10/2]">
        <div className="md:grid md:grid-cols-[6fr,10fr] gap-2">
          <div>
            <h4 className="tw-heading-5 md:tw-heading-3 mb-2 flex items-center">
              Ignition
            </h4>
            <h3 className="tw-heading-7">Foundational LLMs</h3>
            <p className="tw-paragraph font-bold mb-2"></p>
          </div>
          <div>
            <p className="text-black/60 tw-paragraph md:mr-9 ">
              AI agents are a growing paradigm in software, and the Internet
              Computer is uniquely positioned to be the home of AI agents.
              Compared to the traditional IT stack, AI agents on the Internet
              Computer can securely and easily manage digital assets, transact
              amongst each other, be fully sovereign, and be tokenized and
              managed by DAOs. This milestone focuses on providing access to
              foundational LLMs, along with basic tools to make it as simple as
              possible to deploy agents on the Internet Computer.
            </p>
          </div>
        </div>
      </div>
      <div className="p-1 relative z-3">
        <div className="grid gap-1 grid-cols-1 md:grid-cols-4">
          <article className="flex flex-col justify-between px-6 pt-6 pb-6 bg-white rounded-lg text-black aspect-[1/0.5] md:aspect-[1/1.022222] md:h-full">
            <div>
              <header className="flex gap-2 justify-between self-stretch">
                <h5 className="tw-heading-6">LLM Canister MVP</h5>
                <div className="basis-7 w-7 grow-0 shrink-0">
                  <span className="relative group cursor-pointer">
                    <span
                      role="tooltip"
                      className="absolute z-50 -top-2 bg-black-60 py-1 px-4 rounded-lg tw-paragraph-sm opacity-0 text-white transition-opacity pointer-events-none group-hover:opacity-100 left-1/2 transform -translate-x-1/2 -translate-y-full text-nowrap text-center bg-black/75 rounded-lg whitespace-nowrap	"
                    >
                      Deployed
                    </span>
                    <svg
                      className="w-full block rounded-full"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        border: "2px solid rgba(255 255 255 / 25%)",
                        boxShadow: "0px 0px 23.333px 0px #0CA80D",
                        background: "#0CA80D",
                      }}
                    >
                      <rect width="24" height="24" rx="12" fill="#0CA80D" />
                      <path
                        d="M7 11.9994L10.8468 16L17 9.59977L15.4617 8L10.8468 12.8005L8.53829 10.3997L7 11.9994Z"
                        fill={"#fff"}
                      />
                    </svg>
                  </span>
                </div>
              </header>
              <p className="tw-paragraph-sm ">
                A canister will be made available that provides an API for
                processing LLM prompts. This canister is an MVP and will
                initially rely on a centrally-managed service by DFINITY for
                processing the prompts. A small set of foundational models will
                be supported.
              </p>
            </div>
            <div className="flex gap-2 pr-20 mt-2"></div>
          </article>

          <article className="flex flex-col justify-between px-6 pt-6 pb-6 bg-white rounded-lg text-black aspect-[1/0.5] md:aspect-[1/1.022222]  md:h-full">
            <div>
              <header className="flex gap-2 justify-between self-stretch">
                <h5 className="tw-heading-6">LLM Developer Experience</h5>
                <div className="basis-7 w-7 grow-0 shrink-0">
                  <span className="relative group cursor-pointer">
                    <span
                      role="tooltip"
                      className="absolute z-50 -top-2 bg-black-60 py-1 px-4 rounded-lg tw-paragraph-sm opacity-0 text-white transition-opacity pointer-events-none group-hover:opacity-100 left-1/2 transform -translate-x-1/2 -translate-y-full text-nowrap text-center bg-black/75 rounded-lg whitespace-nowrap	"
                    >
                      In Progress
                    </span>
                    <svg
                      className="w-full block"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.5"
                        width="24"
                        height="24"
                        rx="12"
                        fill="#FBB549"
                      ></rect>
                      <path
                        d="M12.5 7C13.4889 7 14.4556 7.29324 15.2779 7.84265C16.1001 8.39206 16.741 9.17295 17.1194 10.0866C17.4978 11.0002 17.5969 12.0055 17.4039 12.9755C17.211 13.9454 16.7348 14.8363 16.0355 15.5355C15.3363 16.2348 14.4454 16.711 13.4755 16.9039C12.5055 17.0969 11.5002 16.9978 10.5866 16.6194C9.67295 16.241 8.89206 15.6001 8.34265 14.7779C7.79324 13.9556 7.5 12.9889 7.5 12H9.5C9.5 12.5933 9.67595 13.1734 10.0056 13.6667C10.3352 14.1601 10.8038 14.5446 11.3519 14.7716C11.9001 14.9987 12.5033 15.0581 13.0853 14.9424C13.6672 14.8266 14.2018 14.5409 14.6213 14.1213C15.0409 13.7018 15.3266 13.1672 15.4424 12.5853C15.5581 12.0033 15.4987 11.4001 15.2716 10.8519C15.0446 10.3038 14.6601 9.83524 14.1667 9.50559C13.6734 9.17595 13.0933 9 12.5 9V7Z"
                        fill="#FFF"
                      ></path>
                    </svg>
                  </span>
                </div>
              </header>
              <p className="tw-paragraph-sm ">
                Tools and libraries to simplify the local development and the
                interaction with the LLM canister
              </p>
            </div>
            <div className="flex gap-2 pr-20 mt-2"></div>
          </article>
          <article className="flex flex-col justify-between px-6 pt-6 pb-12 bg-white rounded-lg text-black aspect-[1/0.5] md:aspect-[1/1.022222] md:h-full">
            <div>
              <header className="flex gap-2 justify-between self-stretch">
                <h5 className="tw-heading-6">LLM Workers</h5>
              </header>
              <p className="tw-paragraph-sm ">
                Introduce worker nodes that specialize in processing LLM
                prompts. Workers will have security guarantees similar to
                canister smart contracts on the Internet Computer
              </p>
            </div>
            <div className="flex gap-2 pr-20 mt-2"></div>
          </article>
        </div>
      </div>
    </article>
  );
};

export default RoadmapIgnition;
