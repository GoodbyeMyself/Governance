/**
 * @description: tailwind css 配置文件
 * @author: M.yunlong
 * @date: 2024-03-29 15:23:09
 */
module.exports = {
    mode: 'jit',
    content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {},
    variants: {
        extend: {},
    },
    plugins: [],
};
