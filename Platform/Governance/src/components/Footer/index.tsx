import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
    return (
        <DefaultFooter
            style={{
                background: 'none',
            }}
            copyright="2025 xxxx 有限责任公司 - 数据治理产品部 xxx"
            links={[
                {
                    key: 'github',
                    title: <GithubOutlined />,
                    href: 'https://github.com/ant-design/ant-design-pro',
                    blankTarget: true,
                },
                {
                    key: 'SDC Govern',
                    title: 'SDC Govern',
                    href: 'https://ant.design',
                    blankTarget: true,
                },
            ]}
        />
    );
};

export default Footer;
