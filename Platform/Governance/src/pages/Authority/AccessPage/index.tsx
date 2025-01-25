// 国际化
import { useIntl } from '@umijs/max';
// antd
import { Alert, Card } from 'antd';
import React from 'react';

const AccessPage: React.FC = () => {
    const intl = useIntl();

    return (
        <Card>
            <Alert
                message={intl.formatMessage({
                    id: 'pages.welcome.alertMessage',
                    defaultMessage: 'Fddddd.',
                })}
                type="success"
                showIcon
                banner
                style={{
                    margin: -12,
                    marginBottom: 48,
                }}
            />
            xxx
        </Card>
    );
};

export default AccessPage;
