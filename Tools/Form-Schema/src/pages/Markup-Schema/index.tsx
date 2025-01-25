// React
import React from 'react';
// antd style
import useStyles from './style';
// formily 核心
import { createForm } from '@formily/core';
// formily ui 桥接
import { FormProvider, FormConsumer, Field } from '@formily/react';
// formily antd
import {
    FormItem,
    FormLayout,
    Input,
    FormButtonGroup,
    Submit,
} from '@formily/antd';
// antd
import { Card } from 'antd';

// 创建 form 表单: 用来创建表单核心领域模型，它是作为 MVVM 设计模式的标准 ViewModel
const form = createForm();

interface FormData {
    // 定义 data 的结构
    Input?: string;
}

const DemoPage: React.FC = () => {

    // 提交
    const handleSubmit = (data: FormData) => {
        console.log(data, '<- 打印 FormData');
    };

    return (
        <div style={{
            padding: '24px'
        }}>
            <Card
                style={{
                    borderRadius: 8,
                }}
            >
                {/* FormProvider组件是作为视图层桥接表单模型的入口， */}
                {/* 它只有一个参数，就是接收 createForm 创建出来的 Form 实例，并将 Form 实例以上下文形式传递到子组件中 */}
                <FormProvider form={form}>
                    {/* FormLayout 组件是用来批量控制 FormItem 样式的组件，这里我们指定布局为上下布局，也就是标签在上，组件在下 */}
                    <FormLayout layout="vertical">
                        <Field
                            name="input"
                            title="输入框"
                            required
                            initialValue="Hello world"
                            decorator={[FormItem]}
                            component={[Input]}
                        />
                    </FormLayout>
                    {/* FormConsumer组件是作为响应式模型的响应器而存在
                    它核心是一个 render props 模式，在作为 children 的回调函数中，会自动收集所有依赖，如果依赖发生变化，
                    则会重新渲染，借助 FormConsumer 我们可以很方便的实现各种计算汇总的需求 */}
                    <FormConsumer>
                        {() => (
                            <div
                                style={{
                                    marginBottom: 20,
                                    padding: 5,
                                    border: '1px dashed #666',
                                }}
                            >
                                实时响应：{form.values.input}
                            </div>
                        )}
                    </FormConsumer>
                    {/* FormButtonGroup 组件作为表单按钮组容器而存在，主要负责按钮的布局 */}
                    <FormButtonGroup>
                        {/* Submit组件作为表单提交的动作触发器而存在
                        其实我们也可以直接使用 form.submit 方法进行提交，
                        但是使用 Submit 的好处是不需要每次都在 Button 组件上写 onClick 事件处理器，
                        同时它还处理了 Form 的 loading 状态，如果 onSubmit 方法返回一个 Promise，
                        且 Promise 正在 pending 状态，那么按钮会自动进入 loading 状态 */}
                        <Submit onSubmit={handleSubmit}>
                            提交
                        </Submit>
                    </FormButtonGroup>
                </FormProvider>
            </Card>
        </div>
    );
};

export default DemoPage;
