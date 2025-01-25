// 系统默认配置
import defaultSettings from '../config/defaultSettings';
// 自定义 组件
import { AvatarName, Footer, SelectLang } from '@/components';
// 用户 组件
import { Login } from '@/components/Login';
// API
import { currentUser as queryCurrentUser } from '@/services/api';
// ant design 组件
import { ConfigProvider } from 'antd';
// pro-componets layout 配置
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
// 路由管理
import { history } from '@umijs/max';
// request 请求拦截
import { errorConfig } from './server/requestErrorConfig';
// 运行时 配置
import type { RequestConfig, RunTimeLayoutConfig } from '@umijs/max';

// 微前端
import { apps } from '../config/qiankun';

// 微应用
export const qiankun = {
    // 子应用
    apps,
};

/**
 * 全局初始状态
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
    loading?: boolean;
    fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
    currentUser?: API.CurrentUser;
    settings?: Partial<LayoutSettings>;
    // 全局 初始状态测试
    testInitialState?: {
        testinit: string;
    };
}> {
    const fetchUserInfo = async () => {
        try {
            const msg = await queryCurrentUser({
                skipErrorHandler: true,
            });
            return msg.data;
        } catch (error) {
            console.log(error, '<- 用户信息：获取-异常');
        }
        return undefined;
    };

    return {
        fetchUserInfo,
        settings: defaultSettings as Partial<LayoutSettings>,
    };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
    return {
        actionsRender: () => [<SelectLang key="SelectLang" />],
        avatarProps: {
            src: initialState?.currentUser?.avatar,
            title: <AvatarName />,
            render: (_, avatarChildren) => {
                // --
                console.log(_, avatarChildren);
                /**
                 * @description: 暂时 未登陆：设置为空、后续登陆显示 登陆信息
                 * @author: M.yunlong
                 * @date: 2024-03-19 17:05:43
                 */
                // return <AvatarDropdown menu={true}>{avatarChildren}</AvatarDropdown>;
                return <Login />;
            },
        },
        waterMarkProps: {
            content: initialState?.currentUser?.name,
        },
        /**
         * @description: 设置 iconfont: 线上的配置方式
         * @author: M.yunlong
         * @date: 2024-03-24 23:26:22
         */
        iconfontUrl: '//at.alicdn.com/t/c/font_4471958_z6jym97lxje.js',
        footerRender: () => <Footer />,
        onPageChange: () => {
            const { location } = history;
            console.log(location, '<- 页面变化了');
        },
        menuHeaderRender: undefined,
        /**
         * @description: 自定义 403 页面
         * @author: M.yunlong
         * @date: 2024-03-21 20:11:20
         */
        // unAccessible: <div>unAccessible</div>,
        /**
         * @description: 自定义 404 页面
         * @author: M.yunlong
         * @date: 2024-03-21 20:11:36
         */
        // noFound: <div>404</div>,
        /**
         * @description: 这里可以看作： 全局根组件
         * @author: M.yunlong
         * @date: 2024-03-24 13:20:03
         */
        childrenRender: (children) => {
            // 增加一个 loading 的状态
            // if (initialState?.loading) return <PageLoading />;
            return (
                <ConfigProvider
                    componentSize="middle"
                    theme={{
                        token: {
                            colorPrimary: '#1890ff',
                        },
                    }}
                >
                    {children}
                </ConfigProvider>
            );
        },
        ...initialState?.settings,
    };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request: RequestConfig = {
    // 基础 路径
    baseURL: '',
    // 请求头
    headers: {
        'X-Requested-Test': 'test-header',
    },
    // 异常处理
    ...errorConfig,
};
