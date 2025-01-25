/**
 * @description: 乾坤 运行时配置
 * @author: M.yunlong
 * @date: 2024-04-05 18:05:16
 */
export const apps = [
    {
        // 表输入
        name: 'JdbcSource',
        entry: 'http://124.223.215.81:10001/',
    },
    {
        // 表输出
        name: 'JdbcSink',
        entry: 'http://124.223.215.81:10002/',
    },
];
