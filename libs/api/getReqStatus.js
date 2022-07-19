import fs from "fs"

export function getReqStatus(rid) {
    let filesInfo = JSON.parse(fs.readFileSync('public/uploads/filesInfo.json', 'utf8'))
    let ReqStatus = {};
    for(let key in filesInfo){
        if(key === rid){
            ReqStatus.rid =  key
            ReqStatus.uploadtime = filesInfo[key].uploadtime
            ReqStatus.finishtime = filesInfo[key].finishtime
            ReqStatus.title = filesInfo[key].title
            ReqStatus.email = filesInfo[key].email
            ReqStatus.status = filesInfo[key].status
            return ReqStatus
        }
    }
    return {}
}