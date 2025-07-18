import { createBehavior, createResource } from '@designable/core';
import { DnFC } from '@designable/react';
import { Space as FormilySpace } from '@formily/antd';
import React from 'react';
import { withContainer } from '../../common/Container';
import { AllLocales } from '../../locales';
import { AllSchemas } from '../../schemas';
import { createVoidFieldSchema } from '../Field';

export const Space: DnFC<React.ComponentProps<typeof FormilySpace>> = withContainer(FormilySpace);

Space.Behavior = createBehavior({
    name: 'Space',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Space',
    designerProps: {
        droppable: true,
        inlineChildrenLayout: true,
        propsSchema: createVoidFieldSchema(AllSchemas.Space),
    },
    designerLocales: AllLocales.Space,
});

Space.Resource = createResource({
    icon: 'SpaceSource',
    elements: [
        {
            componentName: 'Field',
            props: {
                type: 'void',
                'x-component': 'Space',
            },
        },
    ],
});
