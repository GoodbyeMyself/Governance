// 系统默认配置
import defaultSettings from '../config/defaultSettings';
// 自定义 组件
import { AvatarDropdown, AvatarName, Footer, Question, SelectLang } from '@/components';
// API
import { currentUser as queryCurrentUser } from '@/services/api';
// ant design 组件
import { ConfigProvider } from 'antd';
// pro-componets 组件
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
// 路由管理
import { history } from '@umijs/max';
// request 请求拦截
import { errorConfig } from './server/requestErrorConfig';
// 运行时 配置
import type { RequestConfig, RunTimeLayoutConfig } from '@umijs/max';

interface AppProps {
    name?: string;
}

export const qiankun = {
    // 应用 加载 之前
    async bootstrap(props: AppProps) {
        console.log(props, '微应用： BMS - 加载前');
    },
    // 应用 render 之前触发
    async mount(props: AppProps) {
        console.log(props, '微应用： BMS - 挂载成功');
    },
    // 应用 卸载 之后触发
    async unmount(props: AppProps) {
        console.log(props, '微应用： BMS - 卸载成功');
    },
};

// 是否 是开发环境
const loginPath = '/Login';

/**
 * 全局初始状态
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
    loading?: boolean;
    // 用户信息： 可共内部 组件 查询使用
    fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
    currentUser?: API.CurrentUser;
    settings?: Partial<LayoutSettings>;
    // 全局 初始状态测试
    testInitialState?: {
        testinit: string;
    };
    // 是否做为 子应用 被挂载
    isMicroApp?: boolean;
}> {
    // 获取 用户信息
    const fetchUserInfo = async () => {
        try {
            const msg = await queryCurrentUser({
                skipErrorHandler: true,
            });
            return msg.data;
        } catch (error) {
            history.push(loginPath);
        }
        return undefined;
    };

    // 如果不是登录页面，执行
    const { location } = history;

    if (location.pathname !== loginPath) {
        // 获取 用户
        const currentUser = await fetchUserInfo();
        // --
        return {
            fetchUserInfo,
            currentUser,
            settings: defaultSettings as Partial<LayoutSettings>,
            // 全局 初始状态
            testInitialState: {
                testinit: '10',
            },
            // 是否做为 子应用 被挂载
            isMicroApp: (window as any).__POWERED_BY_QIANKUN__ ? true : false,
        };
    }
    return {
        fetchUserInfo,
        settings: defaultSettings as Partial<LayoutSettings>,
        // 是否做为 子应用 被挂载
        isMicroApp: (window as any).__POWERED_BY_QIANKUN__ ? true : false,
    };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {

    // 从初始状态里面获取数据
    const { isMicroApp } = initialState || {};

    return {
        /**
         * @description: 做为 子应用时 放弃基础 pro-layout
         * @author: M.yunlong
         * @date: 2024-04-05 00:20:17
         */
        pure: isMicroApp,
        actionsRender: () => [<Question key="doc" />, <SelectLang key="SelectLang" />],
        avatarProps: {
            src: initialState?.currentUser?.avatar,
            title: <AvatarName />,
            render: (_, avatarChildren) => {
                /**
                 * @description: menu 动态传递：这里对 右上角用户下拉菜单 有影响
                 * @author: M.yunlong
                 * @date: 2024-03-19 17:05:43
                 */
                return <AvatarDropdown menu={true}>{avatarChildren}</AvatarDropdown>;
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
            // 如果没有登录，重定向到 login
            if (!initialState?.currentUser && location.pathname !== loginPath) {
                history.push(loginPath);
            }
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
