// React
import React from 'react';
// antd
import { Avatar, Card, Dropdown, List, Tooltip } from 'antd';
import type { MenuProps } from 'antd';
import {
    DownloadOutlined,
    EditOutlined,
    EllipsisOutlined,
    ShareAltOutlined,
} from '@ant-design/icons';
// umi
import { useRequest } from '@umijs/max';
// 格式处理数据 千分格式化
import numeral from 'numeral';
// ts 类型
import type { ListItemDataType } from '../../data.d';
// 样式表
import useStyles from './index.style';
// mock
import { queryFakeList } from '../../service';

export function formatWan(val: number) {
    const v = val * 1;
    if (!v || Number.isNaN(v)) return '';
    let result: React.ReactNode = val;
    if (val > 10000) {
        result = (
            <span>
                {Math.floor(val / 10000)}
                <span
                    style={{
                        position: 'relative',
                        top: -2,
                        fontSize: 14,
                        fontStyle: 'normal',
                        marginLeft: 2,
                    }}
                >
                    万
                </span>
            </span>
        );
    }
    return result;
}

// 下拉菜单
const items: MenuProps['items'] = [
    {
        label: '1st menu item',
        key: '0',
    },
    {
        label: '2nd menu item',
        key: '1',
    },
    // 分割线
    {
        type: 'divider',
    },
    {
        label: '3rd menu item',
        key: '3',
    },
];

const Applications: React.FC = () => {
    // 获取 样式表
    const { styles: stylesApplications } = useStyles();
    // 获取tab列表数据
    const { data: listData } = useRequest(() => {
        return queryFakeList({
            count: 8,
        });
    });

    const CardInfo: React.FC<{
        activeUser: React.ReactNode;
        newUser: React.ReactNode;
    }> = ({ activeUser, newUser }) => (
        <div className={stylesApplications.cardInfo}>
            <div>
                <p>活跃用户</p>
                <p>{activeUser}</p>
            </div>
            <div>
                <p>新增用户</p>
                <p>{newUser}</p>
            </div>
        </div>
    );

    return (
        <List<ListItemDataType>
            rowKey="id"
            className={stylesApplications.filterCardList}
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
                <List.Item key={item.id}>
                    <Card
                        hoverable
                        actions={[
                            <Tooltip key="download" title="下载">
                                <DownloadOutlined />
                            </Tooltip>,
                            <Tooltip title="编辑" key="edit">
                                <EditOutlined />
                            </Tooltip>,
                            <Tooltip title="分享" key="share">
                                <ShareAltOutlined />
                            </Tooltip>,
                            <Dropdown menu={{ items }} key="ellipsis">
                                <EllipsisOutlined />
                            </Dropdown>,
                        ]}
                    >
                        <Card.Meta
                            avatar={<Avatar size="small" src={item.avatar} />}
                            title={item.title}
                        />
                        <div>
                            <CardInfo
                                activeUser={formatWan(item.activeUser)}
                                newUser={numeral(item.newUser).format('0,0')}
                            />
                        </div>
                    </Card>
                </List.Item>
            )}
        />
    );
};

export default Applications;
