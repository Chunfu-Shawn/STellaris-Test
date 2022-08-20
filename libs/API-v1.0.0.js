// 导入router路由middleware
import router from 'koa-router'
import {getJobStatus} from "./api/getJobStatus.js"
import {getHumanMap} from "./api/getHumanMap.js"
import {getMouseMap} from "./api/getMouseMap.js"
import {getDefaultMatrixFile} from "./api/getDefaultMatrixFile.js"
import getDatesetsJSON from "./api/getDatasetsJSON.js"
import getViCustomConfig from "./api/getViCustomConfig.js"
import {getGeneList} from "./api/getGeneList.js"


export const RouterAPI = router()

// 设置路由和api进行数据访问
RouterAPI.get('/api/job-status/:rid', async (ctx) => {
    // 传出rid为查询值的json数据
    ctx.body = getJobStatus(ctx.params.rid)
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

// 设置路由和api进行默认matrix文件访问
RouterAPI.get('/api/default-matrix-file', async (ctx) => {
    // 传出默认matrix文件
    ctx.body = getDefaultMatrixFile()
})

// 设置路由和api进行数据集表文件访问
RouterAPI.get('/api/datasets-JSON/:type', async (ctx) => {
    ctx.body = getDatesetsJSON(ctx.params.type)
})

// 设置路由和api进行vitessce配置文件访问
RouterAPI.get('/api/vi-custom-config/:id', async (ctx) => {
    ctx.body = getViCustomConfig(ctx.params.id)
})

// 设置路由和api进行基因的搜索
RouterAPI.get('/api/genelist/:species/:idType/:geneName', async (ctx) => {
    ctx.body = await getGeneList(ctx.params.species,ctx.params.idType,ctx.params.geneName)
})