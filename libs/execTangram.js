import fs from "fs"
import child_process from 'child_process';

export function execTangram(destination,filename) {
    const mapping_py = './scripts/run_tangram_mapping.py'
    const ad_sp = '../datasets/adata_a2p2.telen.m500.log1p.leiden.deg.h5ad';
    const out_path = destination + '/out/' + filename.split('.')[0] + '.telen.m500.log1p.leiden.deg.h5ad';
    const command_mode_cells =
        `python3 ` + mapping_py + `\
      --ad_sc ` + destination+'/'+filename + `\
      --ad_sp ` + ad_sp + `\
      --use_raw_sc \
      --use_raw_sp \
      --key_deg rank_genes_groups_ct \
      --top_n_marker 100 \
      --device gpu \
      --mode cells \
      --cluster_label 'cell type' \
      --out ` + out_path + `1>log/tangram.a2p2_telen.log 2>&1`;
    const command_mode_clusters =
        `python3 ` + mapping_py + `\
      --ad_sc ` + destination+'/'+filename + `\
      --ad_sp ` + ad_sp + `\
      --use_raw_sc \
      --use_raw_sp \
      --key_deg rank_genes_groups_ct \
      --top_n_marker 100 \
      --device gpu \
      --mode clusters \
      --cluster_label 'cell type' \
      --out ` + out_path + `1>log/tangram.a2p2_telen.clsCt.log 2>&1`;

    if (!fs.existsSync(`./scripts/run_tangram_mapping.py`)||
        !fs.existsSync(ad_sp)) {
        console.log('Sorry, annotation script not found !');
    } else {
        try {
            fs.mkdirSync('public/results/' + filename + '/log', {
                //是否使用递归创建目录
                recursive: true
            })
            fs.mkdirSync('public/results/' + filename + '/out', {
                //是否使用递归创建目录
                recursive: true
            })
            let workerProcess = child_process.exec(command_mode_clusters, function (error, stdout, stderr) {
                if (error) {
                    console.log(error.stack);
                    console.log('Error code: '+error.code);
                    console.log('Signal received: '+error.signal);
                }
                console.log('stdout: ' + stdout);
                console.log('stderr: ' + stderr);
            })
            workerProcess.on('exit', function (code) {
                console.log("子进程'注释进程'已退出，退出码 "+code);
            });
        }catch (err) {
            console.log(`Error of reading/writing file from disk or python running: ${err}`)
        }
    }
}