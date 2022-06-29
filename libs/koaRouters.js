// 导入router路由middleware
import router from 'koa-router'
import {uploadFile} from "./uploadFile.js"
import {uploadRecord} from "./uploadRecord.js"
import {execTangram} from "./execTangram.js"
import {sendMail} from "./sendEmail.js"
import {getReqStatus} from "./api/getReqStatus.js"
import {getHumanMap} from "./api/getHumanMap.js";
import {handler} from '../server.js'
import {getMouseMap} from "./api/getMouseMap.js";
import {getDefaultMatrixFile} from "./api/getDefaultMatrixFile.js";


export const Router = router()
// 设置路由，与next.js的路由进行映射

// 上传文件的路由
Router.post('/annotations/upload', uploadFile().single('matrix'), async (ctx) => {
    //上传时间
    let uploadtime = new Date()
    uploadRecord(ctx, uploadtime.toISOString())
    // 调用nextjs单独渲染一个页面，使用nextjs 的handler函数 携带参数跳转
    await handler(ctx.req, ctx.res, {
        pathname: "/annotations/upload-success",
        query: getReqStatus(ctx.request.file.filename.split('.')[0])
    })
    //发送邮件，把url传给给用户,参数分别为：邮箱地址、url和回调函数
    await sendMail(ctx.request.body.email, ctx.request.file.filename.split('.')[0], console.log)
    // 运行Tangram, 传入Koa的context包装的request对象，和response对象
    await execTangram(ctx.request.file.destination, ctx.request.file.filename);
})
// 查询结果的路由
Router.get('/annotations/results/:rid', async (ctx) => {
    let rid = ctx.params.rid
    // handle传入的第三个参数跟我们next.js中用Router.push({})传入的数组一样
    await handler(ctx.req, ctx.res, {
        pathname: '/annotations/results',
        query: {
            rid
        }
    })
    ctx.response = false
})

// 设置路由和api进行数据访问
Router.get('/api/getFilesInfo/:rid', async (ctx) => {
    // 传出rid为查询值的json数据
    ctx.body = getReqStatus(ctx.params.rid)
})

// 设置路由和api进行Human map图片访问
Router.get('/api/getHumanMap', async (ctx) => {
    // 传出rid为查询值的json数据
    ctx.body = getHumanMap()
})

// 设置路由和api进行Mouse map图片访问
Router.get('/api/getMouseMap', async (ctx) => {
    // 传出rid为查询值的json数据
    ctx.body = getMouseMap()
})
// 设置路由和api进行默认matrix文件访问
Router.get('/api/getDefaultMatrixFile', async (ctx) => {
    // 传出默认matrix文件
    ctx.body = getDefaultMatrixFile()
})




