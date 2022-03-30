/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, {useState} from 'react';
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


function getThemeColor(section) {
    switch (section) {
        case 'developer-docs':
            return "#ED1E79"
        case 'concepts':
            return "#522785"
        case 'references':
            return "#29ABE2"
        case 'user-guides':
            return "#FBB03B"
        case 'samples':
            return "#F15A24"
        default:
            return "#29ABE2"
    }
}

function changeThemeColor(section) {
    document.documentElement.style.setProperty('--ifm-color-primary', getThemeColor(section));
}

function DocItem(sidebarId) {
    switch (sidebarId) {
        case 'developer-docs':
            return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"/>
            </svg>
        case 'concepts':
            return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"/>
            </svg>
        case 'references':
            return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd"
                      d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                      clipRule="evenodd"/>
                <path d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"/>
            </svg>

        case 'user-guides':
            return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                    d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
            </svg>
        case 'samples':
            return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd"
                      d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"/>
            </svg>

        default:
            return <div/>
    }
}


function DocSideBarNav() {
    const items = useThemeConfig().navbar.items;
    return (
        <div>
            {items.map((item, i) =>
                (item.type === 'docSidebar' &&
                    <div key={i} className="flex pl-3" onClick={() => changeThemeColor(item.sidebarId)}>
                        <div className={`my-auto rounded-md p-0.5 text-white ${clsx(styles.sideBarNavItem)}`}>
                            {DocItem(item.sidebarId)}
                        </div>
                        <NavbarItem {...item}/>
                    </div>))}
        </div>
    );
}


function DocSidebarDesktop({path, sidebar, onCollapse, isHidden}) {
    const showAnnouncementBar = useShowAnnouncementBar();
    const {
        navbar: {hideOnScroll}, hideableSidebar,
    } = useThemeConfig();

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
                <DocSideBarNav/>
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
