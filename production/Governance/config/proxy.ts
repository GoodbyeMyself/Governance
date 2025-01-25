/**
 * @name 代理的配置
 * @see 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 *
 * @doc https://umijs.org/docs/guides/proxy
 */

export default {
    // 如果需要自定义本地开发服务器  请取消注释按需调整
    dev: {
        // BMS 基础管理
        '/service-bms/': {
            target: 'https://apifoxmock.com/m1/4279578-3921636-default/',
            changeOrigin: true,
            pathRewrite: {
                '^': '',
            },
        },
        // 数据质量
        '/service-quality/': {
            target: 'https://apifoxmock.com/m1/4279578-3921636-default/',
            changeOrigin: true,
            pathRewrite: {
                '^': '',
            },
        },
    },

    /**
     * @name 详细的代理配置
     * @doc https://github.com/chimurai/http-proxy-middleware
     */
    test: {
        '/api/': {
            target: 'https://proapi.azurewebsites.net',
            changeOrigin: true,
            pathRewrite: {
                '^': '',
            },
        },
    },

    pre: {
        '/api/': {
            target: 'your pre url',
            changeOrigin: true,
            pathRewrite: {
                '^': '',
            },
        },
    },
};
