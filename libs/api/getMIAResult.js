import fs from "fs"

export async function getMIAResult(rid){
    return new Promise((resolve,reject) => {
        try {
            const MIA = fs.readFileSync(
                'public/results/' + rid + '/out/table/MIA.json', 'utf8');
            resolve(MIA)
        } catch (err) {
            reject(err)
        }
    })
}