const Koa = require('koa')
const nextjs = require('next')
 const bodyParser = require('koa-bodyparser');
// 导入controller middleware:
const controller = require('./controller');
// 导入router路由middleware
// session 有关模块
const session = require('koa-session')
const {accesslogger, uploadlogger} = require("./logSave");

// Determine whether it is a production environment
const dev = process.env.NODE_ENV !== 'production'
// create a object to present web server
const app = nextjs({dev})
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = new Koa()
    server.use(async (ctx, next) => {
        await handle(ctx.req, ctx.res)
        ctx.respond = false
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

    server.on('error', err => {
        log.error('server error', err)
    });

    // add post body parser
    server.use(bodyParser());

    // add controller middleware to route URL
    server.use(controller())

    server.listen(3000, () => {
        console.log('server is running at http://localhost:3000')
    })
})

