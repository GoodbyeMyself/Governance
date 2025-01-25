// React
import React from 'react';
// antd
import { Avatar } from 'antd';
// 时间格式化
import dayjs from 'dayjs';
// 样式表
import useStyles from './index.style';

export type ApplicationsProps = {
    data: {
        content?: string;
        updatedAt?: any;
        avatar?: string;
        owner?: string;
        href?: string;
    };
};

const ArticleListContent: React.FC<ApplicationsProps> = ({
    data: { content, updatedAt, avatar, owner, href },
}) => {
    const { styles } = useStyles();
    return (
        <div>
            <div className={styles.description}>{content}</div>
            <div className={styles.extra}>
                <Avatar src={avatar} size="small" />
                <a href={href}>{owner}</a>
                发布在
                <a href={href}>{href}</a>
                <em>{dayjs(updatedAt).format('YYYY-MM-DD HH:mm')}</em>
            </div>
        </div>
    );
};

export default ArticleListContent;
