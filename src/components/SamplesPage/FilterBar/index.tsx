import React from 'react';
import styles from './index.module.css';
import ArrowDown from "@site/static/img/samples/arrowDown.svg";
import ArrowUp from "@site/static/img/samples/arrowUp.svg";

function Index() {
    const [isSelectingLanguage, setIsSelectingLanguage] = React.useState(false);
    const [selectedLanguages, setSelectedLanguages] = React.useState([]);
    return (
        <div className={styles.container}>
            <span className={styles.title}>Filter Items</span>
            <span className={styles.numberOfItems}>62</span>
            <div className={styles.selectBox} style={{color: selectedLanguages.length > 0 ? "#3B00B9" : "black"}}
                 onClick={() => setIsSelectingLanguage(!isSelectingLanguage)}>
                <p className={styles.selectTitle}>Language</p>
                <div className={styles.selectionArrow}>
                    {isSelectingLanguage ? <ArrowUp/> : <ArrowDown/>}
                </div>
                {isSelectingLanguage &&
                    <div className={styles.selectOptionsContainer}>
                        <div className={styles.selectOptions}>
                            <label className={styles.selectOption}>
                                <input type="checkbox" value="motoko"/>
                                Motoko
                            </label>
                            <label className={styles.selectOption}>
                                <input type="checkbox" value="Rust"/>
                                Rust
                            </label>
                            <label className={styles.selectOption}>
                                <input type="checkbox" value="Javascript"/>
                                Javascript
                            </label>
                        </div>
                    </div>
                }
            </div>


        </div>
    );
}

export default Index;
