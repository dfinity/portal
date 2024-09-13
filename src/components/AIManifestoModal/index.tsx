import Link from "@docusaurus/Link";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const principles = [
  {
    number: "01",
    title: "DeAI Is Safe AI",
    description:
      "DeAI prioritizes user safety by implementing robust security measures and rigorous testing protocols to minimize the risk of unintended consequences or malicious exploitation.",
  },
  {
    number: "02",
    title: "DeAI Is Accessible AI",
    description:
      "DeAI makes advanced AI available to all and aims to maximize contributions to a prosperous future for all beings on the planet.",
  },
  {
    number: "03",
    title: "DeAI Is Self-Sovereign AI",
    description:
      "Users should have complete control over their AI. Your AI should work for you, reflect your values and serve your needs without external interference.",
  },
  {
    number: "04",
    title: "DeAI Is Secure AI",
    description:
      "Privacy is a guarantee, not just a feature. DeAI ensures your data remains your own, safe from prying eyes and misuse.",
  },
  {
    number: "05",
    title: "DeAI Is Participatory AI",
    description:
      "By allowing open contributions and attributing the created value back to the owner, DeAI enables everyone to participate in shaping the AI revolution and benefiting from it.",
  },
  {
    number: "06",
    title: "DeAI is Responsible AI",
    description:
      "User empowerment and respecting stakeholders' best interests are topmost priorities for DeAI. This includes best efforts to be resource-efficient and deliver sustainable solutions.",
  },
  {
    number: "07",
    title: "DeAI Is Verifiable AI",
    description:
      "The open-source nature of DeAI allows anyone to inspect the underlying code and algorithms for transparency in how the AI functions. By enabling thorough inspection and verification, DeAI systems promote accountability to identify and rectify errors or biases in the AI's behavior.",
  },
];

interface ManifestoPrincipleProps {
  number: string;
  title: string;
  description: string;
}

const ManifestoPrinciple: React.FC<ManifestoPrincipleProps> = ({
  number,
  title,
  description,
}) => {
  return (
    <section className="flex flex-col w-full md:max-w-[660px] mt-20 md:mt-10 md:self-center tw-lead md:tw-lead-lg">
      <div className="flex items-start gap-3">
        <span className="text-white/30">{number}</span>
        <h2 className="text-white">{title}</h2>
      </div>
      <p className="text-white mt-3 tw-lead-sm">{description}</p>
    </section>
  );
};

const AIManifestoModal: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const overlayRef = useRef<HTMLDivElement>();

  return (
    <motion.div
      className="fixed inset-0 overflow-auto z-[2000] bg-[#0C0025]/90 backdrop-blur-lg overflow-x-hidden"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={overlayRef}
    >
      <div className="fixed inset-0"></div>
      <div
        className="relative container-10 px-6 py-12 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="float-right pointer-events-none sticky top-8 md:top-20 z-10 md:pr-8">
          <button
            className="pointer-events-auto flex w-12 h-12 rounded-full border-none bg-[#181818] justify-center items-center"
            onClick={onClose}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="30"
                height="30"
                rx="15"
                fill="#181818"
                fillOpacity="0.6"
              />
              <path d="M9.34277 9.34375L20.6565 20.6575" stroke="white" />
              <path d="M9.34277 20.6572L20.6565 9.34352" stroke="white" />
            </svg>
          </button>
        </div>
        <div className="md:top-20 z-10 pr-0 md:pr-8 ">
          {" "}
          <div className="flex flex-col py-6 ">
            <section className="md:self-center flex flex-col md:max-w-[660px] mt-[92px] md:mt-[40px] font-circular font-book text-white">
              <h1 className="tw-title-sm md:tw-title-lg">
                Manifesto for Decentralized AI (DeAI)
              </h1>
              <p className="tw-lead-sm md:tw-lead mt-6">
                In an era where Artificial Intelligence (AI) is increasingly
                central to our daily lives, the power and control over these
                transformative technologies must not be confined to a few
                centralized entities. We envision a future where AI is
                democratized, broadly empowering, and aligned with the needs and
                values of all users. This manifesto lays out the principles and
                reasons for decentralizing AI and advocating for a fair,
                transparent, and user-centric AI ecosystem.
              </p>
            </section>
            {principles.map((principle, index) => (
              <ManifestoPrinciple
                key={index}
                number={principle.number}
                title={principle.title}
                description={principle.description}
              />
            ))}
            <section className="md:self-center flex flex-col md:max-w-[660px] mt-20 md:mt-10">
              <p className="text-white tw-lead-sm md:tw-lead">
                Join us in the movement towards Decentralized AI. Together, we
                can create an AI ecosystem that works for everyone and provides
                control, privacy, and fairness in the AI technologies that shape
                our lives.
              </p>
            </section>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AIManifestoModal;
