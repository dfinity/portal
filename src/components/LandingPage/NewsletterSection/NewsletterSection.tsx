import React from "react";
import Newsletter from "../../Common/Newsletter/Newsletter";

const NewsletterSection: React.FC = () => {
  return (
    <section className="md:mt-30 ">
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
        decoration={<img src="/img/newsletter/email-image-2.webp" />}
        className="mb-20 relative"
      >
        <div className="hidden md:block blob blob-infinite blob-md blob-top-right z-[-1]"></div>
        <h2 className="text-white tw-heading-5 md:tw-heading-4 mb-6 md:mb-8 md:pr-10">
          Sign up for email updates{" "}
          <span className="text-white-60">
            to keep up to date with the Internet Computer
          </span>
        </h2>
      </Newsletter>
    </section>
  );
};

export default NewsletterSection;
