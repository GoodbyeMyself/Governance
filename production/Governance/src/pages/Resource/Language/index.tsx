import React from 'react';
// antd 组件
import { Alert, Divider } from 'antd';
// umi max 提供的 国际化 组件
import { FormattedMessage } from '@umijs/max';
// umi 提供的 hook
import { getAllLocales, getLocale, useIntl } from 'umi';

const LangeuagePage: React.FC = () => {
    const intl = useIntl();

    // 获取国际化
    const msg = intl.formatMessage({
        id: 'welcome',
    });

    // 获取国际化：存在变量
    const msgVariable = intl.formatMessage(
        {
            id: 'languageVariable',
        },
        {
            name: '张三',
            sport: '足球',
        },
    );

    console.log('当前的 语言环境', getLocale());

    console.log('所有的 语言环境', getAllLocales());

    return (
        <div>
            <Divider orientation="left" plain>
                {/* 注意：此组件 脱离了 React 的生命周期，最严重的问题就是切换语言时无法触发 DOM 的重新渲染 */}
                umi max 提供的 国际化 组件 : FormattedMessage
            </Divider>
            <FormattedMessage id="welcome"></FormattedMessage>
            <Divider orientation="left" plain>
                在组件的参数中 使用国际化
            </Divider>
            <Alert message={msg} type="success" />
            <Divider orientation="left" plain>
                在组件的参数中 使用国际化, 动态参数 设置
            </Divider>
            <FormattedMessage
                id="languageVariable"
                values={{
                    name: '张三',
                    sport: '足球',
                }}
            ></FormattedMessage>
            <Divider orientation="left" plain>
                umi 提供的 intl 动态参数 设置
            </Divider>
            <Alert message={msgVariable} type="success" />
        </div>
    );
};

export default LangeuagePage;
