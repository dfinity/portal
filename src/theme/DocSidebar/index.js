/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import {
    useThemeConfig, useAnnouncementBar, MobileSecondaryMenuFiller, ThemeClassNames, useScrollPosition, useWindowSize,
} from '@docusaurus/theme-common';
import Logo from '@theme/Logo';
import IconArrow from '@theme/IconArrow';
import {translate} from '@docusaurus/Translate';
import DocSidebarItems from '@theme/DocSidebarItems';
import styles from './styles.module.css';
import NavbarItem from '@theme/NavbarItem';

function useShowAnnouncementBar() {
    const {isActive} = useAnnouncementBar();
    const [showAnnouncementBar, setShowAnnouncementBar] = useState(isActive);
    useScrollPosition(({scrollY}) => {
        if (isActive) {
            setShowAnnouncementBar(scrollY === 0);
        }
    }, [isActive],);
    return isActive && showAnnouncementBar;
}

function HideableSidebarButton({onClick}) {
    return (<button
        type="button"
        title={translate({
            id: 'theme.docs.sidebar.collapseButtonTitle',
            message: 'Collapse sidebar',
            description: 'The title attribute for collapse button of doc sidebar',
        })}
        aria-label={translate({
            id: 'theme.docs.sidebar.collapseButtonAriaLabel',
            message: 'Collapse sidebar',
            description: 'The title attribute for collapse button of doc sidebar',
        })}
        className={clsx('button button--secondary button--outline', styles.collapseSidebarButton,)}
        onClick={onClick}>
        <IconArrow className={styles.collapseSidebarButtonIcon}/>
    </button>);
}


function getPrimaryColor(section) {
    switch (section) {
        case 'developer-docs':
            return "#ED1E79"
        case 'concepts':
            return "#F15A24"
        case 'references':
            return "#29ABE2"
        case 'governance':
            return "#FBB03B"
        case 'showcases':
            return "#522785"
        default:
            return "#29ABE2"
    }
}

function changePrimaryColor(section) {
    document.documentElement.style.setProperty('--ifm-color-primary', getPrimaryColor(section));
}

function DocItem(sidebarId, activePath) {
    switch (sidebarId) {
        case 'developer-docs':
            return <svg xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke={sidebarId === activePath ? getPrimaryColor(activePath) : 'currentColor'}
                        viewBox="0 0 24 24"
                        strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
        case 'references':
            return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        fill="none"
                        stroke={sidebarId === activePath ? getPrimaryColor(activePath) : 'currentColor'}
                        strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"/>
            </svg>
        case 'concepts':
            return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        fill="none"
                        stroke={sidebarId === activePath ? getPrimaryColor(activePath) : 'currentColor'} strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
        case 'governance':
            return <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                        stroke={sidebarId === activePath ? getPrimaryColor(activePath) : 'currentColor'} viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        case 'showcases':
            return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                        fill={sidebarId === activePath ? getPrimaryColor(activePath) : 'currentColor'}>
                <path fillRule="evenodd"
                      d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"/>
            </svg>

        default:
            return <div/>
    }
}


function DocSideBarNav({activePath}) {
    const items = useThemeConfig().navbar.items;
    return (
        <div>
            {items.map((item, i) =>
                (item.type === 'docSidebar' && item.position === 'left' &&
                    <div key={i} className={clsx(styles.sideBarNavItem)}
                    >
                        <div className={clsx(styles.sideBarNavIcon)}>
                            {DocItem(item.sidebarId, activePath)}
                        </div>
                        <div>
                            <NavbarItem {...item}/>
                        </div>
                    </div>))}
        </div>
    );
}


function DocSidebarDesktop({path, sidebar, onCollapse, isHidden}) {
    const showAnnouncementBar = useShowAnnouncementBar();
    const {
        navbar: {hideOnScroll}, hideableSidebar,
    } = useThemeConfig();

    useEffect(() => {
        // changing primary color based on current section
        changePrimaryColor(path.split('/')[3]);
    }, [path]);

    return (<div
        className={clsx(styles.sidebar, {
            [styles.sidebarWithHideableNavbar]: hideOnScroll, [styles.sidebarHidden]: isHidden,
        })}>
        {hideOnScroll && <Logo tabIndex={-1} className={styles.sidebarLogo}/>}
        <nav
            className={clsx('menu thin-scrollbar', styles.menu, {
                [styles.menuWithAnnouncementBar]: showAnnouncementBar,
            })}>
            <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
                <DocSideBarNav activePath={path.split('/')[3]}/>
                <div className={clsx(styles.sideBarDivider)}/>
                <DocSidebarItems items={sidebar} activePath={path} level={1}/>
            </ul>
        </nav>
        {hideableSidebar && <HideableSidebarButton onClick={onCollapse}/>}
    </div>);
} // eslint-disable-next-line react/function-component-definition

const DocSidebarMobileSecondaryMenu = ({toggleSidebar, sidebar, path}) => (
    <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
        <DocSidebarItems
            items={sidebar}
            activePath={path}
            onItemClick={(item) => {
                // Mobile sidebar should only be closed if the category has a link
                if (item.type === 'category' && item.href) {
                    toggleSidebar();
                }

                if (item.type === 'link') {
                    toggleSidebar();
                }
            }}
            level={1}
        />
    </ul>);

function DocSidebarMobile(props) {
    return (<MobileSecondaryMenuFiller
        component={DocSidebarMobileSecondaryMenu}
        props={props}
    />);
}

const DocSidebarDesktopMemo = React.memo(DocSidebarDesktop);
const DocSidebarMobileMemo = React.memo(DocSidebarMobile);
export default function DocSidebar(props) {
    const windowSize = useWindowSize(); // Desktop sidebar visible on hydration: need SSR rendering

    const shouldRenderSidebarDesktop = windowSize === 'desktop' || windowSize === 'ssr'; // Mobile sidebar not visible on hydration: can avoid SSR rendering

    const shouldRenderSidebarMobile = windowSize === 'mobile';
    return (<>
        {shouldRenderSidebarDesktop && <DocSidebarDesktopMemo {...props} />}
        {shouldRenderSidebarMobile && <DocSidebarMobileMemo {...props} />}
    </>);
}
