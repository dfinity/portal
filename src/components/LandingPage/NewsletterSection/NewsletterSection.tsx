import React from "react";
import Newsletter from "../../Common/Newsletter/Newsletter";

const NewsletterSection: React.FC = () => {
  return (
    <section className="mt-30 mb-20  md:mt-52 md:mb-30 " id="subscribe">
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
        postUrl="https://dfinity.us16.list-manage.com/subscribe/post?u=33c727489e01ff5b6e1fb6cc6&amp;id=7e9469a315&amp;f_id=00bac2e1f0"
        decoration={
          <img src="/img/newsletter/email-image-2.webp" alt="" loading="lazy" />
        }
        className="mb-20 relative"
      >
        <div className="hidden md:block blob blob-infinite blob-lg blob-top-right z-[-1]"></div>
        <h2 className="text-white tw-heading-5 md:tw-heading-4 mb-6 md:mb-8 md:pr-10">
          Sign up{" "}
          <span className="text-white-60">
            to stay in the loop with the Internet Computer
          </span>
        </h2>
      </Newsletter>
    </section>
  );
};

export default NewsletterSection;
