import React, { useState } from 'react';
// 数据流
import { useModel } from '@umijs/max';
// 通过高阶方法 connectMaster() 来获取并消费父应用透传的数据
import { connectMaster } from 'umi';
// antd
import { Button, Drawer, Divider } from 'antd';
// 样式表
import styles from './index.less';

const MianPage: React.FC = (props) => {
    // 数据流
    const { name } = useModel('global');

    //  全局初始 数据流
    const { initialState } = useModel('@@initialState');

    // 抽屉
    const [open, setOpen] = useState(false);

    // 从初始状态里面获取数据
    const { isMicroApp } = initialState || {};

    // 以高阶函数的形式，接收到父应用透传的数据
    console.log(props, '<- connectMaster');

    //  作为 子应用时
    if (isMicroApp) {
        // 当父应用使用 <MicroApp /> 或 <MicroAppWithMemoHistory /> 组件的方式引入子应用时
        // 会额外向子应用传递一个 setLoading() 方法，允许子应用在合适的时机执行，标记子应用加载为完成状态
        (props as { setLoading: (loading: boolean) => void }).setLoading(false);
    }

    // 打开 抽屉
    const showDrawer = () => {
        setOpen(true);
    };
    // 关闭抽屉
    const onClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div className={styles.container}>
                {name}
            </div>
            <Button type="primary" onClick={showDrawer}>
                组件使用帮助
            </Button>
            <Drawer
                title="使用帮助"
                onClose={onClose}
                open={open}
                width={540}
            >
                <div>
                    1： 选数据源 xxx
                </div>
                <Divider />
                <div>
                    2： 配置输出字段 xxx
                </div>
            </Drawer>
        </div>
    );
};

export default connectMaster(MianPage);
