// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前的用户 GET */
export async function currentUser(options?: { [key: string]: any }) {
    return request<{
        data: API.CurrentUser;
    }>('/service-bms/user/getCurrentUser', {
        method: 'GET',
        ...(options || {}),
    });
}

/** 退出登录接口 POST */
export async function outLogin(options?: { [key: string]: any }) {
    return request<Record<string, any>>('/service-bms/login/outLogin', {
        method: 'POST',
        ...(options || {}),
    });
}
