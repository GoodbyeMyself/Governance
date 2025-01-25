import { Request, Response } from 'express';

const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

async function getFakeCaptcha(req: Request, res: Response) {
    await waitTime(1000);
    return res.json('captcha-xxx');
}

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
    // GET POST 可省略
    'GET /api/users': [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
    ],
    'POST /api/register': (req: Request, res: Response) => {
        res.send({
            status: 'ok',
            currentAuthority: 'user',
            success: true
        });
    },
    'GET  /api/login/captcha': getFakeCaptcha,
};
