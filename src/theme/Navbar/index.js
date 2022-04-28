/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, {useCallback, useState, useEffect} from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import SearchBar from '@theme/SearchBar';
import Search from "@site/src/theme/SearchBar";
import ColorModeToggle from '@theme/ColorModeToggle';
import {
    useThemeConfig,
    useMobileSecondaryMenuRenderer,
    usePrevious,
    useHistoryPopHandler,
    useHideableNavbar,
    useLockBodyScroll,
    useWindowSize,
    useColorMode,
} from '@docusaurus/theme-common';
import {useActivePlugin} from '@docusaurus/plugin-content-docs/client';
import NavbarItem from '@theme/NavbarItem';
import Logo from '@theme/Logo';
import IconMenu from '@theme/IconMenu';
import IconClose from '@theme/IconClose';
import styles from './styles.module.css'; // retrocompatible with v1

const DefaultNavItemPosition = 'right';

function useNavbarItems() {
    // TODO temporary casting until ThemeConfig type is improved
    return useThemeConfig().navbar.items;
} // If split links by left/right
// if position is unspecified, fallback to right (as v1)

function splitNavItemsByPosition(items) {
    const leftItems = items.filter(
        (item) => (item.position ?? DefaultNavItemPosition) === 'left',
    );
    const rightItems = items.filter(
        (item) => (item.position ?? DefaultNavItemPosition) === 'right',
    );
    return {
        leftItems,
        rightItems,
    };
}

function useMobileSidebar() {
    const windowSize = useWindowSize(); // Mobile sidebar not visible on hydration: can avoid SSR rendering

    const shouldRender = windowSize === 'mobile'; // || windowSize === 'ssr';

    const [shown, setShown] = useState(false); // Close mobile sidebar on navigation pop
    // Most likely firing when using the Android back button (but not only)

    useHistoryPopHandler(() => {
        if (shown) {
            setShown(false); // Should we prevent the navigation here?
            // See https://github.com/facebook/docusaurus/pull/5462#issuecomment-911699846

            return false; // prevent pop navigation
        }

        return undefined;
    });
    const toggle = useCallback(() => {
        setShown((s) => !s);
    }, []);
    useEffect(() => {
        if (windowSize === 'desktop') {
            setShown(false);
        }
    }, [windowSize]);
    return {
        shouldRender,
        toggle,
        shown,
    };
}

function useColorModeToggle() {
    const {
        colorMode: {disableSwitch},
    } = useThemeConfig();
    const {isDarkTheme, setLightTheme, setDarkTheme} = useColorMode();
    const toggle = useCallback(
        (e) => (e.target.checked ? setDarkTheme() : setLightTheme()),
        [setLightTheme, setDarkTheme],
    );
    return {
        isDarkTheme,
        toggle,
        disabled: disableSwitch,
    };
}

function useSecondaryMenu({sidebarShown, toggleSidebar}) {
    const content = useMobileSecondaryMenuRenderer()?.({
        toggleSidebar,
    });
    const previousContent = usePrevious(content);
    const [shown, setShown] = useState(
        () =>
            // /!\ content is set with useEffect,
            // so it's not available on mount anyway
            // "return !!content" => always returns false
            false,
    ); // When content is become available for the first time (set in useEffect)
    // we set this content to be shown!

    useEffect(() => {
        const contentBecameAvailable = content && !previousContent;

        if (contentBecameAvailable) {
            setShown(true);
        }
    }, [content, previousContent]);
    const hasContent = !!content; // On sidebar close, secondary menu is set to be shown on next re-opening
    // (if any secondary menu content available)

    useEffect(() => {
        if (!hasContent) {
            setShown(false);
            return;
        }

        if (!sidebarShown) {
            setShown(true);
        }
    }, [sidebarShown, hasContent]);
    const hide = useCallback(() => {
        setShown(false);
    }, []);
    return {
        shown,
        hide,
        content,
    };
}

