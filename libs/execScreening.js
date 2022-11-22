import fs from "fs"
import child_process from 'child_process';
import {annotationLogger} from "./logSave.js";
import {setJobScreenStatus} from "./setJobScreenStatus.js";

export function execScreening(rid, matrixFilePath, labelsFilePath, datasets, sections, resultPath) {
    const stScreening = './scripts/ST_screening/ST_screening.sh'
    const command =
        `conda activate st_ann_anls;
        bash ${stScreening}
        --count ${matrixFilePath}
        --label ${labelsFilePath}
        --dataset ${datasets}
        --section ${sections}
        --outDir ${resultPath}
        `
    // 创建日志数据输入流
    const logfile = fs.createWriteStream('public/results/' + rid + '/log/ST_screening.log',{
        flags:'a', //文件的打开模式
        encoding: 'utf8',
    });
    // 创建logger
    let logger = new console.Console(logfile);
    // 执行注释脚本
    if (!fs.existsSync(stScreening)) {
        //如果python脚本不存在
        setJobScreenStatus(rid, "error")
        annotationLogger.log(`[${new Date()}] Error: ST screening script not found !`)
    } else if(!fs.existsSync(matrixFilePath) && !fs.existsSync(labelsFilePath)) {
        //如果空间数据不存在
        setJobScreenStatus(rid, "error")
        annotationLogger.log(`[${new Date()}] Error: scRNA-seq data not fount !`)
    } else {
        try {
            annotationLogger.log(`[${new Date()}]: ST screening running...`)
            let screenProcess = child_process.exec(command, function (error, stdout, stderr) {
                if (error) {
                    //将error写入日志
                    logger.log(error.stack);
                    logger.log('Error code: ' + error.code);
                }
                logger.log('\n' + 'Stdout: ' + stdout);
                logger.log('\n' + 'Stderr: ' + stderr);
            })
            // 监听screenProcess任务的exit事件，如果发生则调用listener
            screenProcess.on('exit', function (code) {
                logger.log(`ST screening has exited，exit code: ${code}`);
                annotationLogger.log(`[${new Date()}]: "ST screening has exited，exit code: ${code}`)
                if (code === 0) {
                    setJobScreenStatus(rid, 'selecting')
                }
                else {
                    setJobScreenStatus(rid, "error")
                }
            });
        } catch (err) {
            logger.log(`Error of reading/writing file from disk or python running: ${err}`)
            annotationLogger.log(`Error: [${new Date()}]: Error of reading/writing file from disk or python running: ${err}`)
        }
    }
}