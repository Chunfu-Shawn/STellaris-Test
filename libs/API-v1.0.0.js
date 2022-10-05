// 导入router路由middleware
import router from 'koa-router'
import {getJobStatus} from "./api/getJobStatus.js"
import {getHumanMap} from "./api/getHumanMap.js"
import {getMouseMap} from "./api/getMouseMap.js"
import {getDatasetsInfo} from "./api/getDatasetsInfo.js"
//import getViCustomConfig from "./api/getViCustomConfig.js"
import {getGeneList} from "./api/getGeneList.js"
import {getGeneData} from "./api/getGeneData.js";
import {getGeneTranscript} from "./api/getGeneTranscript.js";
import {getDatasetsList} from "./api/getDatasetsList.js";
import {getSpatiallyVariableGenes} from "./api/getSpatiallyVariableGenes.js";
import {getGenesExpressionCorrelation} from "./api/getGenesExpressionCorrelation.js";


export const RouterAPI = router()

// 设置路由和api进行数据访问
RouterAPI.get('/api/job-status/:rid', async (ctx) => {
    // 传出rid为查询值的json数据
    ctx.body = await getJobStatus(ctx.params.rid)
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

// 设置路由和api进行vitessce配置文件访问
RouterAPI.get('/api/vi-custom-config/:id', async (ctx) => {
    //ctx.body = getViCustomConfig(ctx.params.id)
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

// 设置路由和api通过基因id或者duplicate_id进行差异基因的搜索
RouterAPI.get('/api/spatially-variable-gene/:geneOrDuplicate/:param', async (ctx) => {
    ctx.body = await getSpatiallyVariableGenes(ctx.params.geneOrDuplicate,ctx.params.param)
})

// 设置路由和api通过基因id或者duplicate_id进行基因共表达的搜索
RouterAPI.get('/api/genes-expression-correlation/:geneOrDuplicate/:param', async (ctx) => {
    ctx.body = await getGenesExpressionCorrelation(ctx.params.geneOrDuplicate,ctx.params.param)
})