import fs from "fs"

export function setJobStatus(rid,status) {
    let filesInfo = JSON.parse(fs.readFileSync('public/files/filesInfo.json', 'utf8'))
    for(let key in filesInfo){
        if(key === rid){
            filesInfo[key].status = status;
            filesInfo[key].finishtime = new Date().toISOString();
            break
        }
    }
    // 写入文件
    fs.writeFileSync("public/files/filesInfo.json",
        JSON.stringify(filesInfo),
        {flag: "w"},
    );
}