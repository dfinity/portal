import React from "react";
import Newsletter from "../../Common/Newsletter/Newsletter";

const NewsletterSection: React.FC = () => {
  return (
    <section className="" id="subscribe">
      <Newsletter
        fields={[
          {
            name: "EMAIL",
            placeholder: "Email",
            type: "email",
            required: true,
          },
          {
            name: "tags",
            type: "hidden",
            value: "1065",
          },
        ]}
        ctaLabel="Get updates!"
        postUrl="https://dfinity.us16.list-manage.com/subscribe/post?u=33c727489e01ff5b6e1fb6cc6&id=2117910e55&f_id=0052c2e1f0"
        decoration={<img src="/img/newsletter/email-image-3.webp" />}
        className="my-20 md:my-52"
      >
        <h2 className="text-white tw-heading-5 md:tw-heading-4 mb-6 md:mb-8 md:pr-10">
          <span className="text-white-60">
            Build Dapps fully on chain with the Internet Computer.
          </span>{" "}
          Get developer updates to learn more.
        </h2>
      </Newsletter>
    </section>
  );
};

export default NewsletterSection;
