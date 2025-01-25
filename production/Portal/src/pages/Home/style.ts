import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css }) => {
    return {
        portalBanner: css`
            width: 1260px;
            height: 440px;
            background-image: url(https://gitlab.com/Governance-web3/oss/ImageHostingService/-/raw/main/Portal/portal_banner.png?ref_type=heads);
            background-size: 100% 100%;
            margin: 24px auto;
        `,
        portalContent: css`
            height: 600px;
            width: 100%;
            text-align: center;
            padding: 24px;
        `,
    };
});

export default useStyles;
