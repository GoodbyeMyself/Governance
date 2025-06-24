// React
import React, { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
// umi
import { FormattedMessage, Helmet, SelectLang, history, useIntl, useModel } from '@umijs/max';
// antd
import { Alert, Tabs, message } from 'antd';
import {
    LoginForm,
    ProFormCaptcha,
    ProFormCheckbox,
    ProFormText,
} from '@ant-design/pro-components';
import {
    AlipayCircleOutlined,
    LockOutlined,
    MobileOutlined,
    TaobaoCircleOutlined,
    UserOutlined,
    WeiboCircleOutlined,
} from '@ant-design/icons';
// ahooks
import { useCookieState } from 'ahooks';
// components
import { Footer } from '@/components';
// config
import Settings from '../../../../config/defaultSettings';
// antd style components
import useStyles from './style';
// Api
import { login } from '@/services/api';
import { getFakeCaptcha } from '@/services/login';

const ActionIcons = () => {
    // 获取样式
    const { styles } = useStyles();

    return (
        <>
            <AlipayCircleOutlined key="AlipayCircleOutlined" className={styles.action} />
            <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={styles.action} />
            <WeiboCircleOutlined key="WeiboCircleOutlined" className={styles.action} />
        </>
    );
};

const Lang = () => {
    // 获取样式
    const { styles } = useStyles();

    return (
        <div className={styles.lang} data-lang>
            {SelectLang && <SelectLang />}
        </div>
    );
};

const LoginMessage: React.FC<{
    content: string;
}> = ({ content }) => {
    return (
        <Alert
            style={{
                marginBottom: 24,
            }}
            message={content}
            type="error"
            showIcon
        />
    );
};

const Login: React.FC = () => {

    // 国际化
    const intl = useIntl();

    //  全局初始 数据流
    const { initialState, setInitialState } = useModel('@@initialState');

    //  子应用 通过 Model 获取主应用 数据流
    const masterProps = useModel('@@qiankunStateFromMaster');

    // 登陆状态
    const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});

    // 类型
    const [type, setType] = useState<string>('account');

    // 样式表
    const { styles } = useStyles();

    // 获取 cookie
    const [, setToken] = useCookieState('X-Request-Auth');

    // 从初始状态里面获取数据
    const { isMicroApp } = initialState || {};

    useEffect(() => {
        if (isMicroApp) {
            // 当父应用使用 <MicroApp /> 或 <MicroAppWithMemoHistory /> 组件的方式引入子应用时
            // 会额外向子应用传递一个 setLoading() 方法，允许子应用在合适的时机执行，标记子应用加载为完成状态
            masterProps.setLoading(false);
        } else {
            // 主应用内部: 如果已经登陆了 要跳转出去
            if (initialState?.currentUser) {
                history.push('/');
            }
        }
    },[])

    // 获取用户 信息
    const fetchUserInfo = async () => {
        const userInfo = await initialState?.fetchUserInfo?.();
        if (userInfo) {
            flushSync(() => {
                setInitialState((s) => ({
                    ...s,
                    currentUser: userInfo,
                }));
            });
        }
    };

    // 执行 登陆
    const handleSubmit = async (values: API.LoginParams) => {
        
        console.log(values, 'login');

        try {
            // 登录
            const msg = await login({ ...values, type });
            // 登陆 状态判断
            if (msg.status === 'ok') {
                // 存储 token
                setToken('123456789', {
                    path: '/',
                    sameSite: 'strict',
                });

                // message
                const defaultLoginSuccessMessage = intl.formatMessage({
                    id: 'pages.login.success',
                    defaultMessage: '登录成功！',
                });
                message.success(defaultLoginSuccessMessage);

                /**
                 * @description: 判断是否 作为子应用 挂载
                 * @author: M.yunlong
                 * @date: 2024-04-10 17:48:39
                 */
                if (isMicroApp) {
                    // 主应用 执行更新
                    masterProps.setTokenState({
                        ...masterProps.tokenState,
                        token: '123456789',
                    });
                    // --
                    return;
                } else {
                    await fetchUserInfo();
                    // 获取跳转
                    const urlParams = new URL(window.location.href).searchParams;
                    // 重定向 活着 根目录
                    history.push(urlParams.get('redirect') || '/');
                    // --
                    return;
                }
            }
            // 如果失败去设置用户错误信息
            setUserLoginState(msg);
        } catch (error) {
            const defaultLoginFailureMessage = intl.formatMessage({
                id: 'pages.login.failure',
                defaultMessage: '登录失败，请重试！',
            });
            console.log(error);
            message.error(defaultLoginFailureMessage);
        }
    };

    const { status, type: loginType } = userLoginState;

    return (
        <div className={styles.container}>
            <Helmet>
                <title>
                    {intl.formatMessage({
                        id: 'menu.login',
                        defaultMessage: '登录页',
                    })}
                    - {Settings.title}
                </title>
            </Helmet>
            <Lang />
            <div
                style={{
                    flex: '1',
                    padding: '32px 0',
                }}
            >
                <LoginForm
                    contentStyle={{
                        minWidth: 280,
                        maxWidth: '75vw',
                    }}
                    logo={<img alt="logo" src="./logo.svg" />}
                    title="SDC GOVERN"
                    subTitle={intl.formatMessage({
                        id: 'pages.layouts.userLayout.title',
                    })}
                    initialValues={{
                        autoLogin: true,
                    }}
                    actions={[
                        <FormattedMessage
                            key="loginWith"
                            id="pages.login.loginWith"
                            defaultMessage="其他登录方式"
                        />,
                        <ActionIcons key="icons" />,
                    ]}
                    onFinish={async (values) => {
                        await handleSubmit(values as API.LoginParams);
                    }}
                >
                    <Tabs
                        activeKey={type}
                        onChange={setType}
                        centered
                        items={[
                            {
                                key: 'account',
                                label: intl.formatMessage({
                                    id: 'pages.login.accountLogin.tab',
                                    defaultMessage: '账户密码登录',
                                }),
                            },
                            {
                                key: 'mobile',
                                label: intl.formatMessage({
                                    id: 'pages.login.phoneLogin.tab',
                                    defaultMessage: '手机号登录',
                                }),
                            },
                        ]}
                    />

                    {status === 'error' && loginType === 'account' && (
                        <LoginMessage
                            content={intl.formatMessage({
                                id: 'pages.login.accountLogin.errorMessage',
                                defaultMessage: '账户或密码错误(admin/ant.design)',
                            })}
                        />
                    )}
                    {type === 'account' && (
                        <>
                            <ProFormText
                                name="username"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <UserOutlined />,
                                }}
                                placeholder={intl.formatMessage({
                                    id: 'pages.login.username.placeholder',
                                    defaultMessage: '用户名: admin or user',
                                })}
                                rules={[
                                    {
                                        required: true,
                                        message: (
                                            <FormattedMessage
                                                id="pages.login.username.required"
                                                defaultMessage="请输入用户名!"
                                            />
                                        ),
                                    },
                                ]}
                            />
                            <ProFormText.Password
                                name="password"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined />,
                                }}
                                placeholder={intl.formatMessage({
                                    id: 'pages.login.password.placeholder',
                                    defaultMessage: '密码: ant.design',
                                })}
                                rules={[
                                    {
                                        required: true,
                                        message: (
                                            <FormattedMessage
                                                id="pages.login.password.required"
                                                defaultMessage="请输入密码！"
                                            />
                                        ),
                                    },
                                ]}
                            />
                        </>
                    )}

                    {status === 'error' && loginType === 'mobile' && (
                        <LoginMessage content="验证码错误" />
                    )}
                    {type === 'mobile' && (
                        <>
                            <ProFormText
                                fieldProps={{
                                    size: 'large',
                                    prefix: <MobileOutlined />,
                                }}
                                name="mobile"
                                placeholder={intl.formatMessage({
                                    id: 'pages.login.phoneNumber.placeholder',
                                    defaultMessage: '手机号',
                                })}
                                rules={[
                                    {
                                        required: true,
                                        message: (
                                            <FormattedMessage
                                                id="pages.login.phoneNumber.required"
                                                defaultMessage="请输入手机号！"
                                            />
                                        ),
                                    },
                                    {
                                        pattern: /^1\d{10}$/,
                                        message: (
                                            <FormattedMessage
                                                id="pages.login.phoneNumber.invalid"
                                                defaultMessage="手机号格式错误！"
                                            />
                                        ),
                                    },
                                ]}
                            />
                            <ProFormCaptcha
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined />,
                                }}
                                captchaProps={{
                                    size: 'large',
                                }}
                                placeholder={intl.formatMessage({
                                    id: 'pages.login.captcha.placeholder',
                                    defaultMessage: '请输入验证码',
                                })}
                                captchaTextRender={(timing, count) => {
                                    if (timing) {
                                        return `${count} ${intl.formatMessage({
                                            id: 'pages.getCaptchaSecondText',
                                            defaultMessage: '获取验证码',
                                        })}`;
                                    }
                                    return intl.formatMessage({
                                        id: 'pages.login.phoneLogin.getVerificationCode',
                                        defaultMessage: '获取验证码',
                                    });
                                }}
                                name="captcha"
                                rules={[
                                    {
                                        required: true,
                                        message: (
                                            <FormattedMessage
                                                id="pages.login.captcha.required"
                                                defaultMessage="请输入验证码！"
                                            />
                                        ),
                                    },
                                ]}
                                onGetCaptcha={async (phone) => {
                                    const result = await getFakeCaptcha({
                                        phone,
                                    });
                                    if (!result) {
                                        return;
                                    }
                                    message.success('获取验证码成功！验证码为：1234');
                                }}
                            />
                        </>
                    )}
                    <div
                        style={{
                            marginBottom: 24,
                        }}
                    >
                        <ProFormCheckbox noStyle name="autoLogin">
                            <FormattedMessage
                                id="pages.login.rememberMe"
                                defaultMessage="自动登录"
                            />
                        </ProFormCheckbox>
                        <a
                            style={{
                                float: 'right',
                            }}
                        >
                            <FormattedMessage
                                id="pages.login.forgotPassword"
                                defaultMessage="忘记密码"
                            />
                        </a>
                    </div>
                </LoginForm>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
