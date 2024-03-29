import fs from "fs"
import child_process from 'child_process';
import {setJobStatus} from "./record/setJobStatus.js";
import {annotationLogger} from "./logSave.js";
import {execReCompress} from "./execReCompress.js";
import removeUploadFiles from "./removeUploadFiles.js";
import {getJobInfo} from "./api/getJobInfo.js";
import {updateJob2Finished} from "./queue/updateJob2Finished.js";
import {setJobTime} from "./record/setJobTime.js";
import {getJobParams} from "./record/getJobParams.js";

export async function execSpatialMapping(rid, nThreads=30) {
    const params = await getJobParams(rid)
    const record = await getJobInfo(rid)
    const method = params.method
    const knnNum = params.knn_num
    const nSpots = params.n_spots
    const nCells = params.n_cells
    const nRedundancy = params.n_redundancy
    const dataset = record.dataset_id
    const section = record.section_id
    const resultPath = record.result_path
    const species = record.species
    const sc_h5ad_Path = resultPath + "/sc.h5ad"
    let command
    if (method === "CellTrek"){
        command =
            "bash scripts/Spatial_mapping/CellTrek/spatial_mapping.sh" +
            " --sc_h5ad " + sc_h5ad_Path +
            " --key_celltype " + "cell_type" +
            " --dataset " + dataset +
            " --section " + section +
            " --knn_num " + knnNum +
            " --n_spots " + nSpots +
            " --n_cells " + nCells +
            " --n_redundancy " + nRedundancy +
            " --species " + `"${species}"` +
            " --n_threads " + nThreads +
            " --outDir " + resultPath
    }else if (method === "CytoSPACE"){
        command =
            "bash scripts/Spatial_mapping/CytoSPACE/spatial_mapping.sh" +
            " --sc_h5ad " + sc_h5ad_Path +
            " --key_celltype cell_type" +
            " --sc_counts " + resultPath + "/sc_counts.txt" +
            " --sc_labels " + resultPath + "/sc_labels.txt" +
            " --dataset " + dataset +
            " --section " + section +
            " --key_celltype cell_type" +
            " --n_threads " + nThreads +
            " --nosss 5000" +
            " --species " + `"${species}"` +
            " --outDir " + resultPath
    }else if (method === "Tangram"){
        command =
            "bash scripts/Spatial_mapping/Tangram/spatial_mapping.sh" +
            " --sc_h5ad " + sc_h5ad_Path +
            " --key_celltype cell_type" +
            " --dataset " + dataset +
            " --section " + section +
            " --num_epochs 1000" +
            " --n_threads " + nThreads +
            " --species " + `"${species}"` +
            " --outDir " + resultPath
    }
    if (record.type === "multiomics"){
        const fragments_file_path = record.fragments_file_path
        const peak_file_path = record.peak_file_path
        const genome = record.genome
        record.peak_file_path === null ?
            command = command +
                " --fragment_file " + fragments_file_path +
                " --genome " + genome
            :
            command = command +
                " --fragment_file " + fragments_file_path +
                " --peak_file " + peak_file_path +
                " --genome " + genome
    }
    command = command +
        " >"+ resultPath + "/log/spatial_mapping.log"+
        " 2>" + resultPath + "/log/Error.log"

    // 执行注释脚本
    if(!fs.existsSync(sc_h5ad_Path)) {
        //如果空间数据不存在
        await setJobStatus(rid, "error")
        await setJobTime(rid, "ann_finish_time")
        await updateJob2Finished(rid)
        annotationLogger.log(`${rid} [${new Date().toLocaleString()}] Error: There is no scRNA-seq data while perform spatial mapping.`)
    } else {
        try {
            annotationLogger.log(`${rid} [${new Date().toLocaleString()}]: Spatial mapping running...`)
            // 改变任务状态为running，设置任务开始时间
            await setJobStatus(rid,"running")
            await setJobTime(rid, "ann_start_time")
            let annoProcess = child_process.exec(command)
            // 监听annoProcess任务的exit事件，如果发生则调用listener
            annoProcess.on('exit', function (code) {
                annotationLogger.log(`${rid} [${new Date().toLocaleString()}]: child process 'Spatial Mapping' has exited，exit code: ${code}`)
                if (code === 0) {
                    setJobStatus(rid, "finished")
                    execReCompress(rid, resultPath)
                }
                else {
                    setJobStatus(rid,"error")
                    removeUploadFiles(rid, resultPath)
                }
                setJobTime(rid, "ann_finish_time")
                updateJob2Finished(rid)
            });
        } catch (err) {
            annotationLogger.log(`${rid} [${new Date().toLocaleString()}] Error: Error of reading/writing file from disk or python running: ${err}`)
        }
    }
}