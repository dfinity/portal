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
        case 'tokenomics':
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
            return <svg width="24" height="24" viewBox="0 0 24 24"
                        fill={sidebarId === activePath ? getPrimaryColor(activePath) : 'currentColor'}
                        xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M21 4H7C6.46957 4 5.96086 4.21071 5.58579 4.58579C5.21071 4.96086 5 5.46957 5 6C5 6.53043 5.21071 7.03914 5.58579 7.41421C5.96086 7.78929 6.46957 8 7 8H21V21C21 21.2652 20.8946 21.5196 20.7071 21.7071C20.5196 21.8946 20.2652 22 20 22H7C5.93913 22 4.92172 21.5786 4.17157 20.8284C3.42143 20.0783 3 19.0609 3 18V6C3 4.93913 3.42143 3.92172 4.17157 3.17157C4.92172 2.42143 5.93913 2 7 2H20C20.2652 2 20.5196 2.10536 20.7071 2.29289C20.8946 2.48043 21 2.73478 21 3V4ZM5 18C5 18.5304 5.21071 19.0391 5.58579 19.4142C5.96086 19.7893 6.46957 20 7 20H19V10H7C6.29782 10.0011 5.60784 9.81655 5 9.465V18ZM20 7H7C6.73478 7 6.48043 6.89464 6.29289 6.70711C6.10536 6.51957 6 6.26522 6 6C6 5.73478 6.10536 5.48043 6.29289 5.29289C6.48043 5.10536 6.73478 5 7 5H20V7Z"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

        case 'references':
            return <svg width="24" height="24" viewBox="0 0 24 24"
                        fill={sidebarId === activePath ? getPrimaryColor(activePath) : 'currentColor'}
                        xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M4 2H20C20.2652 2 20.5196 2.10536 20.7071 2.29289C20.8946 2.48043 21 2.73478 21 3V22.276C21.0001 22.3594 20.9793 22.4416 20.9395 22.5149C20.8997 22.5882 20.8422 22.6505 20.7722 22.6959C20.7023 22.7413 20.622 22.7685 20.5388 22.775C20.4557 22.7815 20.3722 22.767 20.296 22.733L12 19.03L3.704 22.732C3.6279 22.766 3.54451 22.7805 3.46141 22.774C3.37831 22.7676 3.29813 22.7405 3.22818 22.6952C3.15822 22.6499 3.1007 22.5878 3.06085 22.5146C3.021 22.4414 3.00008 22.3593 3 22.276V3C3 2.73478 3.10536 2.48043 3.29289 2.29289C3.48043 2.10536 3.73478 2 4 2ZM19 19.965V4H5V19.965L12 16.841L19 19.965ZM12 13.5L9.061 15.045L9.622 11.773L7.245 9.455L10.531 8.977L12 6L13.47 8.977L16.755 9.455L14.378 11.773L14.938 15.045L12 13.5Z"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

        case 'concepts':
            return <svg viewBox="0 0 24 24"
                        fill={sidebarId === activePath ? getPrimaryColor(activePath) : 'currentColor'}
                        xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M9.9732 18H11.0002V13H13.0002V18H14.0272C14.1592 16.798 14.7722 15.806 15.7672 14.723C15.8802 14.601 16.5992 13.856 16.6842 13.75C17.3905 12.8676 17.8332 11.8037 17.9613 10.6808C18.0895 9.55784 17.8978 8.42154 17.4085 7.40274C16.9191 6.38395 16.1519 5.52409 15.1953 4.92218C14.2387 4.32028 13.1315 4.00081 12.0013 4.00057C10.8711 4.00033 9.76374 4.31932 8.80686 4.92082C7.84999 5.52231 7.08246 6.38185 6.59267 7.40043C6.10288 8.41902 5.91074 9.55524 6.0384 10.6782C6.16605 11.8012 6.60829 12.8653 7.3142 13.748C7.4002 13.855 8.1212 14.601 8.2322 14.722C9.2282 15.806 9.8412 16.798 9.9732 18ZM10.0002 20V21H14.0002V20H10.0002ZM5.7542 15C4.81239 13.8233 4.22215 12.4045 4.05147 10.907C3.88078 9.40947 4.1366 7.89421 4.78946 6.53575C5.44231 5.17728 6.46564 4.03088 7.74156 3.22859C9.01748 2.4263 10.4941 2.00077 12.0013 2.00101C13.5085 2.00125 14.985 2.42725 16.2606 3.22995C17.5363 4.03265 18.5592 5.17939 19.2117 6.53806C19.8641 7.89673 20.1194 9.41207 19.9482 10.9095C19.7771 12.407 19.1864 13.8256 18.2442 15.002C17.6242 15.774 16.0002 17 16.0002 18.5V21C16.0002 21.5304 15.7895 22.0391 15.4144 22.4142C15.0393 22.7893 14.5306 23 14.0002 23H10.0002C9.46977 23 8.96106 22.7893 8.58599 22.4142C8.21092 22.0391 8.0002 21.5304 8.0002 21V18.5C8.0002 17 6.3752 15.774 5.7542 15Z"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

        case 'tokenomics':
            return <svg viewBox="0 0 24 24"
                        fill={sidebarId === activePath ? getPrimaryColor(activePath) : 'currentColor'}
                        xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M21 3C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V9.5C21.337 9.5 20.7011 9.76339 20.2322 10.2322C19.7634 10.7011 19.5 11.337 19.5 12C19.5 12.663 19.7634 13.2989 20.2322 13.7678C20.7011 14.2366 21.337 14.5 22 14.5V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V14.5C2.66304 14.5 3.29893 14.2366 3.76777 13.7678C4.23661 13.2989 4.5 12.663 4.5 12C4.5 11.337 4.23661 10.7011 3.76777 10.2322C3.29893 9.76339 2.66304 9.5 2 9.5V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3H21ZM20 5H4V7.968L4.156 8.049C4.83432 8.41905 5.40593 8.95752 5.81577 9.61257C6.22561 10.2676 6.45987 11.0172 6.496 11.789L6.5 12C6.50013 12.8082 6.28252 13.6016 5.87005 14.2967C5.45758 14.9917 4.86549 15.5629 4.156 15.95L4 16.032V19H20V16.031L19.844 15.951C19.1657 15.581 18.5941 15.0425 18.1842 14.3874C17.7744 13.7324 17.5401 12.9828 17.504 12.211L17.5 12C17.5 10.296 18.447 8.813 19.844 8.05L20 7.967V5Z"
                    strokeLinecap="round" strokeLinejoin="round"/>
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
