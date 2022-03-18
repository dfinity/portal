import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Translate, { translate } from '@docusaurus/Translate';

type FeatureItem = {
  title: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: translate({ message: 'real web 3.0' }),
    description: (<>Blockchain is end-to-end, now contracts can serve interactive web content</>),
  },
  {
    title: translate({ message: 'internet speed' }),
    description: (<>TX finalized in 2 secs. State-preserving calls processed in milliseconds</>),
  },
  {
    title: translate({ message: 'internet scale' }),
    description: (<>Blockchain capacity scales at constant cost and dapps can have infinite scale</>),
  },
  {
    title: translate({ message: 'less CO₂' }),
    description: (<>The environment is protected by efficiency approaching legacy tech</>),
  },
  {
    title: translate({ message: 'internet identity' }),
    description: (<>Secure authentication w/o friction via user devices (applies WebAuthn)</>),
  },
  {
    title: translate({ message: 'reverse gas' }),
    description: (<>Contracts pay for their own computation; users don’t need tokens</>),
  },
  {
    title: translate({ message: 'orthogonal persistence' }),
    description: (<>Data persists automatically in variables and data types as memory persists</>),
  },
  {
    title: translate({ message: 'less gas' }),
    description: (<>Science drives gas costs millions of times lower, and keeps them stable</>),
  },
  {
    title: translate({ message: 'actor model' }),
    description: (<>Parallelism enables scaling. Contracts are asynchronous</>),
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--3')}>
      <div className="text--center padding-horiz--md">
        <h3>{title.split(' ')[0]} <span className={styles.thin}>{title.split(' ').splice(1, title.length)}</span></h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
