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
        const uploadTime = new Date().toISOString()
        // 连接数据库
        connection.connect()
        // whether the request is to run demo
        if(ctx.request.body.isDemo === "false") {
            try {
                // read the uploaded form
                const rid = ctx.request.files['matrixFile'][0].destination.split('/')[3]
                const title = ctx.request.body.title
                const email = ctx.request.body.emailAddress
                const species = ctx.request.body.species
                const organ = ctx.request.body.organ
                const tissue = ctx.request.body.tissue
                const matrixfilepath = ctx.request.files['matrixFile'][0].destination + '/' +
                    ctx.request.files['matrixFile'][0].filename
                const labelsfilepath = ctx.request.files['labelsFile'][0].destination + '/' +
                    ctx.request.files['labelsFile'][0].filename
                const resultpath = 'public/results/' + rid
                const uploadtime = uploadTime
                const finishtime = null
                const status = 'auditioning'
                // 使用 connection.query() 的查询参数占位符，在其内部对传入参数的自动调用connection.escape()方法进行编码，防止sql注入
                let insertSql = `INSERT INTO users_annotation_records VALUES (?,?,?,?,?,?,?,?,?,?,?,?);`;
                connection.query(insertSql,
                    [rid, title, email, species, organ, tissue, matrixfilepath, labelsfilepath, resultpath, uploadtime, finishtime, status],
                    (err) => {
                        if (err) {
                            annotationLogger.log(`Error: [${new Date()}]: A annotation task failed in MySQL: ${err.message}`)
                        } else {
                            connection.end(() => {
                                annotationLogger.log(`[${new Date()}]: Add a annotation record into MySQL successfully.`)
                            })
                        }
                    })

                //创建输出目录
                fs.mkdirSync('public/results/' + rid, {
                    //是否使用递归创建目录
                    recursive: true
                })
                fs.mkdirSync('public/results/' + rid + '/log', {
                    //是否使用递归创建目录
                    recursive: true
                })
                fs.mkdirSync('public/results/' + rid + '/out', {
                    //是否使用递归创建目录
                    recursive: true
                })
                fs.writeFileSync('public/results/' + rid + "/resquest.json",
                    JSON.stringify(ctx.request) + '\n',
                    {flag: "a+"}
                );
                resolve(rid)
            } catch (err) {
                reject(err)
            }
        }
    else
        if (ctx.request.body.isDemo === "true") {
            try {
                const rid = uuidv1()
                const title = ctx.request.body.title
                const email = 'no email'
                const organ = 'demo'
                const tissue = 'demo'
                const species = 'demo'
                const matrixfilepath = 'demo'
                const labelsfilepath = 'demo'
                const resultpath = 'public/results/' + rid
                const uploadtime = uploadTime
                const finishtime = null
                const datasetID = null
                const sectionID = null
                const status = 'screening'
                // 使用 connection.query() 的查询参数占位符，在其内部对传入参数的自动调用connection.escape()方法进行编码，防止sql注入
                let insertSql = `INSERT INTO users_annotation_records VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);`;
                connection.query(insertSql,
                    [rid, title, email, species, organ, tissue, matrixfilepath, labelsfilepath, resultpath, uploadtime, finishtime,
                        datasetID, sectionID, status],
                    (err) => {
                        if (err) {
                            annotationLogger.log(`Error: [${new Date()}]: A annotation task failed in MySQL: ${err.message}`)
                        } else {
                            connection.end(() => {
                                annotationLogger.log(`[${new Date()}]: Add a annotation record annotation into MySQL successfully.`)
                            })
                        }
                    })
                //创建输出目录
                fs.mkdirSync('public/results/' + rid, {
                    //是否使用递归创建目录
                    recursive: true
                })
                fs.mkdirSync('public/results/' + rid + '/log', {
                    //是否使用递归创建目录
                    recursive: true
                })
                fs.mkdirSync('public/results/' + rid + '/out', {
                    //是否使用递归创建目录
                    recursive: true
                })
                fs.writeFileSync('public/results/' + rid + "/resquest.json",
                    JSON.stringify(ctx.request) + '\n',
                    {flag: "a+"}
                );
                resolve(rid)
            } catch (err) {
                reject(err)
            }
        } else {
            reject("There is wrong in request body.")
        }
    })
}