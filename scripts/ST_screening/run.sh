################################################
#File Name: run.sh
#Author: Up Lee    
#Mail: uplee@pku.edu.cn
#Created Time: Mon 21 Nov 2022 12:08:59 PM CST
################################################

#!/bin/sh 

#### 2022-11-21 ####

# Packaging process_sc  & MIA_align

#########################
#### Script preparation
#########################

cp /home/user/data3/uplee/projects/spatialTransWeb/bin/temp/process_sc/process_sc.py ./process_sc.py # 20221121
cp /home/user/data3/uplee/projects/spatialTransWeb/bin/temp/MIA/MIA_align.v3.py ./MIA_align.py # 20221121
cp /home/user/data3/uplee/projects/spatialTransWeb/bin/temp/MIA/MIA_utils.py  ./MIA_utils.py # 20221121

#########################
#### ST_screening.sh
#########################

# See ./ST_screening.sh

#########################
#### Test ST_screening.sh
#########################

mkdir -p test1
mkdir -p test1/raw
mkdir -p test1/log

ln -s /home/user/data3/uplee/projects/spatialTransWeb/scRNA-seq/preparation/Mouse-corticogenesis/counts.csv.gz test1/raw
ln -s /home/user/data3/uplee/projects/spatialTransWeb/scRNA-seq/preparation/Mouse-corticogenesis/labels.csv.gz test1/raw

count=test1/raw/counts.csv.gz
label=test1/raw/labels.csv.gz
dataset="STW-M-Brain-Slide-seq2-1-tmp,STW-M-Brain-ST-1,STW-M-Brain-ST-3,STW-M-Brain-Stereo-seq-1,STW-M-Brain-Visium-1,STW-M-Brain-Visium-3,STW-M-Brain-Visium-6,STW-M-Embryo-DBiT-seq-1,STW-M-Embryo-DBiT-seq-2,STW-M-Kidney-Visium-4,STW-M-Liver-ST-1"
section="GSM5173925_OB1_01,Rep10_MOB,Hip_adpolb_rep1,coronal_1,GSM5621972,ST8059048,WT,GSM4096261_10t,FFPE-1,f12hr_140_processed,CN65-D2"
outDir=test1 # to be revised

time (bash ST_screening.sh \
 --count $count  \
 --label $label \
 --dataset $dataset \
 --section $section \
 --outDir $outDir) &>test1/log/ST_screening.test1.log

