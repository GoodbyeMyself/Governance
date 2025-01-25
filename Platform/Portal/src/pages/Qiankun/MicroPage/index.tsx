import React from 'react';
// 以组件的形式 注册应用
import { MicroAppWithMemoHistory } from 'umi';

const MicroPage: React.FC = () => {
    /**
     * @description: 注意： autoSetLoading 必须设置，才可以主动关闭 自定义 loading
     * @author: M.yunlong
     * @date: 2024-04-05 21:46:37
     */
    return (
        <MicroAppWithMemoHistory
            name="microapp-auditcenter"
            url="/microapp-auditcenter/home"
            autoSetLoading={true}
        />
    );
};

export default MicroPage;
