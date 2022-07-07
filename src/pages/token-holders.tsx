import React, { useEffect } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import ChevronRight from "../../static/img/token-holders/chevron-right.svg";
import HeroBg from "../../static/img/token-holders/hero-bg.svg";
import ExternalLinkIcon from "../../static/img/external-link.svg";

const images = [
  {
    url: require("../../static/img/token-holders/logos/Img-01.png").default,
    class:
      "w-9 right-[-1%] bottom-[100px] md:w-15 md:right-[12px] md:top-[657px]",
  },
  {
    url: require("../../static/img/token-holders/logos/Img-02.png").default,
    class: "w-9 left-[35%] top-0 md:w-15 md:left-[234px] md:top-[43px]",
  },
  {
    url: require("../../static/img/token-holders/logos/Img-03.png").default,
    class: "hidden md:block w-9 md:w-15 md:left-[133px] md:top-[567px]",
  },
  {
    url: require("../../static/img/token-holders/logos/Img-04.png").default,
    class: "hidden md:block w-9 md:w-15 md:left-[58px] md:top-[190px]",
  },
  {
    url: require("../../static/img/token-holders/logos/Img-05.png").default,
    class: "hidden md:block w-9 md:w-15 md:right-[-10px] md:top-[250px]",
  },
  {
    url: require("../../static/img/token-holders/logos/Img-06.png").default,
    class:
      "w-12 right-[40%] top-[239px] md:w-20 md:right-[550px] md:top-[290px]",
  },
  {
    url: require("../../static/img/token-holders/logos/Img-06-1.png").default,
    class:
      "w-12 right-[30%] bottom-[40px] md:w-20 md:right-[370px] md:top-[1060px]",
  },
  {
    url: require("../../static/img/token-holders/logos/Img-07.png").default,
    class: "w-12 left-[30%] top-[155px] md:w-20 md:left-[610px] md:top-[80px]",
  },
  {
    url: require("../../static/img/token-holders/logos/Img-08.png").default,
    class: "w-12 left-[-1%] top-[241px] md:w-20 md:left-[194px] md:top-[371px]",
  },
  {
    url: require("../../static/img/token-holders/logos/Img-09.png").default,
    class:
      "w-12 left-[-5%] bottom-[10px] md:w-20 md:left-[161px] md:top-[1033px]",
  },
  {
    url: require("../../static/img/token-holders/logos/Img-10.png").default,
    class: "w-12 right-[-3%] top-[67px] md:w-20 md:right-[490px] md:top-[33px]",
  },
  {
    url: require("../../static/img/token-holders/logos/Img-11.png").default,
    class:
      "w-12 right-[5%] top-[280px] md:w-20 md:right-[110px] md:top-[442px]",
  },
  {
    url: require("../../static/img/token-holders/logos/Img-12.png").default,
    class:
      "w-16 left-[30%] bottom-[90px] md:w-30 md:left-auto md:right-[110px] md:top-[1078px]",
  },
  {
    url: require("../../static/img/token-holders/logos/Img-13.png").default,
    class: "hidden md:block w-16 md:w-30 md:right-[30px] md:top-[0px]",
  },
  {
    url: require("../../static/img/token-holders/logos/Img-14.png").default,
    class:
      "w-16 right-[10%] top-[152px] md:w-30 md:right-[320px] md:top-[160px]",
  },
  {
    url: require("../../static/img/token-holders/logos/Img-15.png").default,
    class: "w-16 left-[10%] top-[80px] md:w-30 md:left-[450px] md:top-[211px]",
  },
  {
    url: require("../../static/img/token-holders/logos/Img-16.png").default,
    class: "hidden md:block w-16 md:w-30 md:left-[-27px] md:top-[838px]",
  },
];

