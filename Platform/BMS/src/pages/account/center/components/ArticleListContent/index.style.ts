import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
    return {
        description: {
            maxWidth: '720px',
            lineHeight: '22px',
        },
        extra: {
            marginTop: '16px',
            color: token.colorTextSecondary,
            lineHeight: '22px',
            gap: '8px',
            display: 'flex',
            alignItems: 'center',
            '& > em': {
                marginLeft: '8px',
                color: token.colorTextDisabled,
                fontStyle: 'normal',
            },
            a: {
                color: '#1677ff',
            },
            [`@media screen and (max-width: ${token.screenXS}px)`]: {
                '& > em': {
                    display: 'block',
                    marginTop: '8px',
                    marginLeft: '0',
                },
            },
        },
    };
});

export default useStyles;
