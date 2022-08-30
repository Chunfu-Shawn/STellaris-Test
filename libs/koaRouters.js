// 导入router路由middleware
import router from 'koa-router'
import {uploadFile} from "./uploadFile.js"
import {uploadRecord} from "./uploadRecord.js"
import {execTangram} from "./execTangram.js"
import {sendMail} from "./sendEmail.js"
import {handler} from '../server.js'
import { v1 as uuidv1 } from 'uuid'


export const Router = router()
// 设置路由，与next.js的路由进行映射

// 上传文件的路由
Router.post('/annotation/upload',
    uploadFile(uuidv1()).fields([
        { name: 'matrixFile', maxCount: 1 },
        { name: 'barcodesFile', maxCount: 1 },
        { name: 'featuresFile', maxCount: 1 },
    ]), async (ctx) => {
    //上传时间
    let uploadtime = new Date()
        // 获得rid
    let rid = uploadRecord(ctx, uploadtime.toISOString())
    if(rid !== undefined){
        ctx.body = {rid: rid}
        //发送邮件，把url传给给用户,参数分别为：邮箱地址、url和回调函数
        await sendMail(ctx.request.body.emailAddress, rid, console.log)
        // 运行Tangram, 传入Koa的context包装的request对象，和response对象
        await execTangram(rid,ctx.request.files['matrixFile'][0].destination, ctx.request.files['matrixFile'][0].filename);
    }else console.log("A bad upload happened!!")
})

// run demo 的路由
Router.post('/annotation/demo', async (ctx) => {
    //上传时间
    let uploadtime = new Date()
    let rid = uploadRecord(ctx, uploadtime.toISOString())
    if(rid !== undefined){
        // 返回rid
        ctx.body = {rid: rid}
        // 运行Tangram, 传入Koa的context包装的request对象，和response对象
        await execTangram(rid,'demo', 'demo');
    }else console.log("A bad upload happened!!")
})
