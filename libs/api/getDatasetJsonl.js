import fs from "fs"

export async function getDatasetJsonl(ctx, resultPath, fileName){
    return new Promise( async (resolve, reject) => {
        try {
            let jsonl = fs.readFileSync(resultPath + fileName, 'utf8');
            ctx.body = jsonl;
            resolve(jsonl)
        } catch (err) {
            reject(err)
        }
    })
}