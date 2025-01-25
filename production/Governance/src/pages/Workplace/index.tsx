import React from 'react';
// components
import Welcome from './components/Welcome';
// ant design 组件
import { Divider } from 'antd';
// umi max 提供的 数据流管理方案
import { useModel } from '@umijs/max';

const Workplace: React.FC = () => {
    const { counter } = useModel('useGlobalModels');

    return (
        <div>
            {/* 欢迎页 */}
            <Welcome></Welcome>
            <Divider orientation="left" plain>
                获取 全局数据流 变化的数据
            </Divider>
            <div>{counter}</div>
        </div>
    );
};

export default Workplace;
