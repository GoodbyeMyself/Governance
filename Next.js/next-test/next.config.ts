import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // 设置子路径
    basePath: '/next-test', 
    // 可选：确保静态资源（如 _next/static）路径正确
    assetPrefix: '/next-test/', 
    // 可选：确保路径以斜杠结尾，防止重定向问题
    trailingSlash: true,
    // Docker 部署
    output: 'standalone'
};

export default nextConfig;
