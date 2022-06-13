const Koa = require('koa')
const nextjs = require('next')
const bodyParser = require('koa-bodyparser');
// 导入controller middleware:
const controller = require('./libs/controller');
// 导入router路由middleware
const Router = require('koa-router')();
// session 有关模块
const session = require('koa-session')
const {accesslogger, uploadlogger} = require("./libs/logSave");
const {uploadFile} = require("./libs/uploadFile");
const {uploadRecord} = require("./libs/uploadRecord");
const {execTangram} = require("./libs/execTangram");
const {sendMail} = require("./libs/sendEmail");
const fs = require("fs");
const {getReqStatus} = require("./libs/api/getReqStatus");

// Determine whether it is a production environment
const dev = process.env.NODE_ENV !== 'production'
// initialize nextjs instance and expose request handler
const app = nextjs({dev})
const handler = app.getRequestHandler()

app.prepare().then(() => {
    // create an object to present web server
    const server = new Koa()
    // add controller middleware to route URL
    //server.use(controller('routes',handler))
    // for Koa router
    Router.post('/annotations/upload',uploadFile().single('matrix'),async (ctx) => {
        //上传时间
        let uploadtime = new Date()
        uploadRecord(ctx,uploadtime.toISOString())
        // 调用nextjs单独渲染一个页面，使用handler携带参数跳转
        await handler(ctx.req, ctx.res, {
            pathname: "/annotations/upload-success",
            query: getReqStatus(ctx.request.file.filename.split('.')[0])
        })
        //发送邮件，把url传给给用户,参数分别为：邮箱地址、url和回调函数
        await sendMail(ctx.request.body.email,ctx.request.file.filename.split('.')[0],console.log)
        // 运行Tangram, 传入Koa的context包装的request对象，和response对象
        await execTangram(ctx.request.file.destination,ctx.request.file.filename);
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

    server.use(Router.routes()).use(Router.allowedMethods())

    // for NextJs router 在koa路由中未定义的，将交给nextjs路由继续处理
    server.use(async (ctx) => {
        // 传入Node原生的req对象，和res对象，因为Nextjs框架需要兼容许多基于Node封装的web框架
        // 让nextjs全局处理其他页面的http访问
        await handler(ctx.req, ctx.res)
        // 屏蔽koa中对response的内置处理，让nextjs来接手
        ctx.response = false
    })

    server.keys = ['spatial-trans-web'];
    const CONFIG = {
        key: 'spatial-trans-web:sess',   //cookie key (default is koa:sess)
        maxAge: 24 * 60 * 60 * 1000,  // cookie的过期时间 maxAge in ms (default is 1 days)
        overwrite: true,  //是否可以overwrite    (默认default true)
        httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
        signed: true,   //签名默认true
        rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
        renew: false,  //(boolean) renew session when session is nearly expired,
        autoCommit:false,
    };
    server.use(session(CONFIG, server));

    // log request URL and execution time:
    server.use(accesslogger);
    server.use(uploadlogger);

    // add post body parser
    server.use(bodyParser());

    server.listen(3000, () => {
        console.log('server is running at http://localhost:3000')
    })
})

