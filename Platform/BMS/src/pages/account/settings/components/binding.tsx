// react
import React, { Fragment } from 'react';
// antd
import { List } from 'antd';
import {
    AlipayOutlined,
    DingdingOutlined,
    TaobaoOutlined
} from '@ant-design/icons';

const BindingView: React.FC = () => {

    // list data
    const getData = () => [
        {
            title: '绑定淘宝',
            description: '当前未绑定淘宝账号',
            actions: [<a key="Bind">绑定</a>],
            avatar: <TaobaoOutlined className="taobao" />,
        },
        {
            title: '绑定支付宝',
            description: '当前未绑定支付宝账号',
            actions: [<a key="Bind">绑定</a>],
            avatar: <AlipayOutlined className="alipay" />,
        },
        {
            title: '绑定钉钉',
            description: '当前未绑定钉钉账号',
            actions: [<a key="Bind">绑定</a>],
            avatar: <DingdingOutlined className="dingding" />,
        },
    ];

    return (
        <Fragment>
            <List
                itemLayout="horizontal"
                dataSource={getData()}
                renderItem={(item) => (
                    <List.Item actions={item.actions}>
                        <List.Item.Meta
                            avatar={item.avatar}
                            title={item.title}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />
        </Fragment>
    );
};

export default BindingView;
