import { v1 as uuidv1 } from 'uuid'
import multer from '@koa/multer'

export function uploadFile() {
    const limits = {
        fields: 10,//非文件字段的数量
        fileSize: 500* 1024 * 1024,//文件大小 单位 Byte
        files: 1//文件数量
    }
    const file_destination = 'public/uploads/' + new Date().getFullYear() + (new Date().getMonth() + 1) + new Date().getDate()
    const storage = multer.diskStorage({
        destination: file_destination,
        filename: function (ctx, file, cb) {
            const filenameArr = file.originalname.split('.')
            cb(null, uuidv1() + '.' + filenameArr[filenameArr.length - 1])
        }
    })
    return uploadFile = multer({storage,limits})
}