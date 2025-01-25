import React, { useEffect, useState } from 'react';
// umi
import { history, useModel } from '@umijs/max';
// 组件引入子应用
import { MicroAppWithMemoHistory } from 'umi';
// 立即更新
import { flushSync } from 'react-dom';

/**
 * @description: 承接 BMS 子应用
 * @author: M.yunlong
 * @date: 2024-04-10 17:23:26
 */
const Login: React.FC = () => {
    // 全局初始数据流
    const { initialState, setInitialState } = useModel('@@initialState');

    const fetchUserInfo = async () => {
        // 获取用户信息
        const userInfo = await initialState?.fetchUserInfo?.();
        // 更新
        if (userInfo) {
            // 更新 信息
            flushSync(() => {
                setInitialState((s) => ({
                    ...s,
                    currentUser: userInfo,
                }));
            });
            // 获取 url 参数
            const urlParams = new URL(window.location.href).searchParams;
            // 跳转
            history.push(urlParams.get('redirect') || '/');
        }
    };

    /**
     * @description: 参数的形式 透传数据 到 子应用
     * @author: M.yunlong
     * @date: 2024-04-08 16:36:39
     */
    const [tokenState, setTokenState] = useState<any>({
        token: '',
    });

    // 数据发生变化后
    useEffect(() => {
        // 跳转
        if (tokenState.token !== '') {
            // 获取 token 本地存储更新一下
            // todo

            // 获取用户信息 + 执行跳转
            fetchUserInfo();
        }
    }, [tokenState]);

    return (
        <div>
            {/* 这里 autoSetLoading 注释掉，在 数据质量内部 合适的时机 执行 masterProps.setLoading(false); */}
            <MicroAppWithMemoHistory
                name="bms"
                url="/bms/Login"
                className="microappContainer"
                // autoSetLoading={true}
                tokenState={tokenState}
                setTokenState={setTokenState}
            />
        </div>
    );
};

export default Login;
