import React from 'react';
// Ant design 组件
import { Button, Divider } from 'antd';
// ahooks
import { useCookieState } from 'ahooks';

const AuthenticationPage: React.FC = () => {
    // 获取 cookie
    const [token, setToken] = useCookieState('X-Request-Auth');

    // 本地 存储 cookie
    const setCookieTest = () => {
        setToken('123456789', {
            path: '/',
            sameSite: 'strict',
        });
    };

    // 清除
    const deleteCookieTest = () => {
        setToken('');
    };

    return (
        <div>
            <Divider orientation="left" plain>
                cookie 测试
            </Divider>
            <Button type="primary" onClick={setCookieTest}>
                登陆存储 cookie
            </Button>
            <Button type="primary" onClick={deleteCookieTest} className="ml-4">
                退出更新 cookie
            </Button>
            <span className="ml-12">{token}</span>
            <Divider orientation="left" plain>
                接口认证 调试 401 、403、....
            </Divider>
            <div>xxx</div>
        </div>
    );
};

export default AuthenticationPage;
