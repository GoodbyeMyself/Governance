// umi 内置请求
import { request } from '@umijs/max';
// 声明文件
import type { CurrentUser, ListItemDataType } from './index.d';

export async function queryCurrent(): Promise<{ data: CurrentUser }> {
    return request('/api/currentUserDetail');
}

export async function queryFakeList(params: {
    count: number;
}): Promise<{ data: { list: ListItemDataType[] } }> {
    return request('/api/fake_list_Detail', {
        params,
    });
}
