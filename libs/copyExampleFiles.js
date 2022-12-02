import fs from "fs";
import {annotationLogger} from "./logSave.js";

export default function copyExampleFiles(matrixFilePath,resultPath){
    try{
        // exampleFilesPath end with "/"
        let exampleFilesPath = matrixFilePath.substring(0, matrixFilePath.lastIndexOf('/') + 1)
        // resultPath end without "/"
        // copy example files
        fs.copyFileSync(exampleFilesPath+"sc.h5ad",resultPath)
        fs.copyFileSync(exampleFilesPath+"sc_markers.json",resultPath+"/out/json/")
        fs.copyFileSync(exampleFilesPath+"meta_info.preprocessing.json",resultPath+"/out/json/")
        fs.copyFileSync(exampleFilesPath+"filter_summary.preprocessing.json",resultPath+"/out/json/")
    }catch (e){
        annotationLogger.log(`[${new Date().toLocaleString()}] Error: Copy example files failed: ${e}`)
    }
}