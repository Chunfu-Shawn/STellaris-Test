import multer from '@koa/multer'
import fs from "fs";
import { v1 as uuidv1 } from 'uuid'

export function uploadFile() {
    let uuid = uuidv1()
    fs.mkdirSync('public/uploads/' + new Date().getFullYear() + (new Date().getMonth() + 1) + new Date().getDate()
        +'/' + uuid,
        {
            //是否使用递归创建目录
            recursive: true
        })
    const limits = {
        fields: 10,//非文件字段的数量
        fileSize: 100* 1024 * 1024,//文件大小 单位 Byte
        files: 2//文件数量
    }
    const file_destination = 'public/uploads/' + new Date().getFullYear() + (new Date().getMonth() + 1) + new Date().getDate()
        +'/' + uuid
    const storage = multer.diskStorage({
        destination: file_destination,
        filename: function (ctx, file, cb) {
            cb(null, file.originalname)
        }
    })
    return uploadFile = multer({storage,limits})
}