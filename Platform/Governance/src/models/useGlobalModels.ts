/**
 * @description: 数据流 测试
 * @author: M.yunlong
 * @date: 2024-03-20 16:42:45
 */
// models 中 使用 hooks
import { useCallback, useState } from 'react';
export default function useGlobalModels() {
    // --
    const testModel = {
        work: 'test',
    };

    // hook 测试
    const [counter, setCounter] = useState(1);

    // 增加
    const increment = useCallback(() => {
        setCounter(counter + 1);
    }, [counter]);

    // 减少
    const decrement = useCallback(() => {
        setCounter(counter - 1);
    }, [counter]);

    return {
        testModel,
        // hook
        counter,
        increment,
        decrement,
    };
}
