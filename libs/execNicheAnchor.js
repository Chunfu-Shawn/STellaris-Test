import fs from "fs"
import child_process from 'child_process';
import {setJobStatus} from "./setJobStatus.js";
import {annotationLogger} from "./logSave.js";

export function execNicheAnchor(rid, dataset, section, resultPath, cutoff) {
    // 改变任务状态为running，设置任务开始时间
    setJobStatus(rid, "ann_start_time","running")
    const nicheAnchor = 'scripts/NicheAnchor/nicheAnchor.sh'
    const sc_h5ad_Path = resultPath + "/sc.h5ad"
    const command =
        "bash " + nicheAnchor +
        " --sc_h5ad " + sc_h5ad_Path +
        " --key_celltype " + "cell_type" +
        " --dataset " + dataset +
        " --section " + section +
        " --outDir " + resultPath

    // 创建日志数据输入流
    const logfile = fs.createWriteStream(resultPath + '/log/nicheAnchor.log',{
        flags:'a', //文件的打开模式
        encoding: 'utf8',
    });
    // 创建logger
    let logger = new console.Console(logfile);
    // 执行注释脚本
    if (!fs.existsSync(nicheAnchor)) {
        //如果python脚本不存在
        logger.log('Sorry, annotation script not found !');
        setJobStatus(rid, "ann_finish_time","error")
        annotationLogger.log(`[${new Date().toLocaleString()}] Error: There is a error happened while NicheAnchor running`)
    } else if(!fs.existsSync(sc_h5ad_Path)) {
        //如果空间数据不存在
        logger.log('Sorry, scRNA-seq h5ad data not found !');
        setJobStatus(rid, "ann_finish_time","error")
        annotationLogger.log(`[${new Date().toLocaleString()}] Error: There is a error happened while NicheAnchor running`)
    } else {
        try {
            logger.log("NicheAnchor running...");
            annotationLogger.log(`[${new Date().toLocaleString()}]: NicheAnchor running...`)
            let annoProcess = child_process.exec(command, function (error, stdout, stderr) {
                if (error) {
                    logger.log('\n' + 'Stdout: ' + stdout);
                    //将error写入日志
                    logger.log(error.stack);
                    logger.log('Error code: ' + error.code);
                }else {
                    logger.log('\n' + 'Stdout: ' + stdout);
                }
            })
            // 监听annoProcess任务的exit事件，如果发生则调用listener
            annoProcess.on('exit', function (code) {
                logger.log(`child process 'annotation' has exited，exit code: ${code}`);
                annotationLogger.log(`[${new Date().toLocaleString()}]: child process 'NicheAnchor' has exited，exit code: ${code}`)
                if (code === 0) setJobStatus(rid, "ann_finish_time","error")
                else setJobStatus(rid, "ann_finish_time","error")
            });
        } catch (err) {
            logger.log(`Error of reading/writing file from disk or python running: ${err}`)
            annotationLogger.log(`Error: [${new Date().toLocaleString()}]: Error of reading/writing file from disk or python running: ${err}`)
        }
    }
}