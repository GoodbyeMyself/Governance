/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
    {
        path: '/',
        redirect: '/Workplace',
    },
    {
        path: '/Workplace',
        name: 'workplace',
        icon: 'icon-icon_xinyong_xianxing_jijin-',
        component: './Workplace',
        hash: 'workplace',
    },
    // 登陆
    {
        path: '/login',
        name: 'login',
        layout: false,
        component: './Login',
    },
    // 权限控制
    {
        path: '/Authority',
        icon: 'cloud',
        name: 'authority',
        routes: [
            {
                path: '/Authority',
                redirect: '/Authority/AccessPage',
            },
            {
                // 路由和菜单的权限控制
                name: 'accessPage',
                path: '/Authority/AccessPage',
                component: './Authority/AccessPage',
                // 页面受权限控制： 只有 admin 用户才有权限访问
                access: 'canAdmin',
            },
            {
                // 页面内的权限控制
                name: 'accessManagement',
                path: '/Authority/AccessManagement',
                component: './Authority/AccessManagement',
            },
        ],
    },
    // 数据流
    {
        path: '/DataManagement',
        icon: 'icon-tubiaoshuju_liucheng',
        name: 'dataManagement',
        routes: [
            {
                path: '/DataManagement',
                redirect: '/DataManagement/InitialModel',
            },
            {
                // 简易数据流
                name: 'initialModel',
                path: '/DataManagement/InitialModel',
                component: './DataManagement/InitialModel',
            },
            {
                // dva 状态管理
                name: 'dva',
                path: '/DataManagement/Dva',
                component: './DataManagement/Dva',
            },
            {
                // valito
                name: 'valtio',
                path: '/DataManagement/Valtio',
                component: './DataManagement/Valtio',
            },
            {
                // 传参
                name: 'parameterTransfer',
                path: '/DataManagement/ParameterTransfer',
                component: './DataManagement/ParameterTransfer',
            },
        ],
    },
    // 网络请求
    {
        path: '/NetWork',
        icon: 'wifi',
        name: 'netWork',
        routes: [
            {
                path: '/NetWork',
                redirect: '/NetWork/RequestPage',
            },
            {
                // 网络请求
                name: 'requestPage',
                path: '/NetWork/RequestPage',
                component: './NetWork/RequestPage',
            },
            {
                // 认证测试
                name: 'authentication',
                path: '/NetWork/Authentication',
                component: './NetWork/Authentication',
            },
            {
                // mock 服务测试
                name: 'mockpage',
                path: '/NetWork/Mockpage',
                component: './NetWork/Mockpage',
            },
        ],
    },
    // 资源管理
    {
        path: '/Resource',
        icon: 'file',
        name: 'resource',
        routes: [
            {
                path: '/Resource',
                redirect: '/Resource/File',
            },
            {
                name: 'file',
                path: '/Resource/File',
                component: './Resource/File',
            },
            {
                name: 'styles',
                path: '/Resource/Styles',
                component: './Resource/Styles',
            },
            {
                name: 'language',
                path: '/Resource/Language',
                component: './Resource/Language',
            },
        ],
    },
    // 可视化图表
    {
        path: '/Dashboard',
        icon: 'dashboard',
        name: 'dashboard',
        routes: [
            {
                path: '/Dashboard',
                redirect: '/Dashboard/Monitor',
            },
            {
                name: 'monitor',
                path: '/Dashboard/Monitor',
                component: './Dashboard/Monitor',
            },
            {
                name: 'analysis',
                path: '/Dashboard/Analysis',
                component: './Dashboard/Analysis',
            },
        ],
    },
    // 微前端
    {
        path: '/Qiankun',
        icon: 'appstore',
        name: 'qiankun',
        routes: [
            {
                path: '/Qiankun',
                redirect: '/Qiankun/MicroPage',
            },
            // 微应用 - 审核中心
            {
                name: 'microPage',
                path: '/Qiankun/MicroPage',
                component: './Qiankun/MicroPage',
            },
            // 微应用 - 数据集成 - ETL
            {
                name: 'microapp-etl',
                path: '/Qiankun/microapp-etl/*',
                microApp: 'microapp-etl',
                microAppProps: {
                    // 向 子应用 传递参数， 子应用 在生命周期中取值
                    params: {
                        parentProject: 'Governance',
                    },
                    // 配置 微应用 根元素 css 类名
                    className: 'microappContainer',
                    // 主动设置
                    autoSetLoading: true,
                },
                routes: [
                    {
                        name: 'home',
                        path: 'home',
                    },
                    {
                        name: 'microapp',
                        path: 'microapp',
                    },
                ],
            },
            // 微应用 - 数据质量
            {
                name: 'microapp-quality',
                path: '/Qiankun/microapp-quality/*',
                microApp: 'microapp-quality',
                microAppProps: {
                    // 向 子应用 传递参数， 子应用 在生命周期中取值
                    params: {
                        parentProject: 'Governance',
                    },
                    // 配置 微应用 根元素 css 类名
                    className: 'microappContainer',
                    // 主动设置
                    autoSetLoading: true,
                },
                routes: [
                    {
                        name: 'home',
                        path: 'home',
                    },
                    {
                        name: 'microapp',
                        path: 'microapp',
                    },
                    {
                        name: 'table',
                        path: 'table',
                    },
                    {
                        name: 'access',
                        path: 'access',
                    },
                ],
            },
            // 微应用 - 数据服务
            {
                name: 'microapp-service',
                path: '/Qiankun/microapp-service/*',
                microApp: 'microapp-service',
                microAppProps: {
                    // 向 子应用 传递参数， 子应用 在生命周期中取值
                    params: {
                        parentProject: 'Governance',
                    },
                    // 配置 微应用 根元素 css 类名
                    className: 'microappContainer',
                    // 主动设置
                    autoSetLoading: true,
                },
                routes: [
                    {
                        name: 'home',
                        path: 'home',
                    },
                    {
                        name: 'microapp',
                        path: 'microapp',
                    },
                    {
                        name: 'access',
                        path: 'access',
                    },
                ],
            },
        ],
    },
    // web3
    {
        path: '/Web3',
        icon: 'icon-zhuanrangshouyi2',
        name: 'web3',
        routes: [
            {
                path: '/Web3',
                redirect: '/Web3/NFT',
            },
            {
                name: 'NFT',
                path: '/Web3/NFT',
                component: './Web3/NFT',
            },
        ],
    },
    // 列表页
    {
        path: '/List',
        icon: 'table',
        name: 'list',
        routes: [
            {
                path: '/List',
                redirect: '/List/TableList',
            },
            {
                name: 'table-list',
                path: '/List/TableList',
                component: './List/TableList',
            },
        ],
    },
    // 微前端
    {
        path: '/bms/*',
        icon: 'appstore',
        microApp: 'bms',
        microAppProps: {
            // 向 子应用 传递参数， 子应用 在生命周期中取值
            params: {
                parentProject: 'Governance',
            },
            // 配置 微应用 根元素 css 类名
            className: 'microappContainer',
            // 主动设置
            autoSetLoading: true,
        },
        routes: [
            {
                path: 'Account',
                redirect: 'Account/center',
            },
            {
                path: 'Account/center',
            },
            {
                path: 'Account/settings',
            },
        ],
    },
    {
        path: '*',
        layout: false,
        component: './404',
    },
];
