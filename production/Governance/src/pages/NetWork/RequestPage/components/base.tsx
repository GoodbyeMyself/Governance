import React from 'react';
// Ant design 组件
import { Card, Col, Row } from 'antd';
// umi 结合 axios 封装 内置 hook
import { useRequest } from '@umijs/max';
// 接口服务
import { queryCurrent } from '../service';

const RequsetPage: React.FC = () => {
    /**
     * @description: 测试请求： 这里面的 data 相当于解构赋值给 currentUser 了
     * @author: M.yunlong
     * @date: 2024-03-23 16:28:51
     */
    const { data: currentUser, loading } = useRequest(() => {
        // 一个测试请求
        return queryCurrent();
    });

    if (currentUser) {
        console.log(currentUser, '<- 打印 currentUser');
    }

    return (
        <Row gutter={24}>
            <Col lg={8} md={24}>
                <Card>
                    {/* 一种 结构化 展示形式 */}
                    {!loading && currentUser && <div>{currentUser.name}</div>}
                </Card>
            </Col>
            <Col lg={16} md={24}>
                <Card>
                    {/* 一种 结构化 展示形式 */}
                    {!loading && currentUser && <div>{currentUser.address}</div>}
                </Card>
            </Col>
        </Row>
    );
};

export default RequsetPage;
