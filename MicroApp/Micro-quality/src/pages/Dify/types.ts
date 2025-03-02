import { Position } from '@xyflow/react';
import React from 'react';

// 定义节点类型
export type NodeType = {
    id: string;
    type: string;
    data: {
        label?: string;
        onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
        color?: string;
    };
    position: {
        x: number;
        y: number;
    };
    sourcePosition?: Position;
    targetPosition?: Position;
};

// 定义边类型
export type EdgeType = {
    id: string;
    source: string;
    target: string;
    sourceHandle?: string;
    targetHandle?: string;
    animated: boolean;
};

// 手动定义 ConnectParams 类型
export type ConnectParams = {
    source: string;
    target: string;
    sourceHandle?: string | null;
    targetHandle?: string | null;
};