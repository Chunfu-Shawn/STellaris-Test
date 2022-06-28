import fs from "fs"

export function setReqStatus(rid,status) {
    let filesInfo = JSON.parse(fs.readFileSync('public/uploads/filesInfo.json', 'utf8'))
    for(let key in filesInfo){
        if(key === rid){
            filesInfo[key].status = status;
            filesInfo[key].finishtime = new Date().toISOString();
            break
        }
    }
    // 写入文件
    fs.writeFileSync("public/uploads/filesInfo.json",
        JSON.stringify(filesInfo),
        {flag: "w"},
    );
}