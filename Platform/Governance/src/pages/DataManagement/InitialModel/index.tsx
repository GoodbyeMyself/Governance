import React from 'react';
// ant design 组件
import { Button, Divider } from 'antd';
// umi max 提供的 数据流管理方案
import { useModel } from '@umijs/max';

const InitialModel: React.FC = () => {
    /**
     * @description: 全局初始状态: initialState, loading, error, refresh, setInitialState
     * 具体参考链接： https://umijs.org/docs/max/data-flow
     * @author: M.yunlong
     * @date: 2024-03-20 18:00:54
     */
    const { initialState, setInitialState } = useModel('@@initialState');

    // 从初始状态里面获取数据
    const { testInitialState } = initialState || {};

    // 命名空间 数据流
    const { testModel, counter, increment, decrement } = useModel('useGlobalModels');

    return (
        <div>
            <Divider orientation="left" plain>
                全局初始状态测试
            </Divider>
            <div>{testInitialState?.testinit}</div>
            <Button
                onClick={() => {
                    setInitialState((s) => ({
                        ...s,
                        testInitialState: {
                            testinit: '20',
                        },
                    }));
                }}
            >
                修改初始 状态 10 - 20
            </Button>
            <Button
                onClick={() => {
                    setInitialState((s) => ({
                        ...s,
                        testInitialState: {
                            testinit: '10',
                        },
                    }));
                }}
            >
                修改初始 状态 20 - 10
            </Button>
            <Divider orientation="left" plain>
                获取 命名空间 数据流
            </Divider>
            <div>{testModel.work}</div>
            <Divider orientation="left" plain>
                hook 操作 命名空间 数据流测试
            </Divider>
            <div>{counter}</div>
            <Button onClick={() => increment()}>增加</Button>
            <Button onClick={() => decrement()}>减少</Button>
        </div>
    );
};

export default InitialModel;
