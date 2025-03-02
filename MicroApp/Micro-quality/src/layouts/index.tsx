import React from 'react';
import { Outlet } from 'umi';

// 样式表 icon
import '../../public/iconfont/iconfont.css';

const Layout: React.FC = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default Layout;
