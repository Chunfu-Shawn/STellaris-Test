import fs from "fs"
import { v1 as uuidv1 } from 'uuid'
import mysql from 'mysql'
// 数据库的配置选项

const options = {
    host: 'localhost',//主机名
    user: 'readwrite',//用户
    password: 'mysql_update',//密码
    port: 3306,//端口号
    database: 'spatial_trans_web'//要操作的数据库
}

export function uploadRecord(ctx, uploadTime) {
    let connection = mysql.createConnection(options)
    // 连接数据库
    connection.connect(() => {
        console.log('Connect database successfully')
    })
    // whether the request is to run demo
    if( typeof ctx.request.body.isDemo === undefined ){
        try {
            // read the uploaded form
            const rid = ctx.request.files['matrixFile'][0].destination.split('/')[3]
            const title = ctx.request.body.title
            const email = ctx.request.body.emailAddress
            const organ = ctx.request.body.organ
            const tissue = ctx.request.body.tissue
            const matrixfilepath = ctx.request.files['matrixFile'][0].destination + '/' +
                ctx.request.files['matrixFile'][0].filename
            const barcodesfilepath = ctx.request.files['barcodesFile'][0].destination + '/' +
                ctx.request.files['barcodesFile'][0].filename
            const featuresfilepath = ctx.request.files['featuresFile'][0].destination + '/' +
                ctx.request.files['featuresFile'][0].filename
            const resultpath = 'public/results/' + rid
            const uploadtime = uploadTime
            const finishtime = null
            const status = 'running'
            // 使用 connection.query() 的查询参数占位符，在其内部对传入参数的自动调用connection.escape()方法进行编码，防止sql注入
            let insertSql = `INSERT INTO users_annotation_records VALUES (?,?,?,?,?,?,?,?,?,?,?,?);`;
            connection.query(insertSql,
                [rid,title,email,organ,tissue,matrixfilepath,barcodesfilepath,featuresfilepath,resultpath,uploadtime,finishtime,status],
                (err, result) => {
                    if(err){
                        console.log(err.message);
                    }else {
                        console.log(result)
                        connection.end(()=>{
                            console.log('Database connect closed')
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
            return rid
        }catch (err) {
            console.log(`Error reading or writing file info from disk: ${err}`);
        }
    } else if (ctx.request.body.isDemo === "true"){
        try {
            const rid = uuidv1()
            const title = 'demo'
            const email = 'demo'
            const organ = 'demo'
            const tissue = 'demo'
            const matrixfilepath = 'demo'
            const barcodesfilepath = 'demo'
            const featuresfilepath = 'demo'
            const resultpath = 'public/results/' + rid
            const uploadtime = uploadTime
            const finishtime = null
            const status = 'running'
            // 使用 connection.query() 的查询参数占位符，在其内部对传入参数的自动调用connection.escape()方法进行编码，防止sql注入
            let insertSql = `INSERT INTO users_annotation_records VALUES (?,?,?,?,?,?,?,?,?,?,?,?);`;
            connection.query(insertSql,
                [rid,title,email,organ,tissue,matrixfilepath,barcodesfilepath,featuresfilepath,resultpath,uploadtime,finishtime,status],
                (err, result) => {
                if(err){
                    console.log(err.message);
                }else {
                    console.log(result)
                    connection.end(()=>{
                        console.log('Database connect closed')
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
            return rid
        }catch (err) {
            console.log(`Error run demo: ${err}`);
        }
    }else {
        console.log("Error happened!")
        return null
    }
}