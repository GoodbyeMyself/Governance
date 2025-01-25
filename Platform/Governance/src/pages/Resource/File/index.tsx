// ---
import React, { useState } from 'react';
// antd 组件
import { Divider, Image, Spin } from 'antd';
// umi 内置 组件
import { Icon } from '@umijs/max';
// 自定义 svg 组件
import SvgIcon from '@/components/SvgIcon';
// ant design 提供的 icon
import { QuestionCircleOutlined } from '@ant-design/icons';

const FilePage: React.FC = () => {
    const [loading, setLoading] = useState(true);

    return (
        <div>
            <Divider orientation="left" plain>
                加载 图床服务
            </Divider>
            <div
                style={{
                    width: '192px',
                    height: '192px',
                }}
            >
                <Spin spinning={loading}>
                    <Image
                        src={
                            'https://gitlab.com/Governance-web3/oss/ImageHostingService/-/raw/main/Governance/M_PRO.png?ref_type=heads'
                        }
                        onLoad={() => {
                            setLoading(true);
                        }}
                    />
                </Spin>
            </div>
            <Divider orientation="left" plain>
                本地 SVG 使用方式测试
            </Divider>
            <Icon icon="local:STEEM" width={'48'} height={'48'} spin />
            <Divider orientation="left" plain>
                iconfont 本地文件使用
            </Divider>
            <SvgIcon type="icon-zhuanrangshouyi2"></SvgIcon>
            <Divider orientation="left" plain>
                ant design 提供的 icon
            </Divider>
            <QuestionCircleOutlined
                spin
                style={{
                    fontSize: '48px',
                    color: '#08c',
                }}
            />
        </div>
    );
};

export default FilePage;
