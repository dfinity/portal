import Link from "@docusaurus/Link";
import clsx from "clsx";
import React, { FC } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import LinkArrowRight from "../Common/Icons/LinkArrowRight";
import { NetworkStats } from "./NetworkStats";
import GuidesIcon from "./guides.svg";
import TutorialsIcon from "./tutorials.svg";

const TitlePanel: FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className={clsx("p-10  rounded-lg bg-infinite text-white", className)}>
      {children}
    </div>
  );
};

const Panel: FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        "p-10 border border-white border-solid rounded-lg bg-white/70",
        className
      )}
    >
      {children}
    </div>
  );
};

const queryClient = new QueryClient();

const DocsHomePage: FC = () => {
  return (
    <div className="mt-8">
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <TitlePanel className="col-span-2 row-span-2 bg-[url(/img/docs/hero-bg.webp)] bg-center bg-cover flex flex-col">
          <h1 className="tw-heading-2 mb-14">Developer Docs</h1>
          <p className="tw-lead mb-20 flex-1">
            Start a DAO, create a token, build dapps and host assets with the
            full tech stack entirely 100% on chain.
          </p>
          <p className="mb-0">
            {/* <Link className="bg-white py-3 px-8 tw-paragraph font-medium text-infinite rounded-lg inline-flex items-center gap-2 hover"> */}
            <Link className="button-white button-with-icon">
              Start building
              <LinkArrowRight />
            </Link>
          </p>
        </TitlePanel>
        <Panel className="col-span-2">
          <QueryClientProvider client={queryClient}>
            <NetworkStats></NetworkStats>
          </QueryClientProvider>
        </Panel>
        <Panel className="col-span-1 flex flex-col">
          <GuidesIcon />
          <h2 className="tw-heading-5 my-6">Guides</h2>
          <p className="mb-6 tw-paragraph flex-1">
            Access all of the documentation guidelines needed to get your
            project up and running.
          </p>
          <p className="mb-0">
            <Link className="button-outline button-with-icon">
              Start building
              <LinkArrowRight />
            </Link>
          </p>
        </Panel>
        <Panel className="col-span-1 flex flex-col">
          <TutorialsIcon />
          <h2 className="tw-heading-5 my-6">Tutorials</h2>
          <p className="mb-6 tw-paragraph flex-1">
            This section will guide developers to create and deploy sample
            applications in a step-by-step mode.
          </p>
          <p className="mb-0">
            <Link className="button-outline button-with-icon">
              Start learning
              <LinkArrowRight />
            </Link>
          </p>
        </Panel>
      </section>
    </div>
  );
};

export default DocsHomePage;
