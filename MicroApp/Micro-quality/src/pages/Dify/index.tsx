import {
    addEdge,
    useEdgesState,
    useNodesState,
    Position,
    ReactFlow,
    MiniMap,
    Controls,
    Background,
} from '@xyflow/react';

import React, { useCallback, useEffect, useState } from 'react';

// 数据流
import { useModel } from '@umijs/max';

import '@xyflow/react/dist/style.css';

// 样式表
import styles from './index.less';

// 节点
import ColorSelectorNode from './nodes/ColorSelectorNode';

// 导入类型定义
import { NodeType, EdgeType, ConnectParams } from './types';

const initBgColor = '#c9f1dd';

const snapGrid: [number, number] = [20, 20];

const nodeTypes = {
    selectorNode: ColorSelectorNode,
};

// 缩放比例
const defaultViewport = {
    x: 0,
    y: 0,
    zoom: 1,
};

// 生成唯一 ID 的辅助函数
const generateUniqueId = () => {
    return `e-${Math.random().toString(36).substr(2, 9)}`;
};

const DifyPage: React.FC = () => {
    // 获取全局数据流
    const { name } = useModel('global');

    // 全局初始数据流
    const { initialState } = useModel('@@initialState');

    //  子应用 通过 Model 获取主应用 数据流
    const masterProps = useModel('@@qiankunStateFromMaster');

    // 从初始状态里面获取数据
    const { isMicroApp } = initialState || {};

    // 作为 子应用时
    if (isMicroApp) {
        // 当父应用使用 <MicroApp /> 或 <MicroAppWithMemoHistory /> 组件的方式引入子应用时
        // 会额外向子应用传递一个 setLoading() 方法，允许子应用在合适的时机执行，标记子应用加载为完成状态
        masterProps.setLoading(false);
    }

    // Dify 相关配置
    const [nodes, setNodes, onNodesChange] = useNodesState<NodeType>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<EdgeType>([]);
    const [bgColor, setBgColor] = useState(initBgColor);

    useEffect(() => {
        const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setNodes((nds) =>
                nds.map((node) => {
                    if (node.id !== '2') {
                        return node;
                    }

                    const color = event.target.value;

                    setBgColor(color);

                    return {
                        ...node,
                        data: {
                            ...node.data,
                            color,
                        },
                    };
                }),
            );
        };

        setNodes([
            {
                id: '1',
                type: 'input',
                data: { label: 'An input node' },
                position: { x: 0, y: 50 },
                sourcePosition: Position.Right, // 使用 Position 枚举值
            },
            {
                id: '2',
                type: 'selectorNode',
                data: { onChange: onChange, color: initBgColor },
                position: { x: 300, y: 50 },
            },
            {
                id: '3',
                type: 'output',
                data: { label: 'Output A' },
                position: { x: 650, y: 25 },
                targetPosition: Position.Left, // 使用 Position 枚举值
            },
            {
                id: '4',
                type: 'output',
                data: { label: 'Output B' },
                position: { x: 650, y: 100 },
                targetPosition: Position.Left, // 使用 Position 枚举值
            },
        ]);

        setEdges([
            {
                id: 'e1-2',
                source: '1',
                target: '2',
                animated: true,
            },
            {
                id: 'e2a-3',
                source: '2',
                target: '3',
                sourceHandle: 'a',
                animated: true,
            },
            {
                id: 'e2b-4',
                source: '2',
                target: '4',
                sourceHandle: 'b',
                animated: true,
            },
        ]);
    }, []);

    const onConnect = useCallback(
        (params: ConnectParams) => {
            const newEdge: EdgeType = {
                id: generateUniqueId(),
                source: params.source,
                target: params.target,
                sourceHandle: params.sourceHandle || undefined,
                targetHandle: params.targetHandle || undefined,
                animated: true,
            };
            setEdges((eds) => addEdge(newEdge, eds));
        },
        [],
    );

    return (
        <div className={styles.container}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                // style={{ background: bgColor }}
                nodeTypes={nodeTypes}
                snapToGrid={true}
                snapGrid={snapGrid}
                defaultViewport={defaultViewport}
                // fitView
                attributionPosition="bottom-left"
            >
                <Background />
                <MiniMap
                    nodeStrokeColor={(n) => {
                        if (n.type === 'input') return '#0041d0';
                        if (n.type === 'selectorNode') return '#eee';
                        if (n.type === 'output') return '#ff0072';
                        // 添加默认返回值
                        return '#000'; 
                    }}
                    nodeColor={(n) => {
                        if (n.type === 'selectorNode') return bgColor;
                        return '#fff';
                    }}
                />
                <Controls />
            </ReactFlow>
        </div>
    );
};

export default DifyPage;
