// React
import React, { Fragment } from 'react';
// antd
import { List, Switch } from 'antd';

// TypeScript 的泛型工具类型，通常用于解包数组类型
// T extends (infer U)[] ? U : T：这是一个条件类型（conditional type），用于根据泛型类型 T 是否为数组来进行类型推断。
// 如果 T 是数组类型 (infer U)[]，则返回数组中元素的类型 U；否则，返回 T 自身的类型。
type Unpacked<T> = T extends (infer U)[] ? U : T;

const NotificationView: React.FC = () => {

    const getData = () => {
        const Action = <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />;
        return [
            {
                title: '账户密码',
                description: '其他用户的消息将以站内信的形式通知',
                actions: [Action],
            },
            {
                title: '系统消息',
                description: '系统消息将以站内信的形式通知',
                actions: [Action],
            },
            {
                title: '待办任务',
                description: '待办任务将以站内信的形式通知',
                actions: [Action],
            },
        ];
    };

    const data = getData();
    
    return (
        <Fragment>
            <List<Unpacked<typeof data>>
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                    <List.Item actions={item.actions}>
                        <List.Item.Meta title={item.title} description={item.description} />
                    </List.Item>
                )}
            />
        </Fragment>
    );
};

export default NotificationView;
