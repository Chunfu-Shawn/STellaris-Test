#!/bin/sh 

usage(){
  echo "Usage: bash $(basename $0) --count countMatrix --label annotation --dataset ST_datasets --section ST_sections --outDir outputDirectory [-h]"
  echo "Author: UpLee"
  echo "Description: This script detects marker genes of scRNA-seq and perform MIA."
  echo "Date: 2022-11-21"
  echo "------------------------------------------------"
  echo "OPTIONS"
  echo -e "     --count \t\tCount matrix of scRNA-seq [Required]"
  echo -e "     --label \t\tMetadata including cell type of scRNA-seq [Required]"
  echo -e "     --key_celltype \t\tColumn name of cell type [default: cell_type]"
  echo -e "     --min_genes \t\tMinimum number of genes expressed required for a cell to pass filtering [default: 200]"
  echo -e "     --max_mt_pct \t\tMaximum percent of mitochondrial UMIs for a cell to pass filtering [default: 20]"
  echo -e "     --dataset \t\tA comma delimited list of ST datasets for MIA (allowed to be duplicated if one dataset containing mulitple sections) [Required]"
  echo -e "     --section \t\tA comma delimited list of sections corresponding to ST datasets [Required]"
  echo -e "     --cluster_key \t\tThe key of ST clusters for identifying marker genes [default: leiden1] [Choice: leiden0.5, leiden1, leiden1.5, leiden2]"
  echo -e "     --st_dir \t\tThe directory to access ST marker genes [default: /home/user/data3/uplee/projects/spatialTransWeb/spatial/marker]"  
  echo -e "     --n_threads \t\tNumber of threads available to perform MIA [default: 30]"
  echo -e "     --outDir \t\tPath to output directory [Required]"
  echo -e "     -h|--help \t\tprint this help page"
  exit 1
}

## Default argument
key_celltype=cell_type
min_genes=200
max_mt_pct=20
cluster_key=leiden1
st_dir=/home/user/data3/uplee/projects/spatialTransWeb/spatial/marker
n_threads=30

while [[ $# -gt 0 ]]; do
    case $1 in
        --count)            count=$2;shift;;
        --label)            label=$2;shift;;
        --key_celltype)     key_celltype=$2;shift;;
        --min_genes)        min_genes=$2;shift;;
        --max_mt_pct)       max_mt_pct=$2;shift;;
        --dataset)          dataset=$2;shift;;
        --section)          section=$2;shift;;
        --cluster_key)      cluster_key=$2;shift;;
        --st_dir)           st_dir=$2;shift;;
        --n_threads)        n_threads=$2;shift;;
        --outDir)           outDir=$2;shift;;
        -h)                 usage;exit 1;;
        --)                 shift; break;;
        *)                  usage; echo -e "\n[ERR] $(date) Unkonwn option: $1"; exit 1;;
   esac
    shift
done

## Check mandatory arguments

if [ -z $count ];then
   echo "The count matrix of scRNA-seq must be provided!" && usage
fi

if [ -z $label ];then
   echo "The annotation of scRNA-seq must be provided!" && usage
fi

if [ -z $dataset ];then
   echo "No ST datasets were retrieved!" && usage
fi

if [ -z $section ];then
   echo "No sections of ST datasets were retrieved!" && usage
fi

if [ -z $outDir ];then
   echo "Please specify output directory attributed to the current job!" && usage
fi

## Print argument

echo -e "*** Arguments"
echo -e "count\t$count"
echo -e "label\t$label"
echo -e "key_celltype\t$key_celltype"
echo -e "min_genes\t$min_genes"
echo -e "max_mt_pct\t$max_mt_pct"
echo -e "dataset\t$dataset"
echo -e "section\t$section"
echo -e "cluster_key\t$cluster_key"
echo -e "st_dir\t$st_dir"
echo -e "n_threads\t$n_threads"
echo -e "outDir\t$outDir"

## Configuration

scriptDir=/home/user/data3/uplee/projects/spatialTransWeb/bin/temp/merged/01-process_sc-MIA
source /home/user/BGM/uplee/anaconda3/bin/activate spatialWeb
dataset=$( echo $dataset | sed 's@,@ @g' )
section=$( echo $section | sed 's@,@ @g' )

[ ! -d $outDir/log ] && mkdir -p $outDir/log

echo -e "*** Execution"

## Process scRNA-seq
echo -e "`date`\tProcessing scRNA-seq..."

mkdir -p $outDir/process_sc

time (python $scriptDir/process_sc.py \
 --count $count \
 --label $label \
 --key_celltype $key_celltype \
 --min_genes $min_genes \
 --max_mt_pct $max_mt_pct \
 --outDir $outDir/process_sc ) &>$outDir/log/process_sc.log

if [ ! $? -eq 0  ];then
    echo -e "`date`\tscRNA-seq preprocessing failed for some reason, please check log files!" >&2
    exit 1
else
    echo -e "`date`\tSuccessfully performed scRNA-seq preprocessing!"
fi

## Perform MIA
echo -e "`date`\tPerforming MIA..."

mkdir -p $outDir/MIA

time (python $scriptDir/MIA_align.py \
 --dataset $dataset \
 --section $section \
 --cluster_key $cluster_key \
 --st_dir $st_dir \
 --sc_path $outDir/process_sc/sc_markers.json \
 --n_threads $n_threads \
 --outDir $outDir/MIA) &>$outDir/log/MIA_align.log

 if [ ! $? -eq 0  ];then
    echo -e "`date`\tMIA failed for some reason, please check log files!" >&2
    exit 1
else
    echo -e "`date`\tSuccessfully performed MIA!"
fi

echo -e "`date`\tAll finished!"