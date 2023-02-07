/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import {
  ThemeClassNames,
} from '@docusaurus/theme-common';
import { useSidebarBreadcrumbs, useHomePageRoute } from '@docusaurus/theme-common/internal';
import styles from './styles.module.css';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl'; // TODO move to design system folder

function BreadcrumbsItemLink({ children, href }) {
  const className = clsx('breadcrumbs__link', styles.breadcrumbsItemLink);
  return href ? (<Link className={className} href={href}>
    {children}
  </Link>) : (<span className={className}>{children}</span>);
} // TODO move to design system folder

function BreadcrumbsItem({ children }) {
  return (<li
    className={clsx('breadcrumbs__item'
    )}>
    {children}
  </li>);
}

function HomeBreadcrumbItem() {
  const homeHref = useBaseUrl('/');
  return (<BreadcrumbsItem>
    <BreadcrumbsItemLink href={homeHref}>
      <div className={styles.breadcrumbsHomeIconContainer}>
        <svg width="18" height="19" viewBox="0 0 18 19" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 17H16V7.978L9 2.534L2 7.978V17H8V11H10V17ZM18 18C18 18.2652 17.8946 18.5196 17.7071 18.7071C17.5196 18.8946 17.2652 19 17 19H1C0.734784 19 0.48043 18.8946 0.292893 18.7071C0.105357 18.5196 2.4071e-07 18.2652 2.4071e-07 18V7.49C-0.000105484 7.33761 0.0346172 7.18721 0.101516 7.0503C0.168415 6.91338 0.26572 6.79356 0.386 6.7L8.386 0.477997C8.56154 0.341443 8.7776 0.267303 9 0.267303C9.2224 0.267303 9.43846 0.341443 9.614 0.477997L17.614 6.7C17.7343 6.79356 17.8316 6.91338 17.8985 7.0503C17.9654 7.18721 18.0001 7.33761 18 7.49V18V18Z"
          />
        </svg>
      </div>
    </BreadcrumbsItemLink>
  </BreadcrumbsItem>);
}

export default function DocBreadcrumbs() {
  const breadcrumbs = useSidebarBreadcrumbs();
  const homePageRoute = useHomePageRoute();

  if (!breadcrumbs) {
    return null;
  }

  return (<nav
    className={clsx(ThemeClassNames.docs.docBreadcrumbs, styles.breadcrumbsContainer,)}
    aria-label="breadcrumbs">
    <ul className="breadcrumbs">
      {homePageRoute && <HomeBreadcrumbItem/>}
      {breadcrumbs.map((item, idx) => (<BreadcrumbsItem key={idx} active={idx === breadcrumbs.length - 1}>
        <BreadcrumbsItemLink href={item.href}>
          {item.label}
        </BreadcrumbsItemLink>
      </BreadcrumbsItem>))}
    </ul>
  </nav>);
}
