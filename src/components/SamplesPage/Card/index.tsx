import React from 'react';
import styles from './index.module.css'
import Link from "@docusaurus/Link";
import MotokoIcon from "@site/static/img/samples/motoko.svg";
import RustIcon from "@site/static/img/samples/rust.svg";
import YoutubeIcon from "@site/static/img/samples/youtube.svg";
import DocsIcon from "@site/static/img/samples/docs.svg";
import IC0Icon from "@site/static/img/samples/ic0.svg";

function MotokoLink({to}) {
    return (
        <div className={styles.content}>
            <div className={styles.iconLinkTooltipContainer}>
                <span className={styles.iconLinkTooltip}>Motoko</span>
            </div>
            <Link className={styles.iconLink} to={to}><MotokoIcon/></Link>
        </div>);
}

function RustLink({to}) {
    return (
        <div className={styles.content}>
            <div className={styles.iconLinkTooltipContainer}>
                <span className={styles.iconLinkTooltip}>Rust</span>
            </div>
            <Link className={styles.iconLink} to={to}><RustIcon/></Link>
        </div>);
}

function DocsLink({to}) {
    return (
        <div className={styles.content}>
            <div className={styles.iconLinkTooltipContainer}>
                <span className={styles.iconLinkTooltip}>Developer Docs</span>
            </div>
            <Link className={styles.iconLink} to={to}><DocsIcon/></Link>
        </div>);
}

function YoutubeLink({to}) {
    return (
        <div className={styles.content}>
            <div className={styles.iconLinkTooltipContainer}>
                <span className={styles.iconLinkTooltip}>Watch Tutorials</span>
            </div>
            <Link className={styles.iconLink} to={to}><YoutubeIcon/></Link>
        </div>);
}

function LivePreviewLink({to}) {
    return (
        <div className={styles.content}>
            <div className={styles.iconLinkTooltipContainer}>
                <span className={styles.iconLinkTooltip}>See Live</span>
            </div>
            <Link className={styles.iconLink} to={to}><IC0Icon/></Link>
        </div>);
}

function Index({image, title, domain, body, links}) {
    return (
        <div className={styles.container}>
            <img src={image} className={styles.image} alt=""/>
            <div className={styles.information}>
                <div className={styles.domain}>
                    <span>{domain}</span>
                </div>

                <p className={styles.title}>{title}</p>

                <p className={styles.body}>{body}</p>
                <div className={styles.footer}>
                    {links.motoko && <MotokoLink to={links.motoko}/>}
                    {links.rust && <RustLink to={links.rust}/>}
                    {links.livePreview &&
                        <LivePreviewLink to={links.livePreview}/>}
                    {links.docs && <DocsLink to={links.docs}/>}
                    {links.youtube && <YoutubeLink to={links.youtube}/>}
                </div>
            </div>
        </div>
    );
}

export default Index;
