import styles from './index.module.css';
import Link from "@docusaurus/Link";
import React, {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

export default function SectionsBar({changeBackground}) {
    const [display, SetDisplay] = useState(false);
    const heightToHideFrom = 100;
    const shouldDisplay = () => {
        const winScroll = window.scrollY;
        if (winScroll > heightToHideFrom) {
            SetDisplay(true);
        } else if (winScroll < heightToHideFrom) {
            SetDisplay(false);
        }
    };
    useEffect(() => {
        if (typeof window !== "undefined") {
            shouldDisplay();
            window.addEventListener("scroll", shouldDisplay);
            return () =>
                window.removeEventListener("scroll", shouldDisplay);
        }
    }, [])
    return(
    <AnimatePresence>
        {display &&
            <motion.div
                key="modal"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
            >
                <div className={styles.container}>
                    <div className={styles.grid}>
                        <div className={styles.dfinityIconNav}><Link to={"#home"} className={styles.dfinityLink}/></div>
                        <Link to={"#startCoding"}><span>Start Coding</span></Link>
                        <Link to={"#internetComputer"}><span>Internet Computer</span></Link>
                        <Link to={"#features"}><span>Features</span></Link>
                        <Link to={"/"}><span>Showcase</span></Link>
                        <Link to={"/"}><span>Ecosystem</span></Link>
                        <Link><span onClick={changeBackground}>Dev Forum</span></Link>
                    </div>
                </div>
            </motion.div>}
    </AnimatePresence>)


}
