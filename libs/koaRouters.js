const {uploadFile} = require("./uploadFile");
const {uploadRecord} = require("./uploadRecord");
const {getReqStatus} = require("./api/getReqStatus");
const {sendMail} = require("./sendEmail");
const {execTangram} = require("./execTangram");
const nextjs = require("next");
const Router = require('koa-router')();

// Determine whether it is a production environment
const dev = process.env.NODE_ENV !== 'production'
const app = nextjs({dev})
const handler = app.getRequestHandler()


module.exports = function() {
// for Koa router
    Router.post('/annotations/upload', uploadFile().single('matrix'), async (ctx) => {
        //上传时间
        let uploadtime = new Date()
        uploadRecord(ctx, uploadtime.toISOString())
        // 调用nextjs单独渲染一个页面，使用handler携带参数跳转
        await handler(ctx.req, ctx.res, {
            pathname: "/annotations/upload-success",
            query: getReqStatus(ctx.request.file.filename.split('.')[0])
        })
        //发送邮件，把url传给给用户,参数分别为：邮箱地址、url和回调函数
        await sendMail(ctx.request.body.email, ctx.request.file.filename.split('.')[0], console.log)
        // 运行Tangram, 传入Koa的context包装的request对象，和response对象
        await execTangram(ctx.request.file.destination, ctx.request.file.filename);
    })

// 设置路由，与next.js的路由进行映射
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

    return Router.routes()
}
