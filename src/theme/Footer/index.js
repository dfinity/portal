/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useThemeConfig} from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import isInternalUrl from '@docusaurus/isInternalUrl';
import styles from './styles.module.css';
import IconExternalLink from '@theme/IconExternalLink';

function FooterLink({to, href, label, prependBaseUrlToHref, ...props}) {
    const toUrl = useBaseUrl(to);
    const normalizedHref = useBaseUrl(href, {
        forcePrependBaseUrl: true,
    });
    return (
        <Link
            className="footer__link-item"
            style={{
                color: '#3B00B9',
                fontWeight: 'bold',
            }}
            {...(href
                ? {
                    href: prependBaseUrlToHref ? normalizedHref : href,
                }
                : {
                    to: toUrl,
                })}
            {...props}>
            {href && !isInternalUrl(href) ? (
                <span>
          {label}
                    <IconExternalLink/>
        </span>
            ) : (
                label
            )}
        </Link>
    );
}

function Footer() {
    const {footer} = useThemeConfig();
    const {copyright, links = []} = footer || {};

    if (!footer) {
        return null;
    }

    const mediaLinks = links.filter(link => link.title === 'SocialMedia').map(link => link.items)[0];
    const nonMediaLinks = links.filter(link => link.title !== 'SocialMedia');
    return (<div className={styles.container}>
            <footer
                className={clsx('footer', {'footer--dark': footer.style === 'dark',})}
                style={{backgroundColor: 'transparent'}}
            >
                <svg className={styles.BGCircle} viewBox="0 0 10 10"
                     xmlns="http://www.w3.org/2000/svg">
                    <circle fill="#3B00B9" cx="5" cy="5" r="5"/>
                </svg>
                <div className={styles.footerLinksContainer}>
                    {nonMediaLinks.map((linkItem, i) => (
                        <div key={i} className={styles.footerLinkCol}>
                            {linkItem.items.map((item) =>
                                <p key={item.href || item.to} className={styles.footerLink}>
                                    <FooterLink {...item} />
                                </p>
                            )}
                        </div>
                    ))}
                </div>
                <div className={styles.footerBottom}>
                    <div className={styles.legalContainer}>
                        {copyright ? (
                            <div className={styles.legalCopyright}
                                // Developer provided the HTML, so assume it's safe.
                                // eslint-disable-next-line react/no-danger
                                 dangerouslySetInnerHTML={{
                                     __html: copyright,
                                 }}
                            />
                        ) : null}
                        <div className={styles.legalLink}>
                            <Link style={{color: '#3B00B9', fontWeight: 'bold'}} to={"/"}>
                                Terms & Conditions
                            </Link>
                        </div>
                        <div className={styles.legalLink}>
                            <Link style={{color: '#3B00B9', fontWeight: 'bold',}} to={"/"}>
                                Cookies Policies
                            </Link>
                        </div>
                    </div>
                    <div className={styles.mediaLinksContainer}>
                        {mediaLinks.map((item) =>
                            <div key={item.href || item.to} className={styles.mediaLinks}>
                                <Link to={item.to}><img src={item.icon} alt=""/></Link>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.footerPadding}/>

            </footer>
        </div>
    )
        ;
}

export default React.memo(Footer);
