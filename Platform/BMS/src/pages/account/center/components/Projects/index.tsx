// React
import React from 'react';
// umi
import { useRequest } from '@umijs/max';
// antd
import { Card, List } from 'antd';
// 时间格式化
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// ts 类型
import type { ListItemDataType } from '../../data.d';
// 组件
import AvatarList from '../AvatarList';
// 样式表
import useStyles from './index.style';
// mock 数据
import { queryFakeList } from '../../service';

// 使用 Day.js 库的 extend 方法来扩展其功能： 使其具有处理相对时间（relative time）的能力
// 相对时间指的是相对于当前时间的相对描述，比如 “几分钟前”、“昨天”、“明天”等。
dayjs.extend(relativeTime);

const Projects: React.FC = () => {

    // 样式表
    const { styles } = useStyles();

    // 获取tab列表数据
    const { data: listData } = useRequest(() => {
        return queryFakeList({
            count: 6,
        });
    });

    return (
        <List<ListItemDataType>
            className={styles.coverCardList}
            rowKey="id"
            grid={{
                gutter: 24,
                xxl: 3,
                xl: 2,
                lg: 2,
                md: 2,
                sm: 2,
                xs: 1,
            }}
            dataSource={listData?.list || []}
            renderItem={(item) => (
                <List.Item>
                    <Card
                        className={styles.card}
                        hoverable
                        cover={<img alt={item.title} src={item.cover} />}
                    >
                        <Card.Meta
                            title={<a>{item.title}</a>}
                            description={item.subDescription}
                        />
                        <div className={styles.cardItemContent}>
                            <span>
                                {dayjs(item.updatedAt).fromNow()}
                            </span>
                            <div className={styles.avatarList}>
                                <AvatarList size="small">
                                    {item.members.map((member) => (
                                        <AvatarList.Item
                                            key={`${item.id}-avatar-${member.id}`}
                                            src={member.avatar}
                                            tips={member.name}
                                        />
                                    ))}
                                </AvatarList>
                            </div>
                        </div>
                    </Card>
                </List.Item>
            )}
        />
    );
};

export default Projects;
