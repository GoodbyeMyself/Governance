import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css, token }) => {
    return {
        testContainer: css`
            padding: 24px;
            background: ${token.colorBgContainer};
            border-radius: 8px;
        `,
    };
});

export default useStyles;
