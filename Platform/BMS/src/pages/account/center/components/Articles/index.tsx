// React
import React from 'react';
// umi
import { useRequest } from '@umijs/max';
// antd
import { List, Tag } from 'antd';
import { LikeOutlined, MessageFilled, StarTwoTone } from '@ant-design/icons';
// ts 类型
import type { ListItemDataType } from '../../data.d';
// 组件
import ArticleListContent from '../ArticleListContent';
// mock
import { queryFakeList } from '../../service';
// 样式表
import useStyles from './index.style';

const Articles: React.FC = () => {

    // 样式表
    const { styles } = useStyles();

    //  icon 组件
    const IconText: React.FC<{
        icon: React.ReactNode;
        text: React.ReactNode;
    }> = ({ icon, text }) => (
        <span>
            {icon} {text}
        </span>
    );

    // 获取 tab 列表数据
    const { data: listData } = useRequest(() => {
        return queryFakeList({
            count: 3,
        });
    });

    return (
        <List<ListItemDataType>
            size="large"
            className={styles.articleList}
            rowKey="id"
            itemLayout="vertical"
            dataSource={listData?.list || []}
            renderItem={(item) => (
                <List.Item
                    key={item.id}
                    actions={[
                        <IconText key="star" icon={<StarTwoTone />} text={item.star} />,
                        <IconText key="like" icon={<LikeOutlined />} text={item.like} />,
                        <IconText key="message" icon={<MessageFilled />} text={item.message} />,
                    ]}
                >
                    <List.Item.Meta
                        title={
                            <a className={styles.listItemMetaTitle} href={item.href}>
                                {item.title}
                            </a>
                        }
                        description={
                            <span>
                                <Tag>Ant Design</Tag>
                                <Tag>设计语言</Tag>
                                <Tag>蚂蚁金服</Tag>
                            </span>
                        }
                    />
                    <ArticleListContent data={item} />
                </List.Item>
            )}
        />
    );
};

export default Articles;
