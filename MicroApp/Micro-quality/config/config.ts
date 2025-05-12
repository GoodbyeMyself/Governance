// umi
import { defineConfig } from '@umijs/max';
// 代理配置
import proxy from './proxy';

const { REACT_APP_ENV = 'dev' } = process.env;

// 构建环境 标识
const isProduction = process.env.NODE_ENV === 'production';

// 开启 Gzip
const CompressionPlugin = require('compression-webpack-plugin');

// Gzip 匹配规则
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg|ttf|woff|woff2|eot|png|jpg|jpeg)(\?.*)?$/i;

export default defineConfig({
    /**
     * @description: webpack 配置
     * @author: M.yunlong
     * @date: 2024-04-22 16:16:40
     */
    chainWebpack(memo) {
        // 执行 构建时
        if (isProduction) {
            // 开启 gzip 压缩
            memo.plugin('compression-webpack-plugin').use(
                new CompressionPlugin({
                    algorithm: 'gzip',
                    // 匹配 文件规则
                    test: productionGzipExtensions,
                    // 压缩比
                    threshold: 10240,
                    minRatio: 0.8,
                }),
            );
        }
    },
    antd: {},
    access: {},
    model: {},
    initialState: {},
    request: {},
    layout: {
        title: '微应用 - 数据质量',
    },
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            name: '首页',
            path: '/home',
            component: './Home',
        },
        {
            name: '微应用',
            path: '/microapp',
            component: './Microapp',
        },
        {
            name: 'CRUD 示例',
            path: '/table',
            component: './Table',
        },
        {
            name: '权限演示',
            path: '/access',
            component: './Access',
        },
        {
            name: 'Dify 工作流',
            path: '/dify',
            component: './Dify',
        },
    ],
    /**
     * @name 代理配置
     * @description 可以让你的本地服务器代理到你的服务器上，这样你就可以访问服务器的数据了
     * @see 要注意以下 代理只能在本地开发时使用，build 之后就无法使用了。
     * @doc 代理介绍 https://umijs.org/docs/guides/proxy
     * @doc 代理配置 https://umijs.org/docs/api/config#proxy
     */
    proxy: proxy[REACT_APP_ENV as keyof typeof proxy],

    npmClient: 'npm',
    // 微应用
    qiankun: {
        // 开启 作为子应用
        // slave: {},
    },
    // 设置 端口号
    headScripts: [`window.publicPath = '//localhost:9002'`],
    /**
     * @name favicon 配置
     */
    favicons: ['/favicon.svg'],
    // 要在非根目录下部署 umi 项目时，你可以使用 base 配置
    base: '/microapp-quality/',
    // 静态资源公共路径
    publicPath: '/microapp-quality/',
    // 输出的文件夹 名称
    outputPath: 'microapp-quality'
});
