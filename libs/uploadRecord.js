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
    return new Promise((resolve,reject) => {
        let connection = mysql.createConnection(options)
        // 获取上传时间
        const uploadTimeP = new Date().toISOString()
        // 连接数据库
        connection.connect()
        // whether the request is to run demo
        if(ctx.request.body.isDemo === "false") {
            try {
                // read the uploaded form
                const YMD = ctx.request.files['matrixFile'][0].destination.split('/')[2]
                const rid = ctx.request.files['matrixFile'][0].destination.split('/')[3]
                const title = ctx.request.body.title
                const email = ctx.request.body.emailAddress
                const species = ctx.request.body.species
                const organ = ctx.request.body.organ
                const tissue = ctx.request.body.tissue
                const matrixFilePath = ctx.request.files['matrixFile'][0].destination + '/' +
                    ctx.request.files['matrixFile'][0].filename
                const labelsFilePath = ctx.request.files['labelsFile'][0].destination + '/' +
                    ctx.request.files['labelsFile'][0].filename
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
                connection.query(insertSql,
                    [rid, title, email, species, organ, tissue, matrixFilePath, labelsFilePath, resultPath,
                        uploadTime, screenFinishTime, annStartTime, annFinishTime, datasetID, sectionID, status],
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
                resolve([rid, matrixFilePath, labelsFilePath, resultPath])
            } catch (err) {
                reject(err)
            }
        }
    else
        if (ctx.request.body.isDemo === "true") {
            try {
                const now = new Date()
                const YMD = String(now.getFullYear()) + (now.getMonth() + 1) + now.getDate()
                const rid = uuidv1()
                const title = ctx.request.body.title
                const email = 'no email'
                const species = 'Mus musculus'
                const organ = 'Brain'
                const tissue = 'Brain'
                const matrixFilePath = 'public/uploads/test1/counts.csv.gz'
                const labelsFilePath = 'public/uploads/test1/labels.csv.gz'
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
                connection.query(insertSql,
                    [rid, title, email, species, organ, tissue, matrixFilePath, labelsFilePath, resultPath,
                        uploadTime, screenFinishTime, annStartTime, annFinishTime, datasetID, sectionID, status],
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
        } else {
            reject("There is wrong in request body.")
        }
    })
}