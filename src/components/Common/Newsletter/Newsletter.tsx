import React from "react";
import AnimateSpawn from "../AnimateSpawn";
import transitions from "@site/static/transitions.json";
import clsx from "clsx";

export type Field = {
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
};

const Newsletter: React.FC<{
  postUrl: string;
  ctaLabel: string;
  fields: Field[];
  children: React.ReactNode;
  decoration: React.ReactNode;
  className?: string;
}> = ({ postUrl, ctaLabel, children, decoration, fields, className }) => {
  return (
    <AnimateSpawn
      className={clsx("container-12", className)}
      variants={transitions.container}
    >
      <div className="rounded-xl md:rounded-[32px] bg-gradient-100 from-[#3B00B9] to-[#2586B6DE]">
        <div className="px-6 md:px-0 md:mx-1/12 pb-16 md:pb-0 flex flex-col gap-6 md:flex-row md:items-center">
          <div className="relative bottom-10 w-52 mx-auto flex md:order-2 md:w-auto md:flex-[4] md:gap-0 md:bottom-12 md:mx-0 md:self-start">
            {decoration}
          </div>

          <div className="-mt-12 md:mt-20 md:mb-20 md:order-1 md:flex-[6]">
            {children}

            <form
              className="space-y-6 md:max-w-[66%]"
              method="post"
              action={postUrl}
            >
              {fields.map((field) => (
                <input
                  key={field.name}
                  placeholder={field.placeholder}
                  name={field.name}
                  type={field.type}
                  className="input-text input-text-white w-full"
                  required={!!field.required}
                  value={field.value}
                />
              ))}
              <button type="submit" className="button-white">
                {ctaLabel}
              </button>
            </form>
          </div>
        </div>
      </div>
    </AnimateSpawn>
  );
};

export default Newsletter;
