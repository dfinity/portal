import React from 'react';
import Layout from '@theme-original/DocItem/Layout';
import { useLocation } from '@docusaurus/router';

const DfxDeprecationBanner = () => (
  <div
    style={{
      background: '#fff3cd',
      border: '1px solid #ffc107',
      borderRadius: '4px',
      padding: '12px 16px',
      marginBottom: '16px',
      fontSize: '14px',
      lineHeight: '1.5',
    }}
  >
    <strong>⚠️ Heads up:</strong> <code>dfx</code> is the legacy CLI.{' '}
    New projects should use the{' '}
    <a href="https://cli.internetcomputer.org"><strong>icp CLI</strong></a>{' '}
    instead.{' '}
    <a href="https://cli.internetcomputer.org/docs/migration">
      View the dfx → icp migration guide →
    </a>
  </div>
);

export default function LayoutWrapper(props) {
  const { pathname } = useLocation();
  const isDfxPage = pathname.includes('/developer-tools/dfx');

  return (
    <>
      {isDfxPage && <DfxDeprecationBanner />}
      <Layout {...props} />
    </>
  );
}
