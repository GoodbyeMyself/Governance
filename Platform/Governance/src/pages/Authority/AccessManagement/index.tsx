import React from 'react';
// ant design 组件
import { Divider } from 'antd';
// umi max 提供的 权限管理方案
import { Access, useAccess } from '@umijs/max';

const AccessManagement: React.FC = () => {
    const foo = {
        // 状态 为 0 时可以删除
        status: 0,
    };

    const access = useAccess();

    // 权限测试
    if (access.canReadFoo) {
        console.log('canReadFoo', '<- 存在可读性');
    }

    return (
        <div>
            <Divider orientation="left" plain>
                分割线
            </Divider>
            <Access
                accessible={access.canReadFoo}
                fallback={
                    <div>
                        {/* 无权限 ：会展示的内容 */}
                        Can not read foo content.
                    </div>
                }
            >
                {/* 有权限时会展示的内容 */}
                Foo content.
            </Access>
            <Divider orientation="left" plain>
                分割线
            </Divider>
            <Access accessible={access.canUpdateFoo} fallback={<div>Can not update foo.</div>}>
                Update foo.
            </Access>
            <Divider orientation="left" plain>
                分割线
            </Divider>
            <Access accessible={access.canDeleteFoo(foo)} fallback={<div>Can not delete foo.</div>}>
                Delete foo.
            </Access>
        </div>
    );
};

export default AccessManagement;
