import fs from "fs"

export async function getAnnotationResult(resultPath){
    return new Promise(async (resolve, reject) => {
        try {
            const jsonl = fs.readFileSync(
                resultPath + '/out/json/umap.all.json', 'utf8');
            resolve(data)
        } catch (err) {
            reject(err)
        }
    })
}