import fs from "fs"
import child_process from 'child_process';
import {setReqStatus} from "./api/setReqStatus.js";

export function execTangram(destination,filename) {
    const rid = filename.split('.')[0]
    const mapping_py = './scripts/run_tangram_mapping.py'
    const ad_sc = '../test_tangram/adata.addDEG.h5ad';
    const ad_sp = '../test_tangram/adata_a2p2.telen.m500.log1p.leiden.deg.h5ad';
    let mode = 'clusters'
    const out_path = '../test_tangram'
    //const out_path = destination + '/out/' + filename.split('.')[0] + '.h5ad';
    const command =
        'python3 ' + mapping_py
        + ' --ad_sc ' + ad_sc
        + ' --ad_sp ' + ad_sp
        + ' --use_raw_sc '
        + ' --use_raw_sp '
        + ' --key_deg rank_genes_groups_ct '
        + ' --top_n_marker 100 '
        + ' --device cuda '
        + ' --mode ' + mode
        + ' --cluster_label "cell type" '
        + ' --out ' + out_path + '/admap_clsCt_a2p2.telen.m500.log1p.leiden.deg.h5ad'
    // 创建日志数据输入流
    const logfile = fs.createWriteStream('public/results/' + rid + '/log/exec.log',{
        flags:'a', //文件的打开模式
        encoding: 'utf8',
    });
    // 创建logger
    let logger = new console.Console(logfile);
    // 执行脚本
    if (!fs.existsSync(`./scripts/run_tangram_mapping.py`)) {
        console.log('Sorry, annotation script not found !');
    } else if(!fs.existsSync(ad_sp)) {
        console.log('Sorry, spatial trans data not found !');
    }else {
        try {
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
                logger.log("child process 'annotation' has exited，exit code: " + code);
                if (code === 0) setReqStatus(rid, true)
            });
        } catch (err) {
            logger.log(`Error of reading/writing file from disk or python running: ${err}`)
        }
    }
}