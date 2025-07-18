// React
import React from 'react';
// umi
import { useRequest } from '@umijs/max';
// antd
import { Button, Input, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {
    ProForm,
    ProFormDependency,
    ProFormFieldSet,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
} from '@ant-design/pro-components';
// services
import { queryCity, queryCurrent, queryProvince } from '../service';
// 样式表
import useStyles from './index.style';

// 校验
const validatorPhone = (rule: any, value: string[], callback: (message?: string) => void) => {
    if (!value[0]) {
        callback('Please input your area code!');
    }
    if (!value[1]) {
        callback('Please input your phone number!');
    }
    callback();
};

const BaseView: React.FC = () => {

    // 样式表
    const { styles } = useStyles();

    // 头像组件 方便以后独立，增加裁剪之类的功能
    const AvatarView = ({ avatar }: { avatar: string }) => (
        <>
            <div className={styles.avatar_title}>头像</div>
            <div className={styles.avatar}>
                <img src={avatar} alt="avatar" />
            </div>
            <Upload showUploadList={false}>
                <div className={styles.button_view}>
                    <Button>
                        <UploadOutlined />
                        更换头像
                    </Button>
                </div>
            </Upload>
        </>
    );

    // 获取当前用户信息
    const { data: currentUser, loading } = useRequest(() => {
        return queryCurrent();
    });

    // 获取 头像图片
    const getAvatarURL = () => {
        if (currentUser) {
            if (currentUser.avatar) {
                return currentUser.avatar;
            }
            const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
            return url;
        }
        return '';
    };

    // 提示信息
    const handleFinish = async () => {
        message.success('更新基本信息成功');
    };

    return (
        <div className={styles.baseView}>
            {loading ? null : (
                <>
                    <div className={styles.left}>
                        <ProForm
                            layout="vertical"
                            onFinish={handleFinish}
                            submitter={{
                                searchConfig: {
                                    submitText: '更新基本信息',
                                },
                                render: (_, dom) => dom[1],
                            }}
                            initialValues={{
                                ...currentUser,
                                phone: currentUser?.phone.split('-'),
                            }}
                        >
                            <ProFormText
                                width="md"
                                name="email"
                                label="邮箱"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入您的邮箱!',
                                    },
                                ]}
                            />
                            <ProFormText
                                width="md"
                                name="name"
                                label="昵称"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入您的昵称!',
                                    },
                                ]}
                            />
                            <ProFormTextArea
                                name="profile"
                                label="个人简介"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入个人简介!',
                                    },
                                ]}
                                placeholder="个人简介"
                            />
                            <ProFormSelect
                                width="sm"
                                name="country"
                                label="国家/地区"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入您的国家或地区!',
                                    },
                                ]}
                                options={[
                                    {
                                        label: '中国',
                                        value: 'China',
                                    },
                                ]}
                            />

                            <ProForm.Group title="所在省市" size={8}>
                                <ProFormSelect
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入您的所在省!',
                                        },
                                    ]}
                                    width="sm"
                                    fieldProps={{
                                        labelInValue: true,
                                    }}
                                    name="province"
                                    request={async () => {
                                        return queryProvince().then(({ data }) => {
                                            return data.map((item) => {
                                                return {
                                                    label: item.name,
                                                    value: item.id,
                                                };
                                            });
                                        });
                                    }}
                                />
                                <ProFormDependency name={['province']}>
                                    {({ province }) => {
                                        return (
                                            <ProFormSelect
                                                params={{
                                                    key: province?.value,
                                                }}
                                                name="city"
                                                width="sm"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: '请输入您的所在城市!',
                                                    },
                                                ]}
                                                disabled={!province}
                                                request={async () => {
                                                    if (!province?.key) {
                                                        return [];
                                                    }
                                                    return queryCity(province.key || '').then(
                                                        ({ data }) => {
                                                            return data.map((item) => {
                                                                return {
                                                                    label: item.name,
                                                                    value: item.id,
                                                                };
                                                            });
                                                        },
                                                    );
                                                }}
                                            />
                                        );
                                    }}
                                </ProFormDependency>
                            </ProForm.Group>
                            <ProFormText
                                width="md"
                                name="address"
                                label="街道地址"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入您的街道地址!',
                                    },
                                ]}
                            />
                            <ProFormFieldSet
                                name="phone"
                                label="联系电话"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入您的联系电话!',
                                    },
                                    {
                                        validator: validatorPhone,
                                    },
                                ]}
                            >
                                <Input className={styles.area_code} />
                                <Input className={styles.phone_number} />
                            </ProFormFieldSet>
                        </ProForm>
                    </div>
                    <div className={styles.right}>
                        <AvatarView avatar={getAvatarURL()} />
                    </div>
                </>
            )}
        </div>
    );
};

export default BaseView;
