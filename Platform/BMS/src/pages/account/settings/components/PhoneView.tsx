// React
import React from 'react';
// antd
import { Input } from 'antd';
// 样式表
import useStyles from './index.style';

// ts 类型
type PhoneViewProps = {
    value?: string;
    onChange?: (value: string) => void;
};

const PhoneView: React.FC<PhoneViewProps> = (props) => {
    const { styles } = useStyles();
    const { value, onChange } = props;
    let values = ['', ''];
    if (value) {
        values = value.split('-');
    }
    return (
        <>
            <Input
                className={styles.area_code}
                value={values[0]}
                onChange={(e) => {
                    if (onChange) {
                        onChange(`${e.target.value}-${values[1]}`);
                    }
                }}
            />
            <Input
                className={styles.phone_number}
                onChange={(e) => {
                    if (onChange) {
                        onChange(`${values[0]}-${e.target.value}`);
                    }
                }}
                value={values[1]}
            />
        </>
    );
};

export default PhoneView;
