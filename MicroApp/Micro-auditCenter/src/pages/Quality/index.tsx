import React from 'react';
// 组件引入子应用
import { MicroAppWithMemoHistory } from 'umi';

const Quality: React.FC = () => {
    return (
        <div>
            <MicroAppWithMemoHistory
                name="microapp-quality"
                url="/microapp-quality/table"
                className="microappContainer"
                autoSetLoading={true}
            />
        </div>
    );
};

export default Quality;
