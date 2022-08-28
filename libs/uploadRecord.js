import fs from "fs"
import { v1 as uuidv1 } from 'uuid'

export function uploadRecord(ctx, uploadtime) {
    console.log(ctx.request.body)
    // whether the request is to run demo
    if( typeof ctx.request.body.isDemo === undefined ){
        try {
            // 将上传的文件基本信息写入相应文件夹中的filesInfo.json
            let fileInfo = {};
            const rid = ctx.request.files['matrixFile'][0].destination.split('/')[3]
            fileInfo.rid = rid
            fileInfo.matrixfilepath = ctx.request.files['matrixFile'][0].destination + '/' + ctx.request.files['matrixFile'][0].filename
            fileInfo.barcodesfilepath = ctx.request.files['barcodesFile'][0].destination + '/' + ctx.request.files['barcodesFile'][0].filename
            fileInfo.featuresfilepath = ctx.request.files['featuresFile'][0].destination + '/' + ctx.request.files['featuresFile'][0].filename
            fileInfo.resultpath = 'public/results/' + rid
            fileInfo.uploadtime = uploadtime
            fileInfo.finishtime = ""
            fileInfo.title = ctx.request.body.title
            fileInfo.email = ctx.request.body.emailAddress
            fileInfo.organ = ctx.request.body.organ
            fileInfo.tissue = ctx.request.body.tissue
            fileInfo.status = 'running'
            // 读取json文件，转为JSON对象
            let filesInfo = JSON.parse(fs.readFileSync('public/files/filesInfo.json', 'utf8'))
            // 将这次上传文件的信息存储到JSON对象中
            filesInfo[rid] = fileInfo
            // 写入文件
            fs.writeFileSync("public/files/filesInfo.json",
                JSON.stringify(filesInfo),
                {flag: "w"}
            );
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
            // 将上传的文件信息写入相应文件夹中的fileInfo.json
            fs.writeFileSync('public/results/' + rid + "/fileInfo.json",
                JSON.stringify(ctx.request.files['matrixFile'][0]) + '\n' +
                JSON.stringify(ctx.request.files['barcodesFile'][0]) + '\n' +
                JSON.stringify(ctx.request.files['featuresFile'][0]),
                {flag: "a+"}
            )
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
            // 将上传的文件基本信息写入相应文件夹中的filesInfo.json
            let fileInfo = {};
            const rid = uuidv1()
            fileInfo.rid = rid
            fileInfo.matrixfilepath = 'demo'
            fileInfo.barcodesfilepath = 'demo'
            fileInfo.featuresfilepath = 'demo'
            fileInfo.resultpath = 'public/results/' + rid
            fileInfo.uploadtime = uploadtime
            fileInfo.finishtime = ""
            fileInfo.title = 'demo'
            fileInfo.email = 'demo'
            fileInfo.organ = 'demo'
            fileInfo.tissue = 'demo'
            fileInfo.status = 'running'
            // 读取json文件，转为JSON对象
            let filesInfo = JSON.parse(fs.readFileSync('public/files/filesInfo.json', 'utf8'))
            // 将这次上传文件的信息存储到JSON对象中
            filesInfo[rid] = fileInfo
            // 写入文件
            fs.writeFileSync("public/files/filesInfo.json",
                JSON.stringify(filesInfo),
                {flag: "w"}
            );
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
    }
}