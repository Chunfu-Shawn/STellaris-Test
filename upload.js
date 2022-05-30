const fs = require("fs");
const { v1: uuidv1 } = require('uuid');
const multer = require('@koa/multer');
const {execTangram} = require("./execTangram");
const queryUUID = uuidv1();

const file_destination = 'public/uploads/' + new Date().getFullYear() + (new Date().getMonth() + 1) + new Date().getDate()
    + '/' + queryUUID;
const storage = multer.diskStorage({
    destination: file_destination,
    filename: function (ctx,file,cb){
        const filenameArr = file.originalname.split('.');
        cb(null,Date.now() + '.' + filenameArr[filenameArr.length-1]);
    }
});

const uploadFile = multer({storage});

async function uploadRecord(ctx, next) {
    let Title = ctx.request.body.title;
    let Email = ctx.request.body.email;
    // 将上传的文件基本信息写入相应文件夹中的filesInfo.log
    fs.writeFileSync("public/uploads/filesInfo.log",
            "path: " + ctx.request.file.destination + "\n",
            {flag: "a+"}
        );
    // 将上传的文件信息写入相应文件夹中的fileInfo.txt
    for (let key in ctx.request.file) {
        fs.writeFileSync(ctx.request.file.destination + "/fileInfo.txt",
            "File." + key + ": " + ctx.request.file[key] + "\n",
            {flag: "a+"}
        );
    }
    for (let key in ctx.request.body) {
        fs.writeFileSync(ctx.request.file.destination + "/fileInfo.txt",
            "Body." + key + ": " + ctx.request.body[key] + "\n",
            {flag: "a+"}
        );
    }
    // 返回网页
    ctx.render("waitpage.html", {
        title: "Wait Page: " + queryUUID,
        job_title: Title,
        queryID: queryUUID,
        email: Email,
    })
    // 运行Tangram
    execTangram(file_destination,ctx.request.file.filename);
}

module.exports = { file_destination,uploadFile,uploadRecord };