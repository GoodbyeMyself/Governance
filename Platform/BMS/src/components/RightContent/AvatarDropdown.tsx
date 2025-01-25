// React
import React, { useCallback, useEffect, useRef } from 'react';
// umi
import { useLocation } from 'umi';
import { history, useModel } from '@umijs/max';
// ahooks
import { useCookieState } from 'ahooks';
// antd
import { Spin } from 'antd';
import { createStyles } from 'antd-style';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
// 方法类
import { stringify } from 'querystring';
import type { MenuInfo } from 'rc-menu/lib/interface';
// flushSync 的作用是立即执行挂起的更新
import { flushSync } from 'react-dom';
// components
import HeaderDropdown from '../HeaderDropdown';
// api
import { outLogin } from '@/services/api';

export type GlobalHeaderRightProps = {
    menu?: boolean;
    children?: React.ReactNode;
};

export const AvatarName = () => {
    const { initialState } = useModel('@@initialState');
    const { currentUser } = initialState || {};
    return <span className="anticon">{currentUser?.name}</span>;
};

const useStyles = createStyles(({ token }) => {
    return {
        action: {
            display: 'flex',
            height: '48px',
            marginLeft: 'auto',
            overflow: 'hidden',
            alignItems: 'center',
            padding: '0 8px',
            cursor: 'pointer',
            borderRadius: token.borderRadius,
            '&:hover': {
                backgroundColor: token.colorBgTextHover,
            },
        },
    };
});

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu, children }) => {
    // cookie
    const [, setToken] = useCookieState('X-Request-Auth');

    // 获取 路由
    const location = useLocation();

    const locationRef = useRef(location);

    useEffect(() => {
        // 更新 locationRef 的值，使其保持最新的 location
        locationRef.current = location;
    }, [location]);
    /**
     * 退出登录，并且将当前的 url 保存
     */
    const loginOut = async () => {
        // 登出
        await outLogin();

        //  清空 token
        setToken('');

        // 此处处理： 为了 获取 不包含 base 前缀的路由地址
        const pathname = locationRef.current.pathname;

        const { search } = window.location;

        const urlParams = new URL(window.location.href).searchParams;

        /** 此方法会跳转到 redirect 参数所在的位置 */
        const redirect = urlParams.get('redirect');
        // Note: There may be security issues, please note
        if (window.location.pathname !== '/Login' && !redirect) {
            history.replace({
                pathname: '/Login',
                search: stringify({
                    redirect: pathname + search,
                }),
            });
        }
    };

    const { styles } = useStyles();

    const { initialState, setInitialState } = useModel('@@initialState');

    const onMenuClick = useCallback(
        (event: MenuInfo) => {
            const { key } = event;
            if (key === 'logout') {
                flushSync(() => {
                    setInitialState((s) => ({ ...s, currentUser: undefined }));
                });
                loginOut();
                return;
            }
            history.push(`/account/${key}`);
        },
        [setInitialState],
    );

    const loading = (
        <span className={styles.action}>
            <Spin
                size="small"
                style={{
                    marginLeft: 8,
                    marginRight: 8,
                }}
            />
        </span>
    );

    if (!initialState) {
        return loading;
    }

    const { currentUser } = initialState;

    if (!currentUser || !currentUser.name) {
        return loading;
    }

    // 右上角 下拉菜单
    const menuItems = [
        ...(menu
            ? [
                  {
                      key: 'center',
                      icon: <UserOutlined />,
                      label: '个人中心',
                  },
                  {
                      key: 'settings',
                      icon: <SettingOutlined />,
                      label: '个人设置',
                  },
                  {
                      // 这是一个 分割线
                      type: 'divider' as const,
                  },
              ]
            : []),
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: '退出登录',
        },
    ];

    return (
        <HeaderDropdown
            menu={{
                selectedKeys: [],
                onClick: onMenuClick,
                items: menuItems,
            }}
        >
            {children}
        </HeaderDropdown>
    );
};
