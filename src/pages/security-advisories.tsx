import Link from "@docusaurus/Link";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import React from "react";
import AnimateSpawn from "../components/Common/AnimateSpawn";

const cveData = [
  {
    cve: "CVE-2023-6245",
    description:
      "Candid infinite decoding loop through specially crafted payload",
    reference: "https://github.com/advisories/GHSA-7787-p7x6-fq3j",
    products: "candid (Rust)",
    versions: ">= 0.9.0, < 0.9.10",
    cvss: "High (7.5/10)",
    issued: "Dec 8, 2023",
  },
  {
    cve: "CVE-2024-1631",
    description:
      "agent-js: Insecure Key Generation in `Ed25519KeyIdentity.generate`",
    reference: "https://github.com/advisories/GHSA-c9vv-fhgv-cjc3",
    products: "@dfinity/auth-client (npm) @dfinity/identity (npm)",
    versions: ">= 0.20.0-beta.0, < 1.0.1",
    cvss: "Critical (9.1/10)",
    issued: "Feb 21, 2024",
  },
  {
    cve: "CVE-2024-4435",
    description:
      "Stable BTreeMap memory leak when deallocating nodes with overflows",
    reference:
      "https://github.com/advisories/GHSA-3rcq-39xp-7xjp",
    products: "ic-stable-structures (Rust)",
    versions: ">= 0.6.0, < 0.6.4",
    cvss: "Medium (5.9/10)",
    issued: "May 21, 2024",
  },
  {
    cve: "CVE-2024-7884",
    description:
      "Memory leak when calling a canister method via ic_cdk::call",
    reference:
      "https://github.com/advisories/GHSA-rwq6-crjg-9cpw",
    products: "ic-cdk (Rust)",
    versions: ">= 0.8.0, < 0.8.2; >= 0.9.0, < 0.9.3; >= 0.10.0, < 0.10.1; >= 0.11.0, < 0.11.5; >= 0.12.0, < 0.12.2; >= 0.13.0, < 0.13.4; >= 0.14.0, < 0.14.1; >= 0.15.0, < 0.15.1",
    cvss: "High (7.5/10)",
    issued: "Sep 05, 2024",
  },
  {
    cve: "CVE-2024-11991",
    description:
      "Uninitialized memory access in Motoko incremental garbage collector",
    reference:
      "https://github.com/dfinity/motoko/security/advisories/GHSA-9rhg-3qf8-hrv3",
    products: "moc (OCaml)",
    versions: ">= 0.9.0, < 0.13.4",
    cvss: "Medium (5.6/10)",
    issued: "Dec 09, 2024",
  },
];

const TableCell = ({ children }) => (
  <td className="border border-black p-2">{children}</td>
);

function CVEPage(): JSX.Element {
  return (
    <Layout
      title="Security Advisories"
      description="The following security advisories are related to the Internet Computer Protocol."
      wrapperClassName="overflow-hidden"
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <main className="text-black relative min-h-[400px]">
        <AnimateSpawn variants={transitions.container}>
          <section className="container-10 relative px-6 pt-20 mb-20 md:mb-40 md:px-12.5 md:mx-auto md:pt-40">
            <h1 className="tw-heading-3 md:tw-heading-2 mb-10">
              Security Advisories
            </h1>

            <p className="tw-lead-sm md:tw-lead mb-6">
              The following security advisories are related to the Internet
              Computer Protocol.
            </p>

            <table className="w-full border border-black border-collapse">
              <thead>
                <tr>
                  {[
                    "CVE",
                    "Brief description",
                    "Reference",
                    "Affected products",
                    "Affected versions",
                    "CVSS 3.1",
                    "Issued on",
                  ].map((header) => (
                    <th key={header} className="border border-black p-2">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cveData.map(
                  ({
                    cve,
                    description,
                    reference,
                    products,
                    versions,
                    cvss,
                    issued,
                  }) => (
                    <tr key={cve}>
                      <TableCell>
                        <Link
                          to={`https://cve.mitre.org/cgi-bin/cvename.cgi?name=${cve}`}
                        >
                          {cve}
                        </Link>
                      </TableCell>
                      <TableCell>{description}</TableCell>
                      <TableCell>
                        <Link to={reference}>Advisory</Link>
                      </TableCell>
                      <TableCell>{products}</TableCell>
                      <TableCell>{versions}</TableCell>
                      <TableCell>{cvss}</TableCell>
                      <TableCell>{issued}</TableCell>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </section>
        </AnimateSpawn>
      </main>
    </Layout>
  );
}

export default CVEPage;
