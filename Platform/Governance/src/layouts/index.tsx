import React from 'react';
import { Outlet } from 'umi';

const Layout: React.FC = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default Layout;
