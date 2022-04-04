import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Translate, { translate } from '@docusaurus/Translate';

type FeatureItem = {
  title: string;
  description: JSX.Element;
  href: string;
};

type LinkItem = {
  title: string;
  description: JSX.Element;
  href: string;
}

const FeatureList: FeatureItem[] = [
  {
    title: translate({ message: 'real web 3.0' }),
    description: (<>Dapps fully hosted on chain, serving content directly to your browser</>),
    href: 'https://wiki.internetcomputer.org/wiki/Internet_Computer_vision#Dapp_code_hosted_and_executed_on-chain'
  },
  {
    title: translate({ message: 'web speed' }),
    description: (<>TX finalized in 2 secs. State-preserving calls processed in milliseconds</>),
    href: 'https://wiki.internetcomputer.org/wiki/Internet_Computer_vision#Web_speed'
  },
  {
    title: translate({ message: 'reverse gas' }),
    description: (<>Contracts pay for their own computation; users don’t need tokens</>),
    href: 'https://wiki.internetcomputer.org/wiki/Internet_Computer_vision#Reverse_Gas_Model_.28AKA_.22canister_pays.22.29'
  },
  {
    title: translate({ message: 'less CO₂' }),
    description: (<>The environment is protected by efficiency approaching legacy tech</>),
    href: 'https://wiki.internetcomputer.org/wiki/Internet_Computer_vision#Environment_and_cost'
  },
  {
    title: translate({ message: 'internet scale' }),
    description: (<>Blockchain capacity scales at constant cost and dapps can have infinite scale</>),
    href: 'https://wiki.internetcomputer.org/wiki/Internet_Computer_vision#Network_scales_without_limit'
  },
  {
    title: translate({ message: 'actor model' }),
    description: (<>Parallelism enables scaling. Contracts are asynchronous</>),
    href: 'https://wiki.internetcomputer.org/wiki/Internet_Computer_vision#Novel_.E2.80.9Ccanister.E2.80.9D_smart_contract_framework'
  },
];

const LinkList: LinkItem[] = [
  {
    title: translate({ message: 'Sample Code' }),
    description: (<>Learn how to build on the IC by exploring samples ranging from a simple DEX, to on-chain encrypted storage, NFT minting, and a basic DAO.</>),
    href: '/docs/current/developer-docs/samples/'
  },
  {
    title: translate({ message: 'Quick Start' }),
    description: (<>Get your first dapp launched on the IC in 20 minutes.</>),
    href: '/docs/current/developer-docs/quickstart/'
  },
  {
    title: translate({ message: 'Community Forum' }),
    description: (<>Engage with the IC community to shape future features, propose new ideas, and ask questions..</>),
    href: 'https://forum.dfinity.org/'
  },
  {
    title: translate({ message: 'Wiki' }),
    description: (<>Explore concepts, the architecture and technical breakthroughs that enable the IC. Find step-by-step guides such as how to stake your tokens.</>),
    href: 'https://wiki.internetcomputer.org/wiki/Internet_Computer_wiki'
  }
]

function Feature({title, description, href}: FeatureItem) {
  return (
    <div className={clsx(styles.feature)}>
      <a href={href} style={{
        textDecoration: 'none',
        color: 'black'
      }}>
        <h3>{title.split(' ')[0]} <span className={styles.thin}>{title.split(' ').splice(1, title.length)}</span></h3>
        <p style={{
          color: 'gray',
          fontSize: '1em'
        }}>{description}</p>
      </a>
    </div>
  );
}

function Link({title, description, href}: LinkItem) {
  return (
    <div className={clsx(styles.link)}>
      <a href={href} style={{
        textDecoration: 'none',
        color: 'black'
      }}>
        <h3 style={{
          fontWeight: 'normal',
          borderBottom: '1px solid #ABB1B3',
          width: 'max-content',
        }}>{title}</h3>
        <p style={{
          color: 'gray',
          fontSize: '1em'
        }}>{description}</p>
      </a>
    </div>
  )
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <>
      <section className={styles.links}>
        <div className="container">
          <div className="row">
            {LinkList.map((props, idx) => (
              <Link key={idx} {...props} />
            ))}
          </div>
        </div>

        {/* <h1 style={{
          width: '50vw',
          fontWeight: 'normal',
          marginTop: '8rem',
          marginBottom: '3rem'
        }}>
          <Translate>
          After years of R&D, the Internet Computer blockchain is removing the limitations from smart contract software using advanced new cryptography. It scales its capacity with demand and can support unbounded volumes of smart contract computation, so that finally, dapps can scale. New “canister” smart contracts run super-fast and can even securely serve interactive web content directly to end users. On-chain costs have been crushed and are stable. Now code your contracts in any language that compiles to WebAssembly and create dapps and tokenized services for everything to chase the blockchain singularity.
          </Translate>
        </h1> */}
      </section>

      <section className={styles.features}>
        <div className="container">
          <div className="row">
            {FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
