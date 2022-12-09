import fs from "fs"
import child_process from 'child_process';
import {setJobStatus} from "./setJobStatus.js";
import {annotationLogger} from "./logSave.js";
import {execReCompress} from "./execReCompress.js";
import removeUploadFiles from "./removeUploadFiles.js";

export async function execNicheAnchor(rid, dataset, section, divergenceCutoff, bandWidth,
                                species, resultPath, nBootstrap = 20, nThreads=30) {
    const nicheAnchor = 'scripts/NicheAnchor/nicheAnchor-cellInteraction.sh'
    const sc_h5ad_Path = resultPath + "/sc.h5ad"
    const command =
        "bash " + nicheAnchor +
        " --sc_h5ad " + sc_h5ad_Path +
        " --key_celltype " + "cell_type" +
        " --dataset " + dataset +
        " --section " + section +
        " --divergence_cutoff " + divergenceCutoff +
        " --band_width " + bandWidth +
        " --n_bootstrap " + nBootstrap +
        " --species " + `"${species}"` +
        " --n_threads " + nThreads +
        " --outDir " + resultPath +
        " >"+ resultPath + "/log/nicheAnchor.log"+
        " 2>" + resultPath + "/log/Error.log"

    // 执行注释脚本
    if (!fs.existsSync(nicheAnchor)) {
        //如果python脚本不存在
        await setJobStatus(rid, "ann_finish_time","error")
        annotationLogger.log(`[${new Date().toLocaleString()}] Error: There is a error happened while NicheAnchor running`)
    } else if(!fs.existsSync(sc_h5ad_Path)) {
        //如果空间数据不存在
        await setJobStatus(rid, "ann_finish_time","error")
        annotationLogger.log(`[${new Date().toLocaleString()}] Error: There is a error happened while NicheAnchor running`)
    } else {
        try {
            annotationLogger.log(`[${new Date().toLocaleString()}]: NicheAnchor running...`)
            // 改变任务状态为running，设置任务开始时间
            await setJobStatus(rid, "ann_start_time","running")
            let annoProcess = child_process.exec(command)
            // 监听annoProcess任务的exit事件，如果发生则调用listener
            annoProcess.on('exit', function (code) {
                annotationLogger.log(`[${new Date().toLocaleString()}]: child process 'NicheAnchor' has exited，exit code: ${code}`)
                if (code === 0) {
                    setJobStatus(rid, "ann_finish_time","finished")
                    execReCompress(resultPath)
                }
                else {
                    setJobStatus(rid, "ann_finish_time","error")
                    removeUploadFiles(resultPath)
                }
            });
        } catch (err) {
            annotationLogger.log(`[${new Date().toLocaleString()}] Error: Error of reading/writing file from disk or python running: ${err}`)
        }
    }
}