function NavbarMediaLinks() {
    return (
        <>
            <div className={styles.svgIconLinks}>
                <a href="https://discord.com/invite/cA7y6ezyE2"
                   className="header-discord-link"/></div>
            <div className={styles.svgIconLinks}>
                <a href="https://github.com/dfinity"
                   className="header-github-link"/></div>
            <div className={styles.svgIconLinks}>
                <a href="https://twitter.com/dfinity"
                   className="header-twitter-link"/></div>
            <a href="https://forum.dfinity.org/" className={styles.forumIconContainer}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M2.08863 21.3024L7.37963 20.1264C8.82825 20.9008 10.446 21.3048 12.0886 21.3024C17.6116 21.3024 22.0886 16.8254 22.0886 11.3024C22.0886 5.77937 17.6116 1.30237 12.0886 1.30237C6.56563 1.30237 2.08863 5.77937 2.08863 11.3024C2.08616 12.945 2.49017 14.5628 3.26463 16.0114L2.08863 21.3024ZM13.1036 8.76534C13.9981 7.9495 14.8455 7.53567 15.6223 7.53567C17.4818 7.53567 18.9941 9.06685 19 10.9527C19 11.2247 18.9646 11.4907 18.9058 11.7449C18.9035 11.7546 18.8977 11.7763 18.8873 11.8075C18.5062 13.2627 17.1899 14.3403 15.6296 14.3461C14.3375 14.3461 13.0317 13.1057 12.0633 11.9866L12.0578 11.9933C12.0578 11.9933 11.6223 11.5026 11.1456 10.9764C11.1456 10.9764 10.6043 10.3497 10.0275 9.79993C9.87049 9.6504 9.28353 9.17699 8.58501 8.89833C8.54213 8.89211 8.50396 8.88975 8.47049 8.88975C7.35241 8.90158 6.44618 9.81791 6.44618 10.9412C6.44618 12.0763 7.35241 12.9926 8.47049 12.9926C8.76471 12.9926 9.28844 12.8389 10.0829 12.1176C10.5124 11.7275 10.8831 11.2959 11.1421 10.9767C11.6188 11.5028 12.0542 11.9935 12.0542 11.9935C11.7835 12.3246 11.4128 12.7384 10.9891 13.1227C10.0946 13.9385 9.24727 14.3524 8.47049 14.3524C6.60507 14.3524 5.09273 12.8212 5.09273 10.9353C5.09273 10.6633 5.12804 10.3973 5.18688 10.1431C5.19098 10.1256 5.20651 10.0691 5.24019 9.98785C5.65003 8.57662 6.94483 7.54136 8.47404 7.53567C9.76574 7.53567 11.071 8.7753 12.0354 9.89405L12.04 9.88858L12.0417 9.89052C12.3122 9.56013 12.6816 9.14808 13.1036 8.76534ZM15.6223 12.9983C15.6044 12.9983 15.5852 12.9976 15.5647 12.996C14.8431 12.7245 14.2315 12.2355 14.0702 12.0819C13.5124 11.5501 12.9877 10.9465 12.9538 10.9074C13.2126 10.5886 13.582 10.1589 14.0098 9.77037C14.8043 9.04321 15.3221 8.89541 15.6223 8.89541C16.7403 8.89541 17.6466 9.81174 17.6466 10.9469C17.6466 12.0701 16.7403 12.9864 15.6223 12.9983Z"
                          fill="currentColor"/>
                </svg>
            </a>
        </>
    )
}


