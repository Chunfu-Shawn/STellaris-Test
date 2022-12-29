import multer from '@koa/multer'

export function uploadFile() {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            const tmpDir = 'public/uploads/tmp'
            cb(null, tmpDir)
        },
        filename: function (ctx, file, cb) {
            cb(null, file.originalname)
        }
    })
    const limits = {
        fields: 10,//非文件字段的数量
        fileSize: 200 * 1024 * 1024,//文件大小 单位 Byte
        files: 2//文件数量
    }

    return multer({storage,limits})
}