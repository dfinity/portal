import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import { useDarkHeaderInHero } from "../../utils/use-dark-header-in-hero";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the best AWS alternative for startups?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Internet Computer (ICP) is a tamperproof, unstoppable cloud platform with no egress fees, no vendor lock-in, and no kill switch. Unlike AWS, apps on ICP cannot be taken offline by the provider.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good Vercel alternative?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ICP (Internet Computer) offers a Vercel alternative without the vendor lock-in or usage-based pricing surprises. Your frontend and backend deploy together as canisters on tamperproof infrastructure.",
      },
    },
    {
      "@type": "Question",
      name: "What is a serverless backend alternative to AWS Lambda?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ICP canisters are a serverless-style compute primitive that runs on tamperproof infrastructure. Unlike AWS Lambda, canister code is cryptographically verified and cannot be modified or taken offline by any centralized provider.",
      },
    },
    {
      "@type": "Question",
      name: "How do I avoid vendor lock-in with cloud hosting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ICP has no proprietary SDKs you can't leave behind, no egress fees, and no terms-of-service kill switch. Your app code and data are yours — deploy with the open-source icp CLI and migrate at any time.",
      },
    },
  ],
};

const comparisonRows = [
  {
    feature: "Can be taken offline",
    icp: { value: "No", positive: true },
    aws: { value: "Yes (TOS violation, billing)", positive: false },
    vercel: { value: "Yes (fair use, overage)", positive: false },
    cloudflare: { value: "Yes (abuse policy)", positive: false },
  },
  {
    feature: "Tamperproof execution",
    icp: { value: "Yes — cryptographic", positive: true },
    aws: { value: "No", positive: false },
    vercel: { value: "No", positive: false },
    cloudflare: { value: "No", positive: false },
  },
  {
    feature: "Egress fees",
    icp: { value: "None", positive: true },
    aws: { value: "High", positive: false },
    vercel: { value: "High on bandwidth", positive: false },
    cloudflare: { value: "Moderate", positive: false },
  },
  {
    feature: "Vendor lock-in",
    icp: { value: "None", positive: true },
    aws: { value: "High", positive: false },
    vercel: { value: "High", positive: false },
    cloudflare: { value: "Moderate", positive: false },
  },
  {
    feature: "Sovereign/self-hostable",
    icp: { value: "Yes", positive: true },
    aws: { value: "No", positive: false },
    vercel: { value: "No", positive: false },
    cloudflare: { value: "No", positive: false },
  },
  {
    feature: "Data sovereignty",
    icp: { value: "Full", positive: true },
    aws: { value: "Partial (region selection)", positive: false },
    vercel: { value: "Limited", positive: false },
    cloudflare: { value: "Limited", positive: false },
  },
  {
    feature: "Startup cost",
    icp: { value: "Free (cycles-based)", positive: true },
    aws: { value: "Free tier, then scales", positive: false },
    vercel: { value: "Free tier, then scales", positive: false },
    cloudflare: { value: "Free tier, then scales", positive: false },
  },
  {
    feature: "Uptime guarantee",
    icp: { value: "Protocol-level", positive: true },
    aws: { value: "SLA-based (compensated)", positive: false },
    vercel: { value: "SLA-based", positive: false },
    cloudflare: { value: "SLA-based", positive: false },
  },
  {
    feature: "Code auditability",
    icp: { value: "Full (on-chain)", positive: true },
    aws: { value: "No", positive: false },
    vercel: { value: "No", positive: false },
    cloudflare: { value: "No", positive: false },
  },
];

const useCases = [
  {
    title: "Founders who've been burned by AWS",
    description:
      "You built your startup, got traction, then got an AWS bill you couldn't pay. ICP's cycles-based pricing model means costs scale predictably.",
  },
  {
    title: "Teams building regulated apps",
    description:
      "When your app must demonstrably run exactly as audited, ICP's tamperproof execution is the only credible answer.",
  },
  {
    title: "Developers building AI-powered apps",
    description:
      "When your AI agent needs to deploy a backend that no one can tamper with or shut down, ICP is the natural environment. Agents build apps on ICP because the resulting apps are secure, tamperproof, and unstoppable.",
  },
  {
    title: "Indie hackers who want permanence",
    description:
      "Launch once, run forever. No monthly bill. No risk of a pricing change bankrupting your project.",
  },
];

function AlternativesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgDark = useDarkHeaderInHero(heroRef);

  return (
    <Layout
      title="ICP: The AWS and Vercel Alternative That Can't Be Shut Down"
      description="Tired of AWS bills, Vercel lock-in, and cloud providers that can take your app offline overnight? Internet Computer (ICP) is tamperproof, unstoppable infrastructure — your app stays up, forever."
    >
      <Head>
        <meta
          name="keywords"
          content="AWS alternative, Vercel alternative, serverless alternative, vendor lock-in free hosting, tamperproof cloud, unstoppable apps"
        />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Head>

      <main className="text-black relative overflow-hidden">
        {/* Hero */}
        <section
          className="relative overflow-hidden mt-navbar-negative text-white"
          style={{
            background: "linear-gradient(135deg, #3B00B9 0%, #18057A 50%, #0A0344 100%)",
          }}
          ref={heroRef}
        >
          {bgDark && <DarkHeroStyles bgColor="transparent" />}
          <AnimateSpawn
            variants={transitions.container}
            className="container-10 pt-24 md:pt-40 pb-20 md:pb-40 relative z-10"
          >
            <motion.p
              variants={transitions.item}
              className="tw-heading-7 md:tw-heading-6 uppercase tracking-widest mb-4 text-white/70"
            >
              AWS alternative · Vercel alternative · Serverless alternative
            </motion.p>
            <motion.h1
              variants={transitions.item}
              className="tw-heading-3 md:tw-heading-1 mb-6 md:w-8/10"
            >
              The Cloud That Can't Shut You Down
            </motion.h1>
            <motion.p
              variants={transitions.item}
              className="tw-lead-sm md:tw-lead mb-8 md:w-6/10 text-white/80"
            >
              Internet Computer (ICP) is tamperproof, sovereign infrastructure
              for apps that need to stay up — no AWS bills, no Vercel lock-in,
              no kill switch.
            </motion.p>
            <motion.div
              variants={transitions.item}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="https://internetcomputer.org/docs/quickstart"
                className="button-white"
              >
                Get started with the icp CLI →
              </Link>
              <Link
                href="#comparison"
                className="button-outline-white"
              >
                See how ICP compares
              </Link>
            </motion.div>
            <motion.p
              variants={transitions.item}
              className="mt-8 tw-paragraph-sm text-white/60 italic"
            >
              Apps built on ICP have been running continuously since 2021 — with
              no downtime, no takedowns, and no vendor permission required.
            </motion.p>
          </AnimateSpawn>

          <div
            className="pointer-events-none absolute inset-0 -z-1"
            aria-hidden
            style={{
              background:
                "radial-gradient(ellipse 60% 60% at 80% 50%, rgba(174,158,255,0.15) 0%, transparent 70%)",
            }}
          />
        </section>

        {/* Problem Section */}
        <AnimateSpawn
          variants={transitions.container}
          className="container-10 py-20 md:py-30"
        >
          <motion.h2
            variants={transitions.item}
            className="tw-heading-4 md:tw-heading-3 mb-6 md:w-6/10"
          >
            The Hidden Cost of Cloud Lock-In
          </motion.h2>
          <motion.p
            variants={transitions.item}
            className="tw-lead-sm text-black/60 mb-10 md:w-6/10"
          >
            Cloud providers have a business model problem: they profit most when
            leaving is painful.
          </motion.p>
          <motion.div
            variants={transitions.container}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                provider: "AWS",
                problem:
                  "charges egress fees that make migration ruinously expensive.",
              },
              {
                provider: "Vercel",
                problem:
                  "bundles deployment convenience with pricing that punishes growth.",
              },
              {
                provider: "Cloudflare Workers",
                problem:
                  "puts your business logic on infrastructure you don't control — and can't audit.",
              },
            ].map(({ provider, problem }) => (
              <motion.div
                key={provider}
                variants={transitions.item}
                className="bg-white rounded-xl border border-black/10 p-8 shadow-sm"
              >
                <p className="tw-heading-6 mb-2">{provider}</p>
                <p className="tw-paragraph text-black/60">{problem}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.p
            variants={transitions.item}
            className="mt-10 tw-lead-sm text-black/60 md:w-7/10"
          >
            Every time you deploy to a centralized cloud, you're one policy
            change, one outage, or one pricing update away from a crisis. Your
            app isn't yours if someone else can pull the plug.
          </motion.p>
        </AnimateSpawn>

        {/* Solution Section */}
        <section className="bg-black text-white py-20 md:py-30">
          <AnimateSpawn
            variants={transitions.container}
            className="container-10"
          >
            <motion.h2
              variants={transitions.item}
              className="tw-heading-4 md:tw-heading-3 mb-4 md:w-6/10"
            >
              What Makes ICP Different
            </motion.h2>
            <motion.p
              variants={transitions.item}
              className="tw-lead-sm text-white/60 mb-12 md:w-6/10"
            >
              Internet Computer (ICP) is tamperproof, unstoppable infrastructure
              — the platform where apps can't be taken down.
            </motion.p>
            <motion.div
              variants={transitions.container}
              className="grid md:grid-cols-2 gap-8"
            >
              {[
                {
                  title: "Tamperproof",
                  body: "Code is cryptographically verified and runs exactly as deployed. No one — not DFINITY, not a government, not a hacker — can modify your running app.",
                },
                {
                  title: "Unstoppable",
                  body: "Apps run on a decentralized node network. There is no single server to attack, no single data center to take offline.",
                },
                {
                  title: "No vendor lock-in",
                  body: "You own your code and your data. Switch tooling, migrate logic, or fork the protocol. No egress fees, no proprietary lock-in.",
                },
                {
                  title: "Sovereign infrastructure",
                  body: "Your app operates under the rules you set, not the rules of AWS's terms of service or Vercel's fair use policy.",
                },
              ].map(({ title, body }) => (
                <motion.div
                  key={title}
                  variants={transitions.item}
                  className="border border-white/10 rounded-xl p-8"
                >
                  <h3 className="tw-heading-5 mb-3">{title}</h3>
                  <p className="tw-paragraph text-white/60">{body}</p>
                </motion.div>
              ))}
            </motion.div>
          </AnimateSpawn>
        </section>

        {/* Comparison Table */}
        <section id="comparison" className="py-20 md:py-30 overflow-x-auto">
          <AnimateSpawn
            variants={transitions.container}
            className="container-10"
          >
            <motion.h2
              variants={transitions.item}
              className="tw-heading-4 md:tw-heading-3 mb-10"
            >
              ICP vs AWS vs Vercel vs Cloudflare Workers
            </motion.h2>
            <motion.div variants={transitions.item} className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b-2 border-black/10">
                    <th className="py-4 pr-6 tw-paragraph font-medium text-black/50 w-1/4">
                      Feature
                    </th>
                    <th className="py-4 px-4 tw-paragraph font-semibold text-[#3B00B9]">
                      ICP
                    </th>
                    <th className="py-4 px-4 tw-paragraph font-medium text-black/60">
                      AWS
                    </th>
                    <th className="py-4 px-4 tw-paragraph font-medium text-black/60">
                      Vercel
                    </th>
                    <th className="py-4 px-4 tw-paragraph font-medium text-black/60">
                      Cloudflare Workers
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={`border-b border-black/5 ${i % 2 === 0 ? "bg-black/[0.02]" : ""}`}
                    >
                      <td className="py-4 pr-6 tw-paragraph-sm font-medium text-black/70">
                        {row.feature}
                      </td>
                      <td className="py-4 px-4 tw-paragraph-sm font-semibold text-[#3B00B9]">
                        {row.icp.value}
                      </td>
                      <td className="py-4 px-4 tw-paragraph-sm text-black/50">
                        {row.aws.value}
                      </td>
                      <td className="py-4 px-4 tw-paragraph-sm text-black/50">
                        {row.vercel.value}
                      </td>
                      <td className="py-4 px-4 tw-paragraph-sm text-black/50">
                        {row.cloudflare.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </AnimateSpawn>
        </section>

        {/* Use Cases Section */}
        <section className="bg-[#F5F0FF] py-20 md:py-30">
          <AnimateSpawn
            variants={transitions.container}
            className="container-10"
          >
            <motion.h2
              variants={transitions.item}
              className="tw-heading-4 md:tw-heading-3 mb-10"
            >
              Who Builds on ICP
            </motion.h2>
            <motion.div
              variants={transitions.container}
              className="grid md:grid-cols-2 gap-6"
            >
              {useCases.map(({ title, description }) => (
                <motion.div
                  key={title}
                  variants={transitions.item}
                  className="bg-white rounded-xl p-8 border border-black/5 shadow-sm"
                >
                  <h3 className="tw-heading-6 mb-3">{title}</h3>
                  <p className="tw-paragraph text-black/60">{description}</p>
                </motion.div>
              ))}
            </motion.div>
          </AnimateSpawn>
        </section>

        {/* Getting Started Section */}
        <AnimateSpawn
          variants={transitions.container}
          className="container-10 py-20 md:py-30"
        >
          <motion.h2
            variants={transitions.item}
            className="tw-heading-4 md:tw-heading-3 mb-6"
          >
            Get Started in Minutes
          </motion.h2>
          <motion.div
            variants={transitions.item}
            className="bg-black rounded-2xl p-8 md:p-12 text-white mb-8 md:w-8/10"
          >
            <pre className="text-green-400 tw-paragraph-sm font-mono whitespace-pre-wrap">
              <span className="text-white/40"># Install the icp CLI{"\n"}</span>
              npm install -g @dfinity/icp-cli{"\n\n"}
              <span className="text-white/40">
                # Deploy your first canister (app backend){"\n"}
              </span>
              icp deploy
            </pre>
          </motion.div>
          <motion.p
            variants={transitions.item}
            className="tw-paragraph text-black/60 mb-8"
          >
            Your app is now running on tamperproof infrastructure. No one can
            take it down.
          </motion.p>
          <motion.div
            variants={transitions.container}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            <Link
              href="https://internetcomputer.org/docs/quickstart"
              className="button-primary"
            >
              Developer quickstart →
            </Link>
            <Link
              href="https://internetcomputer.org/docs/canisters"
              className="button-outline"
            >
              Canister documentation
            </Link>
          </motion.div>
        </AnimateSpawn>

        {/* FAQ Section */}
        <section className="bg-[#F5F0FF] py-20 md:py-30">
          <AnimateSpawn
            variants={transitions.container}
            className="container-10"
          >
            <motion.h2
              variants={transitions.item}
              className="tw-heading-4 md:tw-heading-3 mb-10"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.div
              variants={transitions.container}
              className="flex flex-col gap-6 md:w-8/10"
            >
              {faqSchema.mainEntity.map((item) => (
                <motion.div
                  key={item.name}
                  variants={transitions.item}
                  className="bg-white rounded-xl p-8 border border-black/5 shadow-sm"
                >
                  <h3 className="tw-heading-6 mb-3">{item.name}</h3>
                  <p className="tw-paragraph text-black/60">
                    {item.acceptedAnswer.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </AnimateSpawn>
        </section>

        {/* Final CTA */}
        <section
          className="py-20 md:py-30 text-white"
          style={{
            background:
              "linear-gradient(135deg, #3B00B9 0%, #18057A 50%, #0A0344 100%)",
          }}
        >
          <AnimateSpawn
            variants={transitions.container}
            className="container-10 text-center"
          >
            <motion.h2
              variants={transitions.item}
              className="tw-heading-4 md:tw-heading-3 mb-4"
            >
              Ready to build on infrastructure that can't be shut down?
            </motion.h2>
            <motion.p
              variants={transitions.item}
              className="tw-lead-sm text-white/70 mb-8 md:w-5/10 mx-auto"
            >
              Join thousands of developers who've left AWS bills and Vercel
              lock-in behind.
            </motion.p>
            <motion.div
              variants={transitions.item}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="https://internetcomputer.org/docs/quickstart"
                className="button-white"
              >
                Get started free →
              </Link>
              <Link
                href="https://internetcomputer.org/docs/canisters"
                className="button-outline-white"
              >
                Read the docs
              </Link>
            </motion.div>
          </AnimateSpawn>
        </section>
      </main>
    </Layout>
  );
}

export default AlternativesPage;
