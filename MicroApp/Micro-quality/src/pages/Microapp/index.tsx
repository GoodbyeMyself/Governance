// antd
import { Button, Divider } from 'antd';
// 应用间跳转
import { MicroAppLink } from 'umi';
// 数据流
import { useModel } from '@umijs/max';

const MicroappPage: React.FC = () => {
    // 初始数据流
    const { initialState } = useModel('@@initialState');

    // 从初始状态里面获取数据
    const { isMicroApp } = initialState || {};

    return (
        <div
            style={{
                minHeight: '400px',
                backgroundColor: '#fff',
            }}
        >
            <Divider orientation="left" plain>
                子应用间 跳转
            </Divider>
            {/*
                跳转链接为地址： /governance/Qiankun/microapp-service/home
                /governance/：  主应用的 base 前缀
            */}
            {isMicroApp ? (
                <MicroAppLink
                    name="microapp-service"
                    to={'/governance/' + 'Qiankun/microapp-service/home'}
                    isMaster
                >
                    <Button>跳转到： 数据服务</Button>
                </MicroAppLink>
            ) : (
                '当前为 独立应用, 子应用间跳转关闭'
            )}
        </div>
    );
};

export default MicroappPage;
