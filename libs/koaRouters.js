// 导入router路由middleware
import router from 'koa-router'
import {uploadFile} from "./uploadFile.js"
import {uploadRecord} from "./uploadRecord.js"
import {execNicheAnchor} from "./execNicheAnchor.js"
import {sendMail} from "./sendEmail.js"
import { v1 as uuidv1 } from 'uuid'
import {annotationLogger} from "./logSave.js";
import {selectSection} from "./selectSection.js";
import {execScreening} from "./execScreening.js";
import {getJobStatus} from "./api/getJobStatus.js";


export const Router = router()
// 设置路由，与next.js的路由进行映射

// 上传文件的路由
Router.post('/annotation/upload',
    uploadFile(uuidv1()).fields([
        { name: 'matrixFile', maxCount: 1 },
        { name: 'labelsFile', maxCount: 1 },
    ])
    , async (ctx) => {
    // 获得rid
    uploadRecord(ctx).then((rid)=>{
        ctx.body = {rid: rid}
        annotationLogger.log(`>>> ${rid}:[${new Date()}]:uploaded`)
        //发送邮件，把url传给给用户,参数分别为：邮箱地址、url和回调函数
        if(ctx.request.body.emailAddress !== "undefined")
            sendMail(ctx.request.body.emailAddress, rid, annotationLogger.log)
        // 运行Tangram, 传入Koa的context包装的request对象，和response对象
        execNicheAnchor(rid,ctx.request.files['matrixFile'][0].destination, ctx.request.files['matrixFile'][0].filename);
    }).catch((err)=>{
        annotationLogger.log(`[${new Date()}]: A bad upload happened: ${err}`)
    })
})

// run audition 的路由
Router.post('/annotation/audition', async (ctx) =>
    uploadRecord(ctx).then(
        async ([rid, matrixFilePath, labelsFilePath, resultPath]) => {
            ctx.body = {rid: rid}
            annotationLogger.log(`>>> ${rid}:[${new Date()}]: upload data`)
            const [datasets, sections] =
                await selectSection(resultPath,"Mus musculus", "Brain", "Brain Coronal Plane")
            annotationLogger.log(`[${new Date()}]: start ST screening`)
            execScreening(rid, matrixFilePath, labelsFilePath, datasets, sections, resultPath)
        },
    ).catch((err)=>{
        annotationLogger.log(`[${new Date()}]: There is a wrong happened in Screening: ${err}`)
    })
)

// run annotation 的路由
Router.post('/annotation/annotate', async (ctx) => {
        try {
            const { rid, datasetId, sectionId, cutoff } = ctx.request.body
            const record = await getJobStatus(rid)
            const resultPath = record.result_path
            annotationLogger.log(`>>> ${rid}:[${new Date()}]: start annotate`)
            // 运行Tangram, 传入Koa的context包装的request对象，和response对象
            execNicheAnchor(rid, datasetId, sectionId, resultPath, cutoff);
        } catch (err) {
            annotationLogger.log(`[${new Date()}]: There is a wrong happened in Annotating: ${err}`)
        }
    }
)

// run demo 的路由
Router.post('/annotation/demo', async (ctx) =>
    uploadRecord(ctx).then(
        (rid) => {
            ctx.body = {rid: rid}
            annotationLogger.log(`>>> ${rid}:[${new Date()}]:uploaded`)
            // 运行Tangram, 传入Koa的context包装的request对象，和response对象
            execNicheAnchor(rid,'demo', 'demo');
            },
        (err) => annotationLogger.log(`Error: [${new Date()}]: A demo task failed when saving record: ${err}`)
    ).catch((err)=>{
        annotationLogger.log(`[${new Date()}]: There is a wrong happened in tangram: ${err}`)
    })
)
