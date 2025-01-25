/* eslint-disable */
import { request } from '@umijs/max';

/**  获取用户列表 GET  */
export async function queryUserList(
    params: {
        // query
        /** keyword */
        keyword?: string;
        /** current */
        current?: number;
        /** pageSize */
        pageSize?: number;
    },
    options?: { [key: string]: any },
) {
    return request<API.Result_PageInfo_UserInfo__>(
        '/service-quality/queryUserList',
        {
            method: 'GET',
            params: {
                ...params,
            },
            ...(options || {}),
        },
    );
}

/** 此处后端没有提供注释 POST /api/v1/user */
export async function addUser(
    body?: API.UserInfoVO,
    options?: { [key: string]: any },
) {
    return request<API.Result_UserInfo_>('/service-quality/addUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {}),
    });
}

/** 获取用户详情 */
export async function getUserDetail(
    params: {
        // path
        /** userId */
        userId?: string;
    },
    options?: { [key: string]: any },
) {
    const { userId: param0 } = params;
    return request<API.Result_UserInfo_>(
        `/service-quality/getUserDetail/${param0}`,
        {
            method: 'GET',
            params: {
                ...params,
            },
            ...(options || {}),
        },
    );
}

/** 修改用户 */
export async function modifyUser(
    params: {
        // path
        /** userId */
        userId?: string;
    },
    body?: API.UserInfoVO,
    options?: { [key: string]: any },
) {
    const { userId: param0 } = params;
    return request<API.Result_UserInfo_>(
        `/service-quality/modifyUser/${param0}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                ...params,
            },
            data: body,
            ...(options || {}),
        },
    );
}

/** 删除用户 */
export async function deleteUser(
    params: {
        // path
        /** userId */
        userId?: string;
    },
    options?: { [key: string]: any },
) {
    const { userId: param0 } = params;
    return request<API.Result_string_>(
        `/service-quality/deleteUser/${param0}`,
        {
            method: 'DELETE',
            params: {
                ...params,
            },
            ...(options || {}),
        },
    );
}
