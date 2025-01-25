import React, { useEffect, useState } from 'react';
// 权限控制
import { Access, useAccess } from '@umijs/max';
// antd
import { Button, Card, Col, Drawer, Modal, Row } from 'antd';
// 组件引入子应用
import { MicroAppWithMemoHistory } from 'umi';

const Microapp: React.FC = () => {
    const access = useAccess();

    // 弹窗
    const [isModalOpen, setIsModalOpen] = useState(false);
    // 抽屉
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // 打开 抽屉
    const showDrawer = () => {
        setOpen(true);
    };
    // 关闭抽屉
    const onClose = () => {
        setOpen(false);
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
        // 关闭质量
        setOpen(false);
    }, [microAppState]);

    return (
        <div>
            <Row gutter={24}>
                <Col lg={24} md={24}>
                    <Card>
                        <Access accessible={access.canSeeAdmin}>
                            <Button type="primary" onClick={showModal}>
                                admin 打开 微应用 数据服务
                            </Button>
                        </Access>
                    </Card>
                </Col>
                <Col lg={24} md={24}>
                    <Card>
                        <Button type="primary" onClick={showDrawer}>
                            打开 微应用 数据质量
                        </Button>
                    </Card>
                </Col>
            </Row>
            <div>任务ID： {microAppState.taskid}</div>
            <Modal
                title="数据服务"
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
                    name="microapp-service"
                    url="/microapp-service/home"
                    className="microappContainer"
                    autoSetLoading={true}
                    microAppState={microAppState}
                    setMicroAppState={setMicroAppState}
                />
            </Modal>
            <Drawer title="数据质量" onClose={onClose} open={open}>
                {/*
                    2024-04-10
                    这里 autoSetLoading 注释掉，在 数据质量内部 合适的时机 执行 props.setLoading(false); 
                    ---
                    2024-04-17
                    这里 先不注释了 ：原因如下，内部 路由 切换时，会触发 onOk，导致 loading 显示，就变成 俩 loading 了
                */}
                <MicroAppWithMemoHistory
                    name="microapp-quality"
                    url="/microapp-quality/home"
                    className="microappContainer"
                    autoSetLoading={true}
                    microAppState={microAppState}
                    setMicroAppState={setMicroAppState}
                />
            </Drawer>
        </div>
    );
};

export default Microapp;
