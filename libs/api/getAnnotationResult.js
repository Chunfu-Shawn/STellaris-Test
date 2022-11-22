import fs from "fs"
import {getJobStatus} from "./getJobStatus.js";

export async function getAnnotationResult(resultPath){
    return new Promise(async (resolve, reject) => {
        try {
            const umap = fs.readFileSync(
                resultPath + '/out/table/umap.all.json', 'utf8');
            const rfdist = fs.readFileSync(
                resultPath + '/out/table/rfdist.json', 'utf8');
            const mst = fs.readFileSync(
                resultPath + '/out/table/cell_types_mst_network.json', 'utf8');
            const jsd = fs.readFileSync(
                resultPath + '/out/table/cell_types_JSD.json', 'utf8');
            const interHeat = fs.readFileSync(
                resultPath + '/out/table/inter_count_heatmap.json', 'utf8');
            const dotPlot = fs.readFileSync(
                resultPath + '/out/table/dot_plot.json', 'utf8');
            const lpPair = fs.readFileSync(
                resultPath + '/out/table/LR-pair_cell_pair.json', 'utf8');
            const data = {
                umap: umap,
                rfdist: rfdist,
                mst: mst,
                jsd: jsd,
                interHeat: interHeat,
                dotPlot: dotPlot,
                lpPair: lpPair
            }
            resolve(data)
        } catch (err) {
            reject(err)
        }
    })
}