// umi
import { request } from '@umijs/max';
// ts 类型说明
import type { CurrentUser, GeographicItemType } from './data';

// 省份
const province = require('./geographic/province.json');
// 城市
const city = require('./geographic/city.json');

/**
 * @description: 获取 当前用户信息
 * @author: M.yunlong
 * @date: 2024-04-16 17:36:36
*/
export async function queryCurrent(): Promise<{ data: CurrentUser }> {
    return request('/service-bms/user/getCurrentUser');
}

/**
 * @description: 获取 省份
 * @author: M.yunlong
 * @date: 2024-04-16 17:36:52
*/
export async function queryProvince(): Promise<{ data: GeographicItemType[] }> {
    return {
        data: province
    };
}

/**
 * @description: 获取 城市
 * @author: M.yunlong
 * @date: 2024-04-16 17:37:07
*/
export async function queryCity(province: string): Promise<{ data: GeographicItemType[] }> {
    return {
        data: city[province],
    };
}
