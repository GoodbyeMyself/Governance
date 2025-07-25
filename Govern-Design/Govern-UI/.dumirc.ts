import { defineConfig } from 'dumi';

export default defineConfig({
    outputPath: 'docs-dist',
    themeConfig: {
        name: 'Govern-Design-UI',
    },
    locales: [
        { id: 'zh-CN', name: '中文' },
        { id: 'en-US', name: 'EN' },
    ],
});
