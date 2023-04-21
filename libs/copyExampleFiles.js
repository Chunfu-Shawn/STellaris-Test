import fs from "fs";
import {annotationLogger} from "./logSave.js";

export default function copyExampleFiles(rid, matrixFilePath, resultPath){
    try{
        // exampleFilesPath end with "/"
        // 最后一个分隔符位置
        let lastIndex = matrixFilePath.lastIndexOf("/");
        // 倒数第二个分隔符位置
        let secondLastIndex = matrixFilePath.lastIndexOf("/", lastIndex - 1);
        let exampleFilesPath = matrixFilePath.substring(0, secondLastIndex + 1)
        // resultPath end without "/"
        // copy example files
        fs.symlinkSync(exampleFilesPath+"sc.h5ad",resultPath+"/sc.h5ad")
        fs.symlinkSync(exampleFilesPath+"sc_counts.txt",resultPath+"/sc_counts.txt")
        fs.symlinkSync(exampleFilesPath+"sc_labels.txt",resultPath+"/sc_labels.txt")
        fs.copyFileSync(exampleFilesPath+"sc_markers.json",resultPath+"/out/json/sc_markers.json")
        fs.copyFileSync(exampleFilesPath+"meta_info.preprocessing.json",resultPath+"/out/json/meta_info.preprocessing.json")
        fs.copyFileSync(exampleFilesPath+"filter_summary.preprocessing.json",resultPath+"/out/json/filter_summary.preprocessing.json")
    }catch (e){
        annotationLogger.log(`${rid} [${new Date().toLocaleString()}] Error: Copy example files failed: ${e}`)
    }
}