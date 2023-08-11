import Breadcrumbs from "@site/src/components/Common/Breadcrumbs";
import IntraPageNav from "@site/src/components/Common/IntraPageNav";
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
              text: "On page navigation",
            },
          ]}
        ></Breadcrumbs>
      </div>
      <main className="container-10">
        <section className="my-10 md:my-10 min-h-screen">
          <h1 className="tw-heading-2 mb-10">On page navigation example</h1>
          <p className="tw-lead-lg">Scroll down...</p>
        </section>

        <section className="my-20 md:my-30" id="section-1">
          <h2 className="tw-heading-60 mb-10">Section 1</h2>
          <p className="tw-lead mb-8">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus,
            dolorem? Reiciendis, libero amet corrupti vitae cum ipsam fugit
            officiis velit porro qui inventore cumque voluptas facilis?
            Voluptates animi odio deserunt.
          </p>
          <p className="tw-lead mb-8">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus,
            dolorem? Reiciendis, libero amet corrupti vitae cum ipsam fugit
            officiis velit porro qui inventore cumque voluptas facilis?
            Voluptates animi odio deserunt.
          </p>
        </section>
        <section className="my-20 md:my-30" id="section-2">
          <h2 className="tw-heading-60 mb-10">Section 2</h2>
          <p className="tw-lead mb-8">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus,
            dolorem? Reiciendis, libero amet corrupti vitae cum ipsam fugit
            officiis velit porro qui inventore cumque voluptas facilis?
            Voluptates animi odio deserunt.
          </p>
          <p className="tw-lead mb-8">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus,
            dolorem? Reiciendis, libero amet corrupti vitae cum ipsam fugit
            officiis velit porro qui inventore cumque voluptas facilis?
            Voluptates animi odio deserunt.
          </p>
        </section>
        <section className="my-20 md:my-30" id="section-3">
          <h2 className="tw-heading-60 mb-10">Section 3</h2>
          <p className="tw-lead mb-8">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus,
            dolorem? Reiciendis, libero amet corrupti vitae cum ipsam fugit
            officiis velit porro qui inventore cumque voluptas facilis?
            Voluptates animi odio deserunt.
          </p>
          <p className="tw-lead mb-8">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus,
            dolorem? Reiciendis, libero amet corrupti vitae cum ipsam fugit
            officiis velit porro qui inventore cumque voluptas facilis?
            Voluptates animi odio deserunt.
          </p>
        </section>
        <section className="my-20 md:my-30" id="section-4">
          <h2 className="tw-heading-60 mb-10">Section 4</h2>
          <p className="tw-lead mb-8">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus,
            dolorem? Reiciendis, libero amet corrupti vitae cum ipsam fugit
            officiis velit porro qui inventore cumque voluptas facilis?
            Voluptates animi odio deserunt.
          </p>
          <p className="tw-lead mb-8">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus,
            dolorem? Reiciendis, libero amet corrupti vitae cum ipsam fugit
            officiis velit porro qui inventore cumque voluptas facilis?
            Voluptates animi odio deserunt.
          </p>
        </section>
        <section className="my-20 md:my-30" id="section-5">
          <h2 className="tw-heading-60 mb-10">Section 5</h2>
          <p className="tw-lead mb-8">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus,
            dolorem? Reiciendis, libero amet corrupti vitae cum ipsam fugit
            officiis velit porro qui inventore cumque voluptas facilis?
            Voluptates animi odio deserunt.
          </p>
          <p className="tw-lead mb-8">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus,
            dolorem? Reiciendis, libero amet corrupti vitae cum ipsam fugit
            officiis velit porro qui inventore cumque voluptas facilis?
            Voluptates animi odio deserunt.
          </p>
        </section>

        <IntraPageNav
          links={[
            { text: "Section 1", to: "#section-1" },
            { text: "Section 2", to: "#section-2" },
            { text: "Section 3", to: "#section-3" },
            { text: "Section 4", to: "#section-4" },
            { text: "Section 5", to: "#section-5" },
          ]}
        ></IntraPageNav>
      </main>
    </Layout>
  );
}

export default Page;
