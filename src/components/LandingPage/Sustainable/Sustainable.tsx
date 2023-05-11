import React, { ReactNode } from "react";
import AnimateSpawn from "../../Common/AnimateSpawn";
import transitions from "@site/static/transitions.json";
import Link from "@docusaurus/Link";

const Sustainable: React.FC<{ id?: string; children: ReactNode }> = ({
  id = "sustainable",
  children,
}) => {
  return (
    <section className="md:container-12 py-20 md:pt-40 md:pb-30" id={id}>
      <AnimateSpawn className="" variants={transitions.container}>
        <div
          className="flex flex-col md:flex-row py-20 md:py-30 md:rounded-[32px] px-6 md:px-1/12 text-white"
          style={{
            background: `linear-gradient(77.94deg, #357095 -9.34%, #348B8D 21.93%, #39B392 48.29%, #4BA89C 75.1%, #348B8D 90.37%, #357195 108.5%)`,
          }}
        >
          <div className="flex-1 mb-10 md:mb-0 md:order-2">
            <img
              src="/img/home/sustainability-card.webp"
              alt=""
              loading="lazy"
              className="w-full max-w-none"
            />
          </div>
          <div className="flex-1 md:order-1">{children}</div>
        </div>
      </AnimateSpawn>
    </section>
  );
};

export default Sustainable;
