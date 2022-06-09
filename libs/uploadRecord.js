const fs = require("fs");

function uploadRecord(ctx, uploadtime) {
    try {
        // 将上传的文件基本信息写入相应文件夹中的filesInfo.json
        let fileInfo = {};
        fileInfo.filepath = ctx.request.file.destination + '/' + ctx.request.file.filename
        fileInfo.resultpath = 'public/results/' + ctx.request.file.filename
        fileInfo.uploadtime = uploadtime
        fileInfo.jobtitle = ctx.request.body.title
        fileInfo.email = ctx.request.body.email
        // 读取json文件，转为JSON对象
        let filesInfo = JSON.parse(fs.readFileSync('public/uploads/filesInfo.json', 'utf8'))
        // 将这次上传文件的信息存储到JSON对象中
        filesInfo[ctx.request.file.filename.split('.')[0]] = fileInfo
        // 写入文件
        fs.writeFileSync("public/uploads/filesInfo.json",
            JSON.stringify(filesInfo),
            {flag: "w"}
        );
        //创建输出目录
        fs.mkdirSync('public/results/' + ctx.request.file.filename, {
            //是否使用递归创建目录
            recursive: true
        })
        // 将上传的文件信息写入相应文件夹中的fileInfo.json
        fs.writeFileSync('public/results/' + ctx.request.file.filename + "/fileInfo.json",
            JSON.stringify(ctx.request.file) + '\n',
            {flag: "a+"}
        )
        fs.writeFileSync('public/results/' + ctx.request.file.filename + "/resquest.json",
            JSON.stringify(ctx.request) + '\n',
            {flag: "a+"}
        );
    }catch (err) {
        console.log(`Error reading or writing file info from disk: ${err}`);
    }
}

module.exports = { uploadRecord };