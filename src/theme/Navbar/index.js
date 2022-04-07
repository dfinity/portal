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

function NavbarMobileSidebar({sidebarShown, toggleSidebar}) {
    useLockBodyScroll(sidebarShown);
    const items = useNavbarItems();
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
                    imageClassName="navbar__logo"
                    titleClassName="navbar__title"
                />
                {!colorModeToggle.disabled && (
                    <ColorModeToggle
                        className={styles.navbarSidebarToggle}
                        checked={colorModeToggle.isDarkTheme}
                        onChange={colorModeToggle.toggle}
                    />
                )}
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

            <div
                className={clsx('navbar-sidebar__items', {
                    'navbar-sidebar__items--show-secondary': secondaryMenu.shown,
                })}>
                <div className="navbar-sidebar__item menu">
                    <ul className="menu__list">
                        {items.map((item, i) => (
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
    const {navbarRef, isNavbarVisible} = useHideableNavbar(hideOnScroll);
    const items = useNavbarItems();
    const hasSearchNavbarItem = items.some((item) => item.type === 'search');
    const {rightItems} = splitNavItemsByPosition(items);
    const {setLightTheme} = useColorMode();
    useEffect(() => {
        if (!activeDocPlugin) {
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

                <div className="navbar__items navbar__items--right">
                    {rightItems.map((item, i) => (
                        <NavbarItem {...item} key={i}/>
                    ))}
                    <div className={clsx(styles.navBarDivider)}/>
                    <div className={styles.svgIconLinks}><a href="https://discord.com/invite/cA7y6ezyE2"
                                                            className="header-discord-link"/></div>
                    <div className={styles.svgIconLinks}><a href="https://github.com/dfinity"
                                                            className="header-github-link"/></div>
                    <div className={styles.svgIconLinks}><a href="https://discord.com/invite/cA7y6ezyE2"
                                                            className="header-twitter-link"/></div>
                    <a href="https://forum.dfinity.org/" className={styles.forumIconContainer}>
                        <svg className={"header-forum-link"} width="21" height="21" viewBox="0 0 21 21"
                             fill="currentColor"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M5.37963 19.1264L0.0886343 20.3024L1.26463 15.0114C0.490166 13.5628 0.0861612 11.945 0.0886343 10.3024C0.0886343 4.77937 4.56563 0.302368 10.0886 0.302368C15.6116 0.302368 20.0886 4.77937 20.0886 10.3024C20.0886 15.8254 15.6116 20.3024 10.0886 20.3024C8.44599 20.3048 6.82825 19.9008 5.37963 19.1264V19.1264ZM5.08863 10.3024C5.08863 11.6285 5.61542 12.9002 6.5531 13.8379C7.49078 14.7756 8.76255 15.3024 10.0886 15.3024C11.4147 15.3024 12.6865 14.7756 13.6242 13.8379C14.5619 12.9002 15.0886 11.6285 15.0886 10.3024H13.0886C13.0886 11.098 12.7726 11.8611 12.21 12.4237C11.6473 12.9863 10.8843 13.3024 10.0886 13.3024C9.29299 13.3024 8.52992 12.9863 7.96731 12.4237C7.4047 11.8611 7.08863 11.098 7.08863 10.3024H5.08863Z"
                            />
                        </svg>
                    </a>
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
                />
            )}
        </nav>
    );
}
