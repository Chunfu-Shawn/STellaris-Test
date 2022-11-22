import fs from "fs"
import {getJobStatus} from "./getJobStatus.js";

export async function getMIAResult(resultPath){
    return new Promise(async (resolve, reject) => {
        try {
            const MIA = fs.readFileSync(
                resultPath + '/out/table/MIA.json', 'utf8');
            resolve(MIA)
        } catch (err) {
            reject(err)
        }
    })
}