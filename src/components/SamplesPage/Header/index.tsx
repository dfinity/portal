import React from 'react';
import styles from './index.module.css';

function Index() {
    return (
        <div className={styles.container}>
            <p className={styles.title}>Sample Code</p>
            <p className={styles.body}>Get inspired! The possibilities of what to build on the IC are infinite. All
                samples and further projects can be found in the examples repo.</p>
        </div>
    );
}

export default Index;
