import fs from "fs"
import { v1 as uuidv1 } from 'uuid'
import mysql from 'mysql'
import {annotationLogger} from "./logSave.js";
// 数据库的配置选项

const options = {
    host: 'localhost',//主机名
    user: 'readwrite',//用户
    password: 'mysql_update',//密码
    port: 3306,//端口号
    database: 'spatial_trans_web'//要操作的数据库
}

export function uploadRecord(ctx) {
    return new Promise((resolve, reject) => {
        try {
            let connection = mysql.createConnection(options)
            // 获取上传时间
            const now = new Date()
            const uploadTimeP = now.toISOString()
            const YMD = String(now.getFullYear()) + (now.getMonth() + 1) + now.getDate()
            // 连接数据库
            connection.connect()
            let rid, email, species, organ, tissue, matrixFilePath, labelsFilePath
            // whether the request is to run demo
            if (ctx.request.body.isDemo === "false") {
                // read the uploaded form
                rid = ctx.request.files['matrixFile'][0].destination.split('/')[3]
                email = ctx.request.body.emailAddress === undefined ? "no email" : ctx.request.body.emailAddress
                species = ctx.request.body.species
                organ = ctx.request.body.organ
                tissue = ctx.request.body.tissue
                matrixFilePath = ctx.request.files['matrixFile'][0].destination + '/' +
                    ctx.request.files['matrixFile'][0].filename
                labelsFilePath = ctx.request.files['labelsFile'][0].destination + '/' +
                    ctx.request.files['labelsFile'][0].filename
            } else if (ctx.request.body.isDemo === "true") {
                rid = uuidv1()
                email = 'no email'
                species = 'Mus musculus'
                organ = 'Brain'
                tissue = 'Brain'
                matrixFilePath = 'public/uploads/test1/counts.csv.gz'
                labelsFilePath = 'public/uploads/test1/labels.csv.gz'
            } else {
                reject(`[${new Date().toLocaleString()}] Error: There is wrong in request body.`)
            }
            const title = ctx.request.body.title
            const resultPath = 'public/results/' + YMD + '/' + rid
            const uploadTime = uploadTimeP
            const screenFinishTime = null
            const annStartTime = null
            const annFinishTime = null
            const datasetID = null
            const sectionID = null
            const status = 'ready'
            // 使用 connection.query() 的查询参数占位符，在其内部对传入参数的自动调用connection.escape()方法进行编码，防止sql注入
            let insertSql = `INSERT INTO users_annotation_records VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`;
            connection.query(insertSql, [rid, title, email, species, organ, tissue, matrixFilePath, labelsFilePath,
                    resultPath, uploadTime, screenFinishTime, annStartTime, annFinishTime, datasetID, sectionID, status],
                (err) => {
                    if (err) {
                        annotationLogger.log(`[${new Date().toLocaleString()}] Error: Adding a annotation record failed in MySQL: ${err.message}`)
                    } else {
                        connection.end(() => {
                            annotationLogger.log(`[${new Date().toLocaleString()}]: Add a annotation record into MySQL successfully.`)
                        })
                    }
                })

            //创建输出目录
            fs.mkdirSync(resultPath, {
                //是否使用递归创建目录
                recursive: true
            })
            fs.mkdirSync(resultPath + '/log', {
                //是否使用递归创建目录
                recursive: true
            })
            fs.mkdirSync(resultPath + '/out/pdf', {
                //是否使用递归创建目录
                recursive: true
            })
            fs.mkdirSync(resultPath + '/out/table', {
                //是否使用递归创建目录
                recursive: true
            })
            fs.mkdirSync(resultPath + '/out/json', {
                //是否使用递归创建目录
                recursive: true
            })
            fs.writeFileSync(resultPath + "/resquest.json",
                JSON.stringify(ctx.request) + '\n',
                {flag: "a+"}
            );
            resolve([rid, species, organ, tissue, matrixFilePath, labelsFilePath, resultPath])
        } catch (err) {
            reject(err)
        }
    })
}