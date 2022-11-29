// 导入router路由middleware
import router from 'koa-router'
import {getJobInfo} from "./api/getJobInfo.js"
import {getHumanMap} from "./api/getHumanMap.js"
import {getMouseMap} from "./api/getMouseMap.js"
import {getDatasetsInfo} from "./api/getDatasetsInfo.js"
import {getGeneList} from "./api/getGeneList.js"
import {getGeneData} from "./api/getGeneData.js";
import {getGeneTranscript} from "./api/getGeneTranscript.js";
import {getDatasetsList} from "./api/getDatasetsList.js";
import {getSpatiallyVariableGenes} from "./api/getSpatiallyVariableGenes.js";
import {getGenesExpressionCorrelation} from "./api/getGenesExpressionCorrelation.js";
import {getServerTime} from "./api/getServerTime.js";
import {getAnnotationResult} from "./api/getAnnotationResult.js";
import {getMIAResult} from "./api/getMIAResult.js";
import {getZipFile} from "./api/getZipFile.js";
import {getLogLine} from "./api/getLogLine.js";
import {getDatasetJsonl} from "./api/getDatasetJsonl.js";
import {getDatasetImage} from "./api/getDatasetImage.js";
import fs from "fs";


export const RouterAPI = router()

// 设置路由和api进行任务状态访问
RouterAPI.get('/api/job-status/:rid', async (ctx) => {
    // 传出rid为查询值的json数据
    ctx.body = await getJobInfo(ctx.params.rid)
})
// 设置路由和api进行任务状态访问
RouterAPI.get('/api/server-time', async (ctx) => {
    // 传出rid为查询值的json数据
    ctx.body = await getServerTime()
})

// 设置路由和api进行Human map图片访问
RouterAPI.get('/api/human-map', async (ctx) => {
    // 传出rid为查询值的json数据
    ctx.body = getHumanMap()
})

// 设置路由和api进行Mouse map图片访问
RouterAPI.get('/api/mouse-map', async (ctx) => {
    // 传出rid为查询值的json数据
    ctx.body = getMouseMap()
})

// 设置路由和api进行数据集表文件访问
RouterAPI.get('/api/datasets-info/:st_id', async (ctx) => {
    ctx.body = await getDatasetsInfo(ctx.params.st_id)
})

// 设置路由和api进行数据集list的访问
RouterAPI.get('/api/datasets-list/:species', async (ctx) => {
    ctx.body = await getDatasetsList(ctx.params.species)
})

// 设置路由和api进行基因的搜索
RouterAPI.get('/api/genelist/:species/:idType/:geneName', async (ctx) => {
    ctx.body = await getGeneList(ctx.params.species,ctx.params.idType,ctx.params.geneName)
})

// 设置路由和api进行基因信息的搜索
RouterAPI.get('/api/gene/:geneId', async (ctx) => {
    ctx.body = await getGeneData(ctx.params.geneId)
})

// 设置路由和api进行基因转录本的搜索
RouterAPI.get('/api/gene/transcript/:geneId', async (ctx) => {
    ctx.body = await getGeneTranscript(ctx.params.geneId)
})

// 设置路由和api通过基因id或者section_id进行差异基因的搜索
RouterAPI.get('/api/spatially-variable-gene/:geneOrSection/:param', async (ctx) => {
    ctx.body = await getSpatiallyVariableGenes(ctx.params.geneOrSection,ctx.params.param)
})

// 设置路由和api通过基因id或者section_id进行基因共表达的搜索
RouterAPI.get('/api/genes-expression-correlation/:geneOrSection/:param', async (ctx) => {
    ctx.body = await getGenesExpressionCorrelation(ctx.params.geneOrSection,ctx.params.param)
})

// screening log fetch
RouterAPI.get('/api/screening-log/:rid', async (ctx) => {
    const record = await getJobInfo(ctx.params.rid)
    ctx.body = await getLogLine(record.result_path, '/log/ST_screening.log')
})

// MIA Result and datasets information fetch
RouterAPI.get('/api/mia-result/:rid', async (ctx) => {
    const record = await getJobInfo(ctx.params.rid)
    ctx.body = await getMIAResult(record.result_path)
})

// cell-trek, colocalization and interaction log fetch
RouterAPI.get('/api/niche-anchor-log/:rid', async (ctx) => {
    const record = await getJobInfo(ctx.params.rid)
    ctx.body = await getLogLine(record.result_path, '/log/nicheAnchor.log')
})

// Annotation Result fetch
RouterAPI.get('/api/annotation-result/:rid', async (ctx) => {
    const record = await getJobInfo(ctx.params.rid)
    ctx.body = await getAnnotationResult(record.dataset_id, record.result_path)
})

// submitted counts files fetch
RouterAPI.get('/api/submitted-files/counts/:rid', async (ctx) => {
    const record = await getJobInfo(ctx.params.rid)
    ctx.set('Content-disposition', 'attachment; filename=' + record.matrix_file_path.split("/")[3])
    ctx.body = fs.readFileSync(record.matrix_file_path)
})

// submitted labels files fetch
RouterAPI.get('/api/submitted-files/labels/:rid', async (ctx) => {
    const record = await getJobInfo(ctx.params.rid)
    ctx.set('Content-disposition', 'attachment; filename=' + record.labels_file_path.split("/")[3])
    ctx.body = fs.readFileSync(record.labels_file_path)
})

// download annotated sc h5ad
RouterAPI.get('/api/annotation-result/h5ad/sc/:rid', async (ctx) => {
    const record = await getJobInfo(ctx.params.rid)
    await getZipFile(ctx,record.result_path+"/sc_registered.h5ad", "sc_registered.h5ad")
})

// table files
RouterAPI.get('/api/annotation-result/table/:rid', async (ctx) => {
    const record = await getJobInfo(ctx.params.rid)
    await getZipFile(ctx,record.result_path+"/out/table", "table")
})

// pdf files
RouterAPI.get('/api/annotation-result/pdf/:rid', async (ctx) => {
    const record = await getJobInfo(ctx.params.rid)
    await getZipFile(ctx,record.result_path+"/out/pdf", "pdf")
})

// all files
RouterAPI.get('/api/annotation-result/all/:rid', async (ctx) => {
    const record = await getJobInfo(ctx.params.rid)
    await getZipFile(ctx,record.result_path+"/out", "all")
})

// fetch jsonl or jsonl.idx.json files
RouterAPI.get('/api/annotation-result/jsonl/:rid/:fileName', async (ctx) => {
    const record = await getJobInfo(ctx.params.rid)
    await getDatasetJsonl(ctx, record.result_path+"/", ctx.params.fileName)
})

// fetch images files
RouterAPI.get('/api/annotation-result/jsonl/:rid/images/:fileName', async (ctx) => {
    const record = await getJobInfo(ctx.params.rid)
    await getDatasetImage(ctx, record.result_path+"/", ctx.params.fileName)
})


