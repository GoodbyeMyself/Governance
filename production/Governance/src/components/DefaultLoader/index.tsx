import { Spin } from 'antd';

export default function (loading: boolean) {
    /**
     * @description: 主动处理 加载 loading
     * @author: M.yunlong
     * @date: 2024-04-05 21:45:21
     */
    return loading ? (
        <div
            style={{
                height: '320px',
                lineHeight: '320px',
                textAlign: 'center',
                backgroundColor: '#fff',
            }}
        >
            <Spin spinning={loading} />
        </div>
    ) : null;
}
