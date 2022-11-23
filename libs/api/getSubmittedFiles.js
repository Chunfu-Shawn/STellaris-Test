import fs from "fs";
import {resolve as resl} from 'path'
import send from "send";

export async function getSubmittedFiles(ctx, filePath){
    return new Promise(async (resolve, reject) => {
        try {
            const createReadStream = await fs.createReadStream(filePath)
            ctx.set('Content-disposition', 'attachment; filename=' + filePath.split('/')[3])
            ctx.set('Content-type', 'application/force-download')
            ctx.body = createReadStream
            resolve(createReadStream)
        } catch (err) {
            reject(err)
        }
    })
}