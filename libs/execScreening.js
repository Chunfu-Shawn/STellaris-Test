import fs from "fs"
import child_process from 'child_process';
import {annotationLogger} from "./logSave.js";
import {setJobStatus} from "./setJobStatus.js";

export function execScreening(rid, matrixFilePath, labelsFilePath, datasets, sections, resultPath) {
    const stScreening = 'scripts/ST_screening/ST_screening.sh'
    const command =
        "bash " + stScreening +
        " --count " + matrixFilePath +
        " --label " + labelsFilePath +
        " --dataset " + datasets +
        " --section " + sections +
        " --outDir " + resultPath +
        " >"+ resultPath + "/log/ST_screening.log"

    // 创建日志数据输入流
    const logfile = fs.createWriteStream(resultPath + '/log/ST_screening.log',{
        flags:'a', //文件的打开模式
        encoding: 'utf8',
    });
    // 创建logger
    let logger = new console.Console(logfile);
    // 执行注释脚本
    if (!fs.existsSync(stScreening)) {
        //如果python脚本不存在
        // 改变任务状态为running，设置任务开始时间
        setJobStatus(rid, "screen_finish_time","error")
        annotationLogger.log(`[${new Date().toLocaleString()}] Error: ST screening script not found !`)
    } else if(!fs.existsSync(matrixFilePath) && !fs.existsSync(labelsFilePath)) {
        //如果空间数据不存在
        setJobStatus(rid, "screen_finish_time","error")
        annotationLogger.log(`[${new Date().toLocaleString()}] Error: scRNA-seq data not fount !`)
    } else {
        try {
            logger.log("ST screening running...");
            annotationLogger.log(`[${new Date().toLocaleString()}]: ST screening running...`)
            // 改变任务状态为screening，设置任务开始时间
            setJobStatus(rid, "upload_time","screening")
            let screenProcess = child_process.exec(command, function (error, stdout, stderr) {
                if (error) {
                    logger.log('\n' + 'Stdout: ' + stdout);
                    //将error写入日志
                    logger.log(error.stack);
                    logger.log('Error code: ' + error.code);
                }else {
                    logger.log('\n' + 'Stdout: ' + stdout);
                }
            })
            // 监听screenProcess任务的exit事件，如果发生则调用listener
            screenProcess.on('exit', function (code) {
                logger.log(`ST screening has exited，exit code: ${code}`);
                annotationLogger.log(`[${new Date().toLocaleString()}]: child process 'ST screening' has exited，exit code: ${code}`)
                if (code === 0) setJobStatus(rid, "screen_finish_time","selecting")
                else setJobStatus(rid, "screen_finish_time","error")
            });
        } catch (err) {
            logger.log(`Error of reading/writing file from disk or python running: ${err}`)
            annotationLogger.log(`[${new Date().toLocaleString()}] Error: Error of reading/writing file from disk or python running: ${err}`)
        }
    }
}