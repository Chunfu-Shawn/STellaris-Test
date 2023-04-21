import readLine from "readline";
import fs from "fs";

export default function getFile(resultPath,filePath){
    return new Promise(async (resolve, reject) => {
        try {
            const fReadName = resultPath + filePath
            let dataArr = [];
            let readObj = readLine.createInterface({
                input: fs.createReadStream(fReadName)
            });

            readObj.on('line', function (line) {
                dataArr.push(line);
            });
            readObj.on('close', function () {
                resolve(dataArr)
            })
        } catch (err) {
            reject(err)
        }
    })
}