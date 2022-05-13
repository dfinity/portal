import React from 'react';
import styles from './index.module.css';

function Index() {
    return (
        <div className={styles.container}>
            <p className={styles.title}>Sample Code</p>
            <p className={styles.body}>Take a look at some sample dapps below and see the possibilities of building on
                the IC. All samples and
                further projects can be found in the Samples repo.</p>
        </div>
    );
}

export default Index;
