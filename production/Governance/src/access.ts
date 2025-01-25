/**
 * 基于 umi 插件的权限管理方案 @umi/plugin-access ，通过定义权限，使用权限，完成 React 组件内的执行权限控制，渲染权限控制
 * @see https://umijs.org/docs/max/access#access
 * */

interface Foo {
    status: number;
}

export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
    // 获取当前用户信息
    const { currentUser } = initialState ?? {};

    // 权限控制
    return {
        // 只有管理员 才可以访问
        canAdmin: currentUser && currentUser.access === 'admin',
        // 是否 可读
        canReadFoo: true,
        // 是否 可修改
        canUpdateFoo: true,
        // 是否 可删除
        canDeleteFoo: (foo: Foo) => {
            return foo?.status < 1;
        },
        // 是否 可写
        canWriteFoo: true,
        // 是否 可执行
        canExecuteFoo: true,
        // 是否 可查看
        canViewFoo: true,
        // 是否 可创建
        canCreateFoo: true,
        // 是否 可审核
        canAuditFoo: true,
        // 是否 可发布
        canPublishFoo: true,
        // 是否 可下载
        canDownloadFoo: true,
        // 是否 可打印
        canPrintFoo: true,
        // 是否 可分享
        canShareFoo: true,
    };
}
