import fs from "fs"

export function getJobStatus(rid) {
    let filesInfo = JSON.parse(fs.readFileSync('public/files/filesInfo.json', 'utf8'))
    let ReqStatus = {};
    for(let key in filesInfo){
        if(key === rid){
            ReqStatus.rid =  key
            ReqStatus.title = filesInfo[key].title
            ReqStatus.email = filesInfo[key].email
            ReqStatus.organ = filesInfo[key].organ
            ReqStatus.tissue = filesInfo[key].tissue
            ReqStatus.matrixfilepath = filesInfo[key].matrixfilepath
            ReqStatus.barcodesfilepath = filesInfo[key].barcodesfilepath
            ReqStatus.featuresfilepath = filesInfo[key].featuresfilepath
            ReqStatus.resultpath = filesInfo[key].resultpath
            ReqStatus.uploadtime = filesInfo[key].uploadtime
            ReqStatus.finishtime = filesInfo[key].finishtime
            ReqStatus.status = filesInfo[key].status
            return ReqStatus
        }
    }
    return {}
}