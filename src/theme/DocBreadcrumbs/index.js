/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import {
    ThemeClassNames, useSidebarBreadcrumbs, useHomePageRoute,
} from '@docusaurus/theme-common';
import styles from './styles.module.css';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl'; // TODO move to design system folder

function BreadcrumbsItemLink({children, href}) {
    const className = clsx('breadcrumbs__link', styles.breadcrumbsItemLink);
    return href ? (<Link className={className} href={href}>
        {children}
    </Link>) : (<span className={className}>{children}</span>);
} // TODO move to design system folder

function BreadcrumbsItem({children}) {
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
            <div className={styles.breadcrumbsHomeIconContainer}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" strokeWidth={2} width="2em" height="2em">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
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
