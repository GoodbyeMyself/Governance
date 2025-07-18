// @ts-nocheck
import {
    ComponentTreeWidget,
    CompositePanel,
    Designer,
    DesignerToolsWidget,
    HistoryWidget,
    OutlineTreeWidget,
    ResourceWidget,
    SettingsPanel,
    StudioPanel,
    ToolbarPanel,
    ViewPanel,
    ViewToolsWidget,
    ViewportPanel,
    Workspace,
    WorkspacePanel,
} from '@designable/react';

import React, { useMemo, useEffect } from 'react';

import { SettingsForm, setNpmCDNRegistry } from '@designable/react-settings-form';

import { GlobalRegistry, KeyCode, Shortcut, createDesigner } from '@designable/core';

import {
    ActionsWidget,
    // LogoWidget,
    MarkupSchemaWidget,
    PreviewWidget,
    SchemaEditorWidget,
} from './widgets';

import { loadInitialSchema, saveSchema } from './service';

import {
    ArrayCards,
    ArrayTable,
    Card,
    Cascader,
    Checkbox,
    DatePicker,
    Field,
    Form,
    FormCollapse,
    FormGrid,
    FormLayout,
    FormTab,
    Input,
    NumberPicker,
    ObjectContainer,
    Password,
    Radio,
    Rate,
    Select,
    Slider,
    Space,
    Switch,
    Text,
    TimePicker,
    Transfer,
    TreeSelect,
    Upload,
} from './source';

import {
    // TextWidget,
    useDesigner
} from '@designable/react';

import { Button } from 'antd';

setNpmCDNRegistry('//unpkg.com');

GlobalRegistry.registerDesignerLocales({
    'zh-CN': {
        sources: {
            Inputs: '输入控件',
            Layouts: '布局组件',
            Arrays: '自增组件',
            Displays: '展示组件',
        },
    },
    'en-US': {
        sources: {
            Inputs: 'Inputs',
            Layouts: 'Layouts',
            Arrays: 'Arrays',
            Displays: 'Displays',
        },
    },
});

const DesignerPage: React.FC = () => {

    const engine = useMemo(
        () =>
            createDesigner({
                shortcuts: [
                    new Shortcut({
                        codes: [
                            [KeyCode.Meta, KeyCode.S],
                            [KeyCode.Control, KeyCode.S],
                        ],
                        handler(ctx) {
                            saveSchema(ctx.engine);
                        },
                    }),
                ],
                rootComponentName: 'Form',
            }),
        [],
    );

    const designer = useDesigner();

    useEffect(() => {
        loadInitialSchema(designer);
    }, []);
    
    return (
        <Designer engine={engine}>
            {/* 
                此处 不展示 ActionsWidget： 保存移动到 设计器内部 工具栏
                <StudioPanel actions={<ActionsWidget />}> 
            */}
            <StudioPanel>
                <CompositePanel>
                    <CompositePanel.Item title="panels.Component" icon="Component">
                        <ResourceWidget
                            title="sources.Inputs"
                            sources={[
                                Input,
                                Password,
                                NumberPicker,
                                Rate,
                                Slider,
                                Select,
                                TreeSelect,
                                Cascader,
                                Transfer,
                                Checkbox,
                                Radio,
                                DatePicker,
                                TimePicker,
                                Upload,
                                Switch,
                                ObjectContainer,
                            ]}
                        />
                        <ResourceWidget
                            title="sources.Layouts"
                            sources={[Card, FormGrid, FormTab, FormLayout, FormCollapse, Space]}
                        />
                        <ResourceWidget title="sources.Arrays" sources={[ArrayCards, ArrayTable]} />
                        <ResourceWidget title="sources.Displays" sources={[Text]} />
                    </CompositePanel.Item>
                    <CompositePanel.Item title="panels.OutlinedTree" icon="Outline">
                        <OutlineTreeWidget />
                    </CompositePanel.Item>
                    <CompositePanel.Item title="panels.History" icon="History">
                        <HistoryWidget />
                    </CompositePanel.Item>
                </CompositePanel>
                <Workspace id="form">
                    <WorkspacePanel>
                        <ToolbarPanel>
                            {/* 设计器 回退等功能 */}
                            <DesignerToolsWidget />
                            {/* 顶部工具栏 */}
                            <ActionsWidget/>
                            {/* 预览、查看代码、schema */}
                            <ViewToolsWidget
                                use={['DESIGNABLE', 'JSONTREE', 'MARKUP', 'PREVIEW']}
                            />
                        </ToolbarPanel>
                        <ViewportPanel style={{ height: '100%' }}>
                            <ViewPanel type="DESIGNABLE">
                                {() => (
                                    <ComponentTreeWidget
                                        components={{
                                            Form,
                                            Field,
                                            Input,
                                            Select,
                                            TreeSelect,
                                            Cascader,
                                            Radio,
                                            Checkbox,
                                            Slider,
                                            Rate,
                                            NumberPicker,
                                            Transfer,
                                            Password,
                                            DatePicker,
                                            TimePicker,
                                            Upload,
                                            Switch,
                                            Text,
                                            Card,
                                            ArrayCards,
                                            ArrayTable,
                                            Space,
                                            FormTab,
                                            FormCollapse,
                                            FormGrid,
                                            FormLayout,
                                            ObjectContainer,
                                        }}
                                    />
                                )}
                            </ViewPanel>
                            <ViewPanel type="JSONTREE" scrollable={false}>
                                {(tree, onChange) => (
                                    <SchemaEditorWidget tree={tree} onChange={onChange} />
                                )}
                            </ViewPanel>
                            <ViewPanel type="MARKUP" scrollable={false}>
                                {(tree) => <MarkupSchemaWidget tree={tree} />}
                            </ViewPanel>
                            <ViewPanel type="PREVIEW">
                                {(tree) => <PreviewWidget tree={tree} />}
                            </ViewPanel>
                        </ViewportPanel>
                    </WorkspacePanel>
                </Workspace>
                <SettingsPanel title="panels.PropertySettings">
                    <SettingsForm uploadAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" />
                </SettingsPanel>
            </StudioPanel>
        </Designer>
    );
};

export default DesignerPage;
