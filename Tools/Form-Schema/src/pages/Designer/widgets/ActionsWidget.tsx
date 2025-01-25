import { GlobalRegistry } from '@designable/core';
import { TextWidget, useDesigner } from '@designable/react';
import { observer } from '@formily/react';
import { Button, Space } from 'antd';
import { useEffect } from 'react';
import { loadInitialSchema, saveSchema } from '../service';

export const ActionsWidget = observer(() => {

    const designer = useDesigner();

    useEffect(() => {
        loadInitialSchema(designer);
    }, []);

    const supportLocales = ['zh-cn', 'en-us'];

    useEffect(() => {
        if (!supportLocales.includes(GlobalRegistry.getDesignerLanguage())) {
            GlobalRegistry.setDesignerLanguage('zh-cn');
        }
    }, []);

    return (
        <Space style={{
            marginLeft: 10,
            float: 'right',
        }}>
            {/* 国际化 切换 */}
            {/* <Radio.Group
                value={GlobalRegistry.getDesignerLanguage()}
                optionType="button"
                options={[
                    { label: 'English', value: 'en-us' },
                    { label: '简体中文', value: 'zh-cn' },
                ]}
                onChange={(e) => {
                    GlobalRegistry.setDesignerLanguage(e.target.value);
                }}
            /> */}
            <Button
                onClick={() => {
                    saveSchema(designer);
                }}
                size="small"
            >
                <TextWidget>Save</TextWidget>
            </Button>
        </Space>
    );
});
