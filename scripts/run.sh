################################################
#File Name: run.sh
#Author: Up Lee    
#Mail: uplee@pku.edu.cn
#Created Time: Wed 29 Dec 2021 08:35:56 PM CST
################################################

#!/bin/sh 

#### 2021-12-29 ####
# See /home/user/data2/uplee/projects/spatialTransWeb/bin/annotation_tangram.py for details of bulk mapping.

#### 1. Perform tangram mapping

### 1.1 WT A2-2
scriptDir=/home/user/data2/uplee/projects/spatialTransWeb/bin
ad_sc=/home/user/data2/uplee/projects/spatialTransWeb/data/public/scRNAseq/mouseCortex/data/annData_annotation_qijt/adata.addDEG.h5ad
ad_sp=/home/user/data2/uplee/projects/spatialTransWeb/analysis/inhouse/apcdd1_e14.5_brain/add_gem/bin20/spatial_cluster/outs/A2-2/adata_a2p2.telen.m500.log1p.leiden.deg.h5ad

mkdir -p log

## makrer:rank_genes_groups_ct top100;mode:cells

python $scriptDir/run_tangram_mapping.py \
  --ad_sc $ad_sc \
  --ad_sp $ad_sp \
  --use_raw_sc \
  --use_raw_sp \
  --key_deg rank_genes_groups_ct \
  --top_n_marker 100 \
  --device cpu \
  --mode cells \
  --out outs/A2-2/admap_a2p2.telen.m500.log1p.leiden.deg.h5ad 1>log/tangram.a2p2_telen.log 2>&1

## makrer:rank_genes_groups_ct top100;mode:clusters

python $scriptDir/run_tangram_mapping.py \
  --ad_sc $ad_sc \
  --ad_sp $ad_sp \
  --use_raw_sc \
  --use_raw_sp \
  --key_deg rank_genes_groups_ct \
  --top_n_marker 100 \
  --device cpu \
  --mode clusters \
  --cluster_label 'cell type' \
  --out outs/A2-2/admap_clsCt_a2p2.telen.m500.log1p.leiden.deg.h5ad 1>log/tangram.a2p2_telen.clsCt.log 2>&1

#### 2. Bulk perform tangram mapping

scriptDir=/home/user/data2/uplee/projects/spatialTransWeb/bin
ad_sc=/home/user/data2/uplee/projects/spatialTransWeb/data/public/scRNAseq/mouseCortex/data/annData_annotation_qijt/adata.addDEG.h5ad


####################
# Telen ############
####################

# marker: rank_genes_groups_ct top100;mode:cells
for sample in A1-1 A1-2 A1-3 A1-4 A2-1 A2-2;do
 group=$( echo $sample | cut -c 2 )
 index=$( echo $sample | cut -c 4 )
 min=$( echo $index | awk '{print $1%2?"m300":"m500"}' )
 name=a${group}p${index}
 ad_sp=/home/user/data2/uplee/projects/spatialTransWeb/analysis/inhouse/apcdd1_e14.5_brain/add_gem/bin20/spatial_cluster/outs/$sample/adata_${name}.telen.${min}.log1p.leiden.deg.h5ad
 for n in 100;do
  for key in rank_genes_groups_ct;do
	time (python $scriptDir/run_tangram_mapping.py \
		--ad_sc $ad_sc \
		--ad_sp $ad_sp \
		--use_raw_sc \
		--use_raw_sp \
		--key_deg $key \
		--top_n_marker $n \
		--device cpu \
		--mode cells \
		--out outs/$sample/admap_mCt${n}_cell_${name}.telen.${min}.log1p.leiden.deg.h5ad) 1>log/tangram.admap_mCt${n}_cell_${name}.telen.${min}.log 2>&1 & 
  done
 done
done
wait

# marker: rank_genes_groups_leiden top100-500;mode:cells (adopted)
for n in 500 400 300 200 100;do
 for sample in A1-1 A1-2 A1-3 A1-4 A2-1 A2-2;do
  group=$( echo $sample | cut -c 2 )
  index=$( echo $sample | cut -c 4 )
  min=$( echo $index | awk '{print $1%2?"m300":"m500"}' )
  name=a${group}p${index}
  ad_sp=/home/user/data2/uplee/projects/spatialTransWeb/analysis/inhouse/apcdd1_e14.5_brain/add_gem/bin20/spatial_cluster/outs/$sample/adata_${name}.telen.${min}.log1p.leiden.deg.h5ad
  for key in rank_genes_groups_leiden;do
    time (python $scriptDir/run_tangram_mapping.py \
        --ad_sc $ad_sc \
        --ad_sp $ad_sp \
        --use_raw_sc \
        --use_raw_sp \
        --key_deg $key \
        --top_n_marker $n \
        --device cpu \
        --mode cells \
        --out outs/$sample/admap_mLeiden${n}_cell_${name}.telen.${min}.log1p.leiden.deg.h5ad) 1>log/tangram.admap_mLeiden${n}_cell_${name}.telen.${min}.log 2>&1 &
  done
 done
 wait
done

wait
######################
# Half Brain #########
######################

# marker: rank_genes_groups_leiden top100-500 (adopted)

for n in 500 400 300 200 100;do
 for sample in A1-1 A1-2 A1-3 A1-4 A2-1 A2-2;do
  group=$( echo $sample | cut -c 2 )
  index=$( echo $sample | cut -c 4 )
  min=$( echo $index | awk '{print $1%2?"m300":"m500"}' )
  name=a${group}p${index}
  ad_sp=/home/user/data2/uplee/projects/spatialTransWeb/analysis/inhouse/apcdd1_e14.5_brain/add_gem/bin20/spatial_cluster/outs/$sample/adata_${name}.half.${min}.log1p.leiden.deg.h5ad
  for key in rank_genes_groups_leiden;do
    time (python $scriptDir/run_tangram_mapping.py \
        --ad_sc $ad_sc \
        --ad_sp $ad_sp \
        --use_raw_sc \
        --use_raw_sp \
        --key_deg $key \
        --top_n_marker $n \
        --device cpu \
        --mode cells \
        --out outs/$sample/admap_mLeiden${n}_cell_${name}.half.${min}.log1p.leiden.deg.h5ad) 1>log/tangram.admap_mLeiden${n}_cell_${name}.half.${min}.log 2>&1 &
  done
 done
 wait
done

wait

#### EO 2021-12-29 ####

