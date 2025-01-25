import React from 'react';
// ant design 组件
import { Divider } from 'antd';
// 组件
import LineCharts from './components/Charts/Line';

const monitor: React.FC = () => {
    return (
        // xxx
        <div>
            监控页
            <Divider orientation={'left'} plain>
                分割线
            </Divider>
            {/* 图表 */}
            <LineCharts></LineCharts>
        </div>
    );
};

export default monitor;
