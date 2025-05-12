import { defineConfig } from "umi";

export default defineConfig({
    routes: [
        {
            path: "/",
            component: "index"
        },
        {
            path: "/docs",
            component: "docs"
        },
    ],
    npmClient: "npm",
    // 要在非根目录下部署 umi 项目时，你可以使用 base 配置
    base: '/microapp-metadata/',
    // 静态资源公共路径
    publicPath: '/microapp-metadata/',
    // 页面 title
    title: '微应用 - 元数据管理'
});
