import { createBehavior, createResource } from '@designable/core';
import { DnFC } from '@designable/react';
import { FormLayout as FormilyFormLayout } from '@formily/antd';
import React from 'react';
import { withContainer } from '../../common/Container';
import { AllLocales } from '../../locales';
import { AllSchemas } from '../../schemas';
import { createVoidFieldSchema } from '../Field';

export const FormLayout: DnFC<React.ComponentProps<typeof FormilyFormLayout>> =
    withContainer(FormilyFormLayout);

FormLayout.Behavior = createBehavior({
    name: 'FormLayout',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'FormLayout',
    designerProps: {
        droppable: true,
        propsSchema: createVoidFieldSchema(AllSchemas.FormLayout),
    },
    designerLocales: AllLocales.FormLayout,
});

FormLayout.Resource = createResource({
    icon: 'FormLayoutSource',
    elements: [
        {
            componentName: 'Field',
            props: {
                type: 'void',
                'x-component': 'FormLayout',
            },
        },
    ],
});
