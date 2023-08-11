import Breadcrumbs from "@site/src/components/Common/Breadcrumbs";
import ShareMeta from "@site/src/components/Common/ShareMeta";
import Layout from "@theme/Layout";
import React from "react";

function Page() {
  return (
    <Layout title="Design showcase">
      <ShareMeta image="/img/shareImages/share-defi.jpg"></ShareMeta>
      <div className="container-12 py-12">
        <Breadcrumbs
          links={[
            {
              text: "Checklists",
            },
          ]}
        ></Breadcrumbs>
      </div>
      <main className="container-12 py-10">
        <div className="flex flex-col gap-6 items-start">
          <ul className="checklist tw-paragraph md:tw-lead-sm mb-6 space-y-3">
            <li className="checklist-item leading-6 pl-8">Serve web</li>
            <li className="checklist-item leading-6 pl-8">
              Integrate existing web2 APIs without oracles
            </li>
            <li className="checklist-item leading-6 pl-8">
              Provides out of the box anonymous authentication system
            </li>
            <li className="checklist-item leading-6 pl-8">
              Store large amounts of data on-chain
            </li>
            <li className="checklist-item leading-6 pl-8">
              Store private data on-chain
            </li>
          </ul>
          <ul className="tw-lead-lg text-black list-none checklist space-y-6">
            <li className="checklist-item checklist-item-lg pl-12">
              Web experiences served by smart contracts
            </li>
            <li className="checklist-item checklist-item-lg pl-12">
              Web2 APIs processed through consensus
            </li>
            <li className="checklist-item checklist-item-lg pl-12">
              Googleable smart contracts
            </li>
          </ul>
          <div className="bg-infinite p-8 w-full">
            <ul className="tw-paragraph text-white list-none checklist space-y-6">
              <li className="checklist-item-white pl-8">
                Web experiences served by smart contracts
              </li>
              <li className="checklist-item-white pl-8">
                Web2 APIs processed through consensus
              </li>
              <li className="checklist-item-white pl-8">
                Googleable smart contracts
              </li>
            </ul>
          </div>
          <div className="bg-infinite p-8 w-full">
            <ul className="tw-lead-lg text-white list-none checklist space-y-6">
              <li className="checklist-item-white checklist-item-lg pl-12">
                Web experiences served by smart contracts
              </li>
              <li className="checklist-item-white checklist-item-lg pl-12">
                Web2 APIs processed through consensus
              </li>
              <li className="checklist-item-white checklist-item-lg pl-12">
                Googleable smart contracts
              </li>
            </ul>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Page;
