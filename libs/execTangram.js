const shell = require('shelljs');
const fs = require("fs");

function execTangram(destination,filename) {
    const mapping_py = './scripts/run_tangram_mapping.py'
    const ad_sp = '../datasets/adata_a2p2.telen.m500.log1p.leiden.deg.h5ad';
    const out_path = destination + '/out/' + filename.split('.')[0] + '.telen.m500.log1p.leiden.deg.h5ad';
    const command_mode_cells =
        `python ` + mapping_py + `\
      --ad_sc ` + destination+'/'+filename + `\
      --ad_sp ` + ad_sp + `\
      --use_raw_sc \
      --use_raw_sp \
      --key_deg rank_genes_groups_ct \
      --top_n_marker 100 \
      --device cpu \
      --mode cells \
      --cluster_label 'cell type' \
      --out ` + out_path + `1>log/tangram.a2p2_telen.log 2>&1`;
    const command_mode_clusters =
        `python ` + mapping_py + `\
      --ad_sc ` + destination+'/'+filename + `\
      --ad_sp ` + ad_sp + `\
      --use_raw_sc \
      --use_raw_sp \
      --key_deg rank_genes_groups_ct \
      --top_n_marker 100 \
      --device cpu \
      --mode clusters \
      --cluster_label 'cell type' \
      --out ` + out_path + `1>log/tangram.a2p2_telen.clsCt.log 2>&1`;

    if (!fs.existsSync(`./scripts/run_tangram_mapping.py`)||
        !fs.existsSync(ad_sp)) {
        shell.echo('Sorry, this script not found !');
    } else {
        try {
            shell.mkdir('-p', 'public/results/' + filename + '/log');
            shell.mkdir('-p', 'public/results/' + filename + '/out');
        }catch (err) {
            console.log(`Error reading or writing file info from disk: ${err}`)
        }
    }
}

module.exports = {execTangram}