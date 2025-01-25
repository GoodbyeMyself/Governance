import React from 'react';
// pro layout
import { GridContent } from '@ant-design/pro-components';
// Ant design 组件
import { Divider } from 'antd';
// 组件
import BaseRequest from './components/base';

const RequsetPage: React.FC = () => {
    return (
        <div>
            <Divider orientation="left" plain>
                默认请求
            </Divider>
            <GridContent>
                <BaseRequest />
            </GridContent>
            <Divider orientation="left" plain>
                手动触发
            </Divider>
            <GridContent>xxx</GridContent>
            <Divider orientation="left" plain>
                联动触发
            </Divider>
            <GridContent>xxx</GridContent>
        </div>
    );
};

export default RequsetPage;
