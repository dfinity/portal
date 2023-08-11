import Breadcrumbs from "@site/src/components/Common/Breadcrumbs";
import ShareMeta from "@site/src/components/Common/ShareMeta";
import Layout from "@theme/Layout";
import React from "react";

function DefiPage() {
  return (
    <Layout title="Design showcase">
      <ShareMeta image="/img/shareImages/share-defi.jpg"></ShareMeta>
      <div className="container-12 py-12">
        <Breadcrumbs
          links={[
            {
              text: "Typography",
            },
          ]}
        ></Breadcrumbs>
      </div>
      <main className="container-12 py-10 space-y-20">
        <div className="flex flex-col gap-6 items-start">
          <div className="tw-heading-1">Heading 1</div>
          <div className="tw-heading-2">Heading 2</div>
          <div className="tw-heading-60">Heading 60</div>
          <div className="tw-heading-3">Heading 3</div>
          <div className="tw-heading-4">Heading 4</div>
          <div className="tw-heading-5">Heading 5</div>
          <div className="tw-heading-6">Heading 6</div>
          <div className="tw-heading-7">Heading 7</div>
          <div className="tw-heading-7-caps">Heading 7-caps</div>
          <div className="tw-button-sm">Button sm</div>
          <div className="tw-title-navigation">Title navigation</div>
          <div className="tw-title-navigation-on-page">
            Title navigation on-page
          </div>
        </div>
        <div className="flex flex-col gap-6 items-start">
          <div className="tw-title-lg">Title lg</div>
          <div className="tw-title-sm">Title sm</div>
          <div className="tw-lead-lg">Lead lg</div>
          <div className="tw-lead">Lead</div>
          <div className="tw-lead-sm">Lead sm</div>
          <div className="tw-paragraph">Paragraph</div>
          <div className="tw-paragraph-sm">Paragraph sm</div>
          <div className="tw-caption">Caption</div>
        </div>
      </main>
    </Layout>
  );
}

export default DefiPage;
