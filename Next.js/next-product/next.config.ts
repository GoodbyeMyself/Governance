import type { NextConfig } from "next";

/**
 * @description: 定义 资源 基础路径：后续根据 开发环境 测试环境 生产环境 配置不同的 basePath
 * @author: M.yunlong
 * @date: 2025-05-13 09:33:09
*/
const basePath = '/next-test';

const nextConfig: NextConfig = {
    // 设置子路径
    basePath: basePath, 
    // 可选：确保静态资源（如 _next/static）路径正确
    assetPrefix: basePath + '/',
    // 可选：确保路径以斜杠结尾，防止重定向问题
    trailingSlash: true,
    // 可选：确保在生产环境中正确设置环境变量
    env: {
        // 将 basePath 暴露给浏览器端 JS
        NEXT_PUBLIC_BASE_PATH: basePath,
    },
    // Docker 部署
    // output: 'standalone'
};

export default nextConfig;
