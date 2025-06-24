/**
 * @description: 乾坤 运行时配置
 * @author: M.yunlong
 * @date: 2024-04-05 18:05:16
 */
export const apps = [
    {
        // BMS 基础管理
        name: 'bms',
        entry: '//localhost:5002',
        // entry: 'http://124.223.215.81:5001/',
    },
    {
        // 微应用 审核中心
        name: 'microapp-auditcenter',
        // entry: '//localhost:9001',
        entry: 'http://124.223.215.81:9001/',
    },
    {
        // 微应用 数据质量
        name: 'microapp-quality',
        // entry: '//localhost:9002',
        entry: 'http://124.223.215.81:9002/',
    },
    {
        // 微应用 数据服务
        name: 'microapp-service',
        // entry: '//localhost:9003',
        entry: 'http://124.223.215.81:9003/',
    },
    {
        // 微应用 - 数据集成 - ETL
        name: 'microapp-etl',
        // entry: '//localhost:9003',
        entry: 'http://124.223.215.81:9004/',
    },
];