function TokenHolders(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--ifm-color-primary",
      "#3b00b9"
    );
  }, []);
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <main className="text-black relative">
        <section className="max-w-page relative px-6 pt-12 mb-12 md:mb-36 md:px-12.5 md:mx-auto  md:pt-48 overflow-hidden">
          <div className=" md:w-7/10 lg:w-6/10 md:ml-1/12">
            <h1 className="text-heading-3 md:text-heading-2 mb-8">
              The ICP Token
            </h1>
            <p className="text-paragraph-sm md:text-paragraph-lg mb-0">
              Learn about the ICP token, how to stake and get involved in the
              governance of the Internet Computer. See how ICP can be converted
              to the cycles which are used for computation.
            </p>
          </div>
        </section>

        <section className="max-w-page pt-[354px] md:pt-[467px] px-6 relative md:mx-auto">
          {images.map((img) => (
            <img
              src={img.url}
              className={`absolute z-0 ${img.class}`}
              alt=""
              key={img.url}
            />
          ))}
          <div className="md:w-6/12 mx-auto text-center mb-12 md:mb-20 relative z-10">
            <h2 className="text-[32px] leading-[42px] md:text-[60px] md:leading-[70px] mb-2 md:mb-8">
              Get &amp; Store tokens
            </h2>
            <p className="text-paragraph-sm md:text-paragraph-lg mb-0">
              Maecenas faucibus mollis interdum. Fusce dapibus, tellus ac cursus
              commodo, tortor mauris condimentum nibh, ut fermentum massa justo
              sit amet risus. Vivamus sagittis lacus vel augue laoreet auctor.
            </p>
          </div>
          <div className="md:w-10/12 mx-auto grid grid-cols-1 sm:grid-cols-2 gap-2 pb-44 md:pb-80 relative z-10">
            <a className="flex pl-8 py-6 md:py-0 md:pl-12 pr-8 gap-2 relative bg-white md:h-48 items-center rounded-xl border-0 border-b-[5px] border-green border-solid">
              <div className="flex-1">
                <h3 className="text-heading-4 text-infinite">
                  Centralized exchanges
                </h3>
                <p className="text-paragraph-xs text-black mb-0">
                  Exchanges are businesses that let you buy crypto using
                  traditional currencies. They have custody over any ETH you buy
                  until you send it to a wallet you control.
                </p>
              </div>
              <ChevronRight className=""></ChevronRight>
            </a>
            <a className="flex pl-8 py-6 md:py-0 md:pl-12 pr-8 gap-2 relative bg-white md:h-48 items-center rounded-xl border-0 border-b-[5px] border-infinite border-solid">
              <div className="flex-1">
                <h3 className="text-heading-4 text-infinite">Wallets</h3>
                <p className="text-paragraph-xs text-black">
                  If you want to store tokens, nfts, or connect to dapps on the
                  IC, there are a number of wallets and self-custody options.
                </p>
              </div>
              <ChevronRight className=""></ChevronRight>
            </a>
          </div>
        </section>
        <HeroBg className="absolute w-[800px] -right-[300px] top-[-350px] md:w-auto  md:right-[-650px] xl:left-1/2 translate-x-[200px] md:top-[-200px]"></HeroBg>
        <section className="max-w-page md:mx-auto px-6  md:px-12.5 pt-12">
          <div className="md:mx-auto md:w-8/12 text-center mb-40 md:mb-28">
            <h2
              className="text-heading-3 md:text-heading-2 mb-8 text-transparent bg-clip-text px-3 "
              style={{
                backgroundImage:
                  "linear-gradient(108.55deg, #3B00B9 0%, #18D0B5 149.76%)",
              }}
            >
              What can you do with the ICP token?
            </h2>
            <p className="text-paragraph-sm md:text-paragraph-lg mb-0 max-w-2xl mx-auto">
              Internet Computer (ICP) is a utility token that allows users to
              participate in and govern the Internet Computer blockchain
              network.
            </p>
          </div>
          <div className="md:mx-auto md:w-10/12 md:mt-40 flex gap-1/10 flex-col md:flex-row">
            <div className="flex-[4] md:pr-10">
              <h3 className="text-heading-3 max-w-">
                Convert ICP into cycles to pay for computation
              </h3>
              <div className="text-paragraph">
                <p>
                  Canister smart contracts burn Cycles as they operate.
                  Maintainers need to regularly top up their Cycle balance in
                  order to keep dapps running.
                </p>
                <p>
                  You can buy Cycles for ICP, but the price is stable - it
                  doesn't depend on ICP price.
                </p>
                <p className="mb-3 mt-8">
                  <a
                    href="https://faucet.dfinity.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-paragraph hover:text-black hover:underline leading-[26px] font-bold inline-flex gap-2"
                  >
                    Get free cycles
                    <ExternalLinkIcon></ExternalLinkIcon>
                  </a>
                </p>
                <p className="mb-0">
                  <a
                    href="https://nns.ic0.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-paragraph hover:text-black hover:underline leading-[26px] font-bold inline-flex gap-2"
                  >
                    Check out NNS dApp
                    <ExternalLinkIcon></ExternalLinkIcon>
                  </a>
                </p>
              </div>
            </div>
            <div className="flex-[5] self-center">
              <h4 className="text-black-60 text-center mb-12 ">
                What 10$ worth of cycles can cover?
              </h4>
              <div className="flex gap-5">
                <div className="bg-infinite p-6 rounded-xl relative">
                  <span className="text-lead absolute -top-4 left-6 bg-white py-1 px-3 rounded-full">
                    ~10 years
                  </span>
                  <p className="text-white text-paragraph-lg mb-0">
                    Hosting a 200MB static website bundle
                  </p>
                </div>
                <div className="bg-infinite p-6 rounded-xl relative">
                  <span className="text-lead absolute -top-4 left-6 bg-white py-1 px-3 rounded-full">
                    1 year
                  </span>
                  <p className="text-white text-paragraph-lg mb-0">
                    Storing a full NFT collection of 10,000 NFTs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default TokenHolders;
