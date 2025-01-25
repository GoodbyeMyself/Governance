import React, { useEffect, useState } from 'react';
// 权限控制
import { Access, useAccess } from '@umijs/max';
// antd
import { Button, Card, Col, Modal, Row } from 'antd';
// 组件引入子应用
import { MicroAppWithMemoHistory } from 'umi';

const Microapp: React.FC = () => {
    const access = useAccess();

    // 弹窗
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 表输入
    const [microAppName, setMicroAppName] = useState('JdbcSource');
    // 表输出
    const [microAppUrl, setMicroAppUrl] = useState('/JdbcSource/main');

    // 假设你有一个处理按钮点击的函数
    const handleButtonClick: (name: string, url: string) => void = (
        name,
        url,
    ) => {
        // 设置 应用 名称
        setMicroAppName(name);
        // 设置 应用 地址
        setMicroAppUrl(url);
        // 打开弹窗
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    /**
     * @description: 参数的形式 透传数据 到 子应用
     * @author: M.yunlong
     * @date: 2024-04-08 16:36:39
     */
    const [microAppState, setMicroAppState] = useState<any>({
        taskid: '42342342342334234',
        test: '3333',
    });

    // 数据发生变化后
    useEffect(() => {
        // todo
        console.log('microAppState changed!', microAppState);
    }, [microAppState]);

    return (
        <div>
            <Row gutter={24}>
                <Col lg={24} md={24}>
                    <Card>
                        <Access accessible={access.canSeeAdmin}>
                            <Button
                                type="primary"
                                onClick={() =>
                                    handleButtonClick(
                                        'JdbcSource',
                                        '/JdbcSource/main',
                                    )
                                }
                            >
                                表输入 - JdbcSource
                            </Button>
                        </Access>
                    </Card>
                </Col>
                <Col lg={24} md={24}>
                    <Card>
                        <Access accessible={access.canSeeAdmin}>
                            <Button
                                type="primary"
                                onClick={() =>
                                    handleButtonClick(
                                        'JdbcSink',
                                        '/JdbcSink/main',
                                    )
                                }
                            >
                                表输出 - JdbcSink
                            </Button>
                        </Access>
                    </Card>
                </Col>
            </Row>
            <Modal
                title="插件"
                width={900}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                {/* 
                    2024-04-10
                    这里 autoSetLoading 注释掉，在 数据质量内部 合适的时机 执行 props.setLoading(false); 
                    ---
                    2024-04-17
                    这里 先不注释了 ：原因如下，内部 路由 切换时，会触发 onOk，导致 loading 显示，就变成 俩 loading 了
                */}
                <MicroAppWithMemoHistory
                    name={microAppName}
                    url={microAppUrl}
                    className="pluginContainer"
                    autoSetLoading={true}
                    microAppState={microAppState}
                    setMicroAppState={setMicroAppState}
                />
            </Modal>
        </div>
    );
};

export default Microapp;
