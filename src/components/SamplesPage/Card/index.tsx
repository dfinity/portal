import React from 'react';
import styles from './index.module.css'
import Link from "@docusaurus/Link";
import MotokoIcon from "@site/static/img/samples/motoko.svg";
import RustIcon from "@site/static/img/samples/rust.svg";
import YoutubeIcon from "@site/static/img/samples/youtube.svg";
import DocsIcon from "@site/static/img/samples/docs.svg";

function MotokoLink() {
    return (
        <div className={styles.content}>
            <div className={styles.iconLinkTooltipContainer}>
                <span className={styles.iconLinkTooltip}>Motoko</span>
            </div>
            <Link className={styles.iconLink} to={"/"}><MotokoIcon/></Link>
        </div>);
}

function RustLink() {
    return (
        <div className={styles.content}>
            <div className={styles.iconLinkTooltipContainer}>
                <span className={styles.iconLinkTooltip}>Rust</span>
            </div>
            <Link className={styles.iconLink} to={"/"}><RustIcon/></Link>
        </div>);
}

function DocsLink() {
    return (
        <div className={styles.content}>
            <div className={styles.iconLinkTooltipContainer}>
                <span className={styles.iconLinkTooltip}>Developer Docs</span>
            </div>
            <Link className={styles.iconLink} to={"/"}><DocsIcon/></Link>
        </div>);
}

function YoutubeLink() {
    return (
        <div className={styles.content}>
            <div className={styles.iconLinkTooltipContainer}>
                <span className={styles.iconLinkTooltip}>Watch Tutorials</span>
            </div>
            <Link className={styles.iconLink} to={"/"}><YoutubeIcon/></Link>
        </div>);
}

function Index({image, title, domains, body, links}) {
    return (
        <div className={styles.container}>
            <img src={image} className={styles.image} alt=""/>
            <div className={styles.information}>
                <div className={styles.mainDomain}>
                    <span>{domains[0]}</span>
                    <svg className={styles.domainDivider} width="1" height="12" viewBox="0 0 1 12" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <line x1="0.5" y1="12" x2="0.5" stroke="#181818" strokeOpacity="0.6"/>
                    </svg>
                    <span>{`+${domains.length - 1}`}</span>
                    <div className={styles.domainsContainer}>
                        <div className={styles.domains}>
                            {domains.slice(1).map((domain) => <p key={domain}>{domain}</p>)}
                        </div>
                    </div>
                </div>

                <div className={styles.header}>
                    <p className={styles.title}>{title}</p>
                    <Link className={styles.actionButton} to={links.action.to}>
                        {links.action.text}
                    </Link>
                </div>
                <p className={styles.body}>{body}</p>
                <div className={styles.footer}>
                    {links.motoko && <MotokoLink/>}
                    {links.rust && <RustLink/>}
                    {links.docs && <DocsLink/>}
                    {links.youtube && <YoutubeLink/>}
                </div>
            </div>
        </div>
    );
}

export default Index;
