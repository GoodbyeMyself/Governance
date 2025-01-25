// 系统默认配置
import defaultSettings from '../config/defaultSettings';
// 自定义 组件
import { Footer, SelectLang } from '@/components';
// API
// ant design 组件
import { ConfigProvider } from 'antd';
// pro-componets layout 配置
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
// request 请求拦截
import { errorConfig } from './server/requestErrorConfig';
// 运行时 配置
import type { RequestConfig, RunTimeLayoutConfig } from '@umijs/max';

/**
 * 全局初始状态
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
    loading?: boolean;
    settings?: Partial<LayoutSettings>;
}> {
    return {
        settings: defaultSettings as Partial<LayoutSettings>,
    };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
    return {
        /**
         * @description: 放弃基础 pro-layout
         * @author: M.yunlong
         * @date: 2024-04-05 00:20:17
         */
        pure: false,
        // --
        actionsRender: () => [<SelectLang key="SelectLang" />],
        /**
         * @description: 设置 iconfont: 线上的配置方式
         * @author: M.yunlong
         * @date: 2024-03-24 23:26:22
         */
        iconfontUrl: '//at.alicdn.com/t/c/font_4471958_z6jym97lxje.js',
        // --
        menuHeaderRender: undefined,
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
    // 异常处理
    ...errorConfig,
};