function NavbarMobileSidebar({sidebarShown, toggleSidebar, isHomepage}) {
    useLockBodyScroll(sidebarShown);
    const items = useNavbarItems();
    const {leftItems, rightItems} = splitNavItemsByPosition(items);
    const colorModeToggle = useColorModeToggle();
    const secondaryMenu = useSecondaryMenu({
        sidebarShown,
        toggleSidebar,
    });
    return (
        <div className="navbar-sidebar">
            <div className="navbar-sidebar__brand">
                <Logo
                    className="navbar__brand"
                    imageClassName="navbar__mobile__logo"
                    titleClassName="navbar__title"
                />
                <button
                    type="button"
                    className="clean-btn navbar-sidebar__close"
                    onClick={toggleSidebar}>
                    <IconClose
                        color="var(--ifm-color-emphasis-600)"
                        className={styles.navbarSidebarCloseSvg}
                    />
                </button>
            </div>
            <div className={styles.navbarMobileSearch}>
                <Search/>
            </div>
            <div className={styles.navbarMobileItems}>

                <NavbarMediaLinks/>
                {!colorModeToggle.disabled && !isHomepage && (
                    <ColorModeToggle
                        className={styles.navbarSidebarToggle}
                        checked={colorModeToggle.isDarkTheme}
                        onChange={colorModeToggle.toggle}
                    />
                )}
            </div>
            <div className={styles.navbarMobilePages}>
                <ul className="menu__list">
                    {rightItems.map((item, i) => (
                        <NavbarItem mobile {...item} onClick={toggleSidebar} key={i}/>
                    ))}
                </ul>
            </div>
            <div
                className={clsx('navbar-sidebar__items', {
                    'navbar-sidebar__items--show-secondary': secondaryMenu.shown,
                })}>
                <div className="navbar-sidebar__item menu">
                    <ul className="menu__list">
                        {leftItems.map((item, i) => (
                            <NavbarItem mobile {...item} onClick={toggleSidebar} key={i}/>
                        ))}
                    </ul>
                </div>

                <div className="navbar-sidebar__item menu">
                    {items.length > 0 && (
                        <button
                            type="button"
                            className="clean-btn navbar-sidebar__back"
                            onClick={secondaryMenu.hide}>
                            <Translate
                                id="theme.navbar.mobileSidebarSecondaryMenu.backButtonLabel"
                                description="The label of the back button to return to main menu, inside the mobile navbar sidebar secondary menu (notably used to display the docs sidebar)">
                                ← Back to main menu
                            </Translate>
                        </button>
                    )}
                    {secondaryMenu.content}
                </div>
            </div>
        </div>
    );
}

export default function Navbar() {
    const {
        navbar: {hideOnScroll, style},
    } = useThemeConfig();
    const mobileSidebar = useMobileSidebar();
    const colorModeToggle = useColorModeToggle();
    const activeDocPlugin = useActivePlugin();
    const isHomepage = !activeDocPlugin;
    const {navbarRef, isNavbarVisible} = useHideableNavbar(hideOnScroll);
    const items = useNavbarItems();
    const {rightItems} = splitNavItemsByPosition(items);
    const {setLightTheme} = useColorMode();
    useEffect(() => {
        if (isHomepage) {
            setLightTheme();
        }
    }, []);
    return (
        <nav
            ref={navbarRef}
            className={clsx('navbar', 'navbar--fixed-top', {
                'navbar--dark': style === 'dark',
                'navbar--primary': style === 'primary',
                'navbar-sidebar--show': mobileSidebar.shown,
                [styles.navbarHideable]: hideOnScroll,
                [styles.navbarHidden]: hideOnScroll && !isNavbarVisible,
            })}>
            <div className="navbar__inner">
                <div className="navbar__items">
                    {(items?.length > 0 || activeDocPlugin) && (
                        <button
                            aria-label="Navigation bar toggle"
                            className="navbar__toggle clean-btn"
                            type="button"
                            tabIndex={0}
                            onClick={mobileSidebar.toggle}
                            onKeyDown={mobileSidebar.toggle}>
                            <IconMenu/>
                        </button>
                    )}
                    <Logo
                        className="navbar__brand"
                        imageClassName="navbar__logo"
                        titleClassName="navbar__title"
                    />
                </div>

                {!mobileSidebar.shouldRender &&
                    <div className="navbar__items navbar__items--right">
                        {rightItems.map((item, i) => (
                            <NavbarItem {...item} key={i}/>))
                        }
                        <div className={clsx(styles.navBarDivider)}/>
                        <NavbarMediaLinks/>
                        {!colorModeToggle.disabled && activeDocPlugin && (
                            <>
                                <div className={clsx(styles.navBarDivider)}/>
                                <ColorModeToggle
                                    className={styles.toggle}
                                    checked={colorModeToggle.isDarkTheme}
                                    onChange={colorModeToggle.toggle}
                                />
                            </>
                        )}
                    </div>
                }
            </div>

            <div
                role="presentation"
                className="navbar-sidebar__backdrop"
                onClick={mobileSidebar.toggle}
            />

            {mobileSidebar.shouldRender && (
                <NavbarMobileSidebar
                    sidebarShown={mobileSidebar.shown}
                    toggleSidebar={mobileSidebar.toggle}
                    isHomepage={isHomepage}
                />
            )}
        </nav>
    );
}
