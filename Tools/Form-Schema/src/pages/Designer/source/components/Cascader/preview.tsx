import { createBehavior, createResource } from '@designable/core';
import { DnFC } from '@designable/react';
import { Cascader as FormilyCascader } from '@formily/antd';
import React from 'react';
import { AllLocales } from '../../locales';
import { AllSchemas } from '../../schemas';
import { createFieldSchema } from '../Field';

export const Cascader: DnFC<React.ComponentProps<typeof FormilyCascader>> = FormilyCascader;

Cascader.Behavior = createBehavior({
    name: 'Cascader',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Cascader',
    designerProps: {
        propsSchema: createFieldSchema(AllSchemas.Cascader),
    },
    designerLocales: AllLocales.Cascader,
});

Cascader.Resource = createResource({
    icon: 'CascaderSource',
    elements: [
        {
            componentName: 'Field',
            props: {
                title: 'Cascader',
                'x-decorator': 'FormItem',
                'x-component': 'Cascader',
            },
        },
    ],
});
