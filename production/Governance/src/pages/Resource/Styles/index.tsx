import React from 'react';
// antd 组件
import { Divider } from 'antd';
// antd style
import useStyles from './style';

const StylesPage: React.FC = () => {
    const { styles } = useStyles();

    return (
        <div>
            <Divider orientation="left" plain>
                原子 css tailwind css 使用样例
            </Divider>
            <div className="mb-3 text-[#1890ff] bg-black">css 模块化</div>
            <Divider orientation="left" plain>
                ant style 方式 自定义样式
            </Divider>
            <div className={styles.testContainer}></div>
        </div>
    );
};

export default StylesPage;
