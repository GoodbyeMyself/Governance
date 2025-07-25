// React
import React, { PropsWithChildren } from 'react';
// dialog
import { Modal } from 'antd';

interface CreateFormProps {
    modalVisible: boolean;
    onCancel: () => void;
}

const CreateForm: React.FC<PropsWithChildren<CreateFormProps>> = (props) => {
    const { modalVisible, onCancel } = props;

    return (
        <Modal
            destroyOnClose
            title="新建"
            width={420}
            open={modalVisible}
            onCancel={() => onCancel()}
            footer={null}
        >
            {props.children}
        </Modal>
    );
};

export default CreateForm;
