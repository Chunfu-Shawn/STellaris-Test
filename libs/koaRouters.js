// 导入router路由middleware
import router from 'koa-router'
import {uploadFile} from "./uploadFile.js"
import {uploadRecord} from "./uploadRecord.js"
import {execNicheAnchor} from "./execNicheAnchor.js"
import {sendMail} from "./sendEmail.js"
import {annotationLogger} from "./logSave.js";
import {selectSection} from "./selectSection.js";
import {execScreening} from "./execScreening.js";
import {getJobInfo} from "./api/getJobInfo.js";
import {setJobDatasetSection} from "./setJobDatasetSection.js";


export const Router = router()
// 设置路由，与next.js的路由进行映射

// 上传文件的路由
Router.post('/annotation/upload',
    uploadFile().fields([
        { name: 'matrixFile', maxCount: 1 },
        { name: 'labelsFile', maxCount: 1 },
    ])
    , async (ctx) => {
    uploadRecord(ctx).then(
        async ([rid, species, organ, tissue, matrixFilePath, labelsFilePath, resultPath]) => {
            ctx.body = {rid: rid}
            annotationLogger.log(`>>> ${rid}:[${new Date().toLocaleString()}]: upload data`)
            // run sections matching species, organ and tissue
            const [datasets, sections] =
                await selectSection(resultPath, species, organ, tissue)
            // run section blast
            annotationLogger.log(`[${new Date().toLocaleString()}]: start ST screening`)
            execScreening(rid, matrixFilePath, labelsFilePath, datasets, sections, resultPath)
            // send mail
            ctx.request.body.emailAddress === "undefined" || sendMail(ctx.request.body.emailAddress, rid, annotationLogger.log)
    }).catch((err)=>{
        annotationLogger.log(`[${new Date().toLocaleString()}] Error: A bad upload happened: ${err}`)
    })
})

// run audition 的路由
Router.post('/annotation/demo', async (ctx) =>
    uploadRecord(ctx).then(
        async ([rid, species, organ, tissue, matrixFilePath, labelsFilePath, resultPath]) => {
            ctx.body = {rid: rid}
            annotationLogger.log(`>>> ${rid}:[${new Date().toLocaleString()}]: run example data`)
            // run sections matching species, organ and tissue
            const [datasets, sections] =
                await selectSection(resultPath, species, organ, tissue)
            // run section blast
            annotationLogger.log(`[${new Date().toLocaleString()}]: start ST screening`)
            execScreening(rid, matrixFilePath, labelsFilePath, datasets, sections, resultPath)
        },
    ).catch((err)=>{
        annotationLogger.log(`[${new Date().toLocaleString()}] Error: There is a wrong happened in Screening: ${err}`)
    })
)

// run annotation 的路由
Router.post('/annotation/annotate', async (ctx) => {
        try {
            const { rid, datasetId, sectionId, cutoff, bandWidth } = ctx.request.body
            setJobDatasetSection(rid, datasetId, sectionId)
            const record = await getJobInfo(rid)
            const resultPath = record.result_path
            const species = record.species
            annotationLogger.log(`[${new Date().toLocaleString()}]: start annotate`)
            // 运行Tangram, 传入Koa的context包装的request对象，和response对象
            execNicheAnchor(rid, datasetId, sectionId, cutoff, bandWidth, species, resultPath);
        } catch (err) {
            annotationLogger.log(`[${new Date().toLocaleString()}] Error: There is a wrong happened in Annotating: ${err}`)
        }
    }
)
