import fs from "fs"
import child_process from 'child_process';
import {setJobStatus} from "./api/setJobStatus.js";
import {annotationLogger} from "./logSave.js";

export function execTangram(rid,destination,filename) {
    const tangram = './scripts/annotation_tangram.py'
    // const ad_sc = '../test_tangram/adata.addDEG.h5ad';
    const ad_sp = '../datasets/adata_a2p2.telen.m500.log1p.leiden.deg.h5ad';
    let mode = 'clusters'
    const out_path = '../datasets'
    //const out_path = destination + '/out/' + filename.split('.')[0] + '.h5ad';
    const command =
        `python3 ${tangram}
        --raw_path ${destination}
        --ad_sp ${ad_sp}
        --use_raw_sc 
        --use_raw_sp 
        --key_deg rank_genes_groups_ct 
        --top_n_marker 100
        --device cuda 
        --mode ${mode}
        --cluster_label "cell type"
        --out ${out_path}/${rid}_map.h5ad
        `
    // 创建日志数据输入流
    const logfile = fs.createWriteStream('public/results/' + rid + '/log/exec.log',{
        flags:'a', //文件的打开模式
        encoding: 'utf8',
    });
    // 创建logger
    let logger = new console.Console(logfile);
    // 执行注释脚本
    if (!fs.existsSync(tangram)) {
        //如果python脚本不存在
        logger.log('Sorry, annotation script not found !');
        setJobStatus(rid, "error")
        annotationLogger.log(`Error:[${new Date()}]: There is a error happened while tangram running`)
    } else if(!fs.existsSync(ad_sp)) {
        //如果空间数据不存在
        logger.log('Sorry, spatial trans data not found !');
        setJobStatus(rid, "error")
        annotationLogger.log(`Error: [${new Date()}]: There is a error happened while Tangram running`)
    } else {
        try {
            logger.log("Tangram running...");
            annotationLogger.log(`[${new Date()}]: Tangram running...`)
            let annoProcess = child_process.exec(command, function (error, stdout, stderr) {
                if (error) {
                    //将error写入日志
                    logger.log(error.stack);
                    logger.log('Error code: ' + error.code);
                    logger.log('Signal received: ' + error.signal);
                }
                logger.log('\n' + 'Stdout: ' + stdout);
                logger.log('\n' + 'Stderr: ' + stderr);
            })
            // 监听annoProcess任务的exit事件，如果发生则调用listener
            annoProcess.on('exit', function (code) {
                logger.log(`child process 'annotation' has exited，exit code: ${code}`);
                annotationLogger.log(`[${new Date()}]: "child process 'annotation' has exited，exit code: ${code}`)
                if (code === 0) setJobStatus(rid, 'finished')
                //else setJobStatus(rid, "error")
            });
        } catch (err) {
            logger.log(`Error of reading/writing file from disk or python running: ${err}`)
            annotationLogger.log(`Error: [${new Date()}]: Error of reading/writing file from disk or python running: ${err}`)
        }
    }
}