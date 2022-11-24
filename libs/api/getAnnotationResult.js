import fs from "fs"
import mysql from "mysql";
import {getDatasetsInfo} from "./getDatasetsInfo.js";

export async function getAnnotationResult(datasetId, resultPath){
    return new Promise(async (resolve, reject) => {
        try {
            const umap = fs.readFileSync(
                resultPath + '/out/json/umap.all.json', 'utf8');
            const rfdist = fs.readFileSync(
                resultPath + '/out/json/rfdist.json', 'utf8');
            const mst = fs.readFileSync(
                resultPath + '/out/json/cell_types_mst_network.json', 'utf8');
            const jsd = fs.readFileSync(
                resultPath + '/out/json/cell_types_JSD.json', 'utf8');
            const interHeat = fs.readFileSync(
                resultPath + '/out/json/inter_count_heatmap.json', 'utf8');
            const dotPlot = fs.readFileSync(
                resultPath + '/out/json/dot_plot.json', 'utf8');
            const lpPair = fs.readFileSync(
                resultPath + '/out/json/LR-pair_cell_pair.json', 'utf8');

            // get dataset and section information
            const datasetInfo = await getDatasetsInfo(datasetId)

            let data = {
                umap: umap,
                rfdist: rfdist,
                mst: mst,
                jsd: jsd,
                interHeat: interHeat,
                dotPlot: dotPlot,
                lpPair: lpPair,
                datasetInfo: datasetInfo[0]
            }


            resolve(data)
        } catch (err) {
            reject(err)
        }
    })
}