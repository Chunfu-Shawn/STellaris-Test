import fs from "fs";

export async function getFile(ctx, filePath, filename){
    return new Promise(async (resolve, reject) => {
        try {
            const createReadStream = await fs.createReadStream(filePath)
            ctx.set('Content-disposition', 'attachment; filename=' + filename)
            ctx.set('Content-type', 'application/force-download')
            ctx.body = createReadStream
            resolve(createReadStream)
        } catch (err) {
            reject(err)
        }
    })
}