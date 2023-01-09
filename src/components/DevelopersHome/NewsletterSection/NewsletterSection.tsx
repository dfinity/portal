import React from "react";
import Newsletter from "../../Common/Newsletter/Newsletter";

const NewsletterSection: React.FC = () => {
  return (
    <section className="">
      <Newsletter
        fields={[
          {
            name: "EMAIL",
            placeholder: "Email",
            type: "email",
            required: true,
          },
        ]}
        ctaLabel="Get updates!"
        postUrl="https://dfinity.us16.list-manage.com/subscribe/post?u=33c727489e01ff5b6e1fb6cc6&amp;id=7e9469a315"
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
