import React, { useState } from 'react';
// antd
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
// 跳转
import { useNavigate } from 'umi';

const items: MenuProps['items'] = [
    {
        label: '首页',
        key: 'home',
    },
    {
        label: '微服务 - 模块内 - 调用',
        key: 'microapp',
    },
    {
        label: '微应用 - 数据质量 - 任务列表',
        key: 'quality',
    },
];

const Nav: React.FC = () => {
    const [current, setCurrent] = useState('home');

    const navigate = useNavigate();

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);

        setCurrent(e.key);

        navigate(e.key, { replace: true });
    };

    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
        />
    );
};

export default Nav;
