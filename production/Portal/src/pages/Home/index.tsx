import React from 'react';
// antd style
import useStyles from './style';

const Home: React.FC = () => {
    const { styles } = useStyles();

    return (
        <div>
            {/* banner */}
            <div className={styles.portalBanner}></div>
            <div className={styles.portalContent}>首页</div>
        </div>
    );
};

export default Home;
