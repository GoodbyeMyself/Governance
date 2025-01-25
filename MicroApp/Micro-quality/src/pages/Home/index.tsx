// 数据流
import { useModel } from '@umijs/max';
// 样式表
import styles from './index.less';
// antd
import { Button } from 'antd';

const HomePage: React.FC = () => {
    // 获取全局数据流
    const { name } = useModel('global');

    // 全局初始数据流
    const { initialState } = useModel('@@initialState');

    //  子应用 通过 Model 获取主应用 数据流
    const masterProps = useModel('@@qiankunStateFromMaster');

    // 从初始状态里面获取数据
    const { isMicroApp } = initialState || {};

    // 作为 子应用时
    if (isMicroApp) {
        // 当父应用使用 <MicroApp /> 或 <MicroAppWithMemoHistory /> 组件的方式引入子应用时
        // 会额外向子应用传递一个 setLoading() 方法，允许子应用在合适的时机执行，标记子应用加载为完成状态
        masterProps.setLoading(false);
    }

    const transferData = () => {
        // 设置新的全局状态
        masterProps.setMicroAppState({
            // 解构
            ...masterProps.microAppState,
            // 赋值
            taskid: '234',
        });
    };

    return (
        <div>
            <div className={styles.container}>{name}</div>
            {/* 传递值： 给父应用 */}
            {isMicroApp && (
                <Button type="primary" onClick={transferData}>
                    计算输出字段： 传递给父应用
                </Button>
            )}
        </div>
    );
};

export default HomePage;
