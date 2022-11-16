import fs from "fs"

export async function getAnnotationResult(rid){
    return new Promise((resolve,reject) => {
        try {
            const umap = fs.readFileSync(
                'public/results/' + rid + '/out/table/umap.all.json', 'utf8');
            const rfdist = fs.readFileSync(
                'public/results/' + rid + '/out/table/rfdist.json', 'utf8');
            const mst = fs.readFileSync(
                'public/results/' + rid + '/out/table/cell_types_mst_network.json', 'utf8');
            const jsd = fs.readFileSync(
                'public/results/' + rid + '/out/table/cell_types_JSD.json', 'utf8');
            const interHeat = fs.readFileSync(
                'public/results/' + rid + '/out/table/inter_count_heatmap.json', 'utf8');
            const data = {
                umap: umap,
                rfdist:rfdist,
                mst: mst,
                jsd: jsd,
                interHeat: interHeat,
            }
            resolve(data)
        } catch (err) {
            reject(err)
        }
    })
}