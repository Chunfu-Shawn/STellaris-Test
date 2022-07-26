import { readFile, set_fs, utils } from "xlsx/xlsx.mjs";
set_fs(fs);
import * as fs from "fs";
/* load 'fs' for readFile and writeFile support */

let XLSX = readFile('public/files/data_downloaded.xlsx',
    {
        type: 'binary',
        cellDates: true,       //new Date()格式-->Tue May 18 2021 14:16:52 GMT+0800 (中国标准时间)
        cellText: false       //不生成w
    }
    );

// workbook是这个包读取xlsx文件后的数据，i是sheet页数
const parseSheetData = (workbook,i) => {
    if (workbook && workbook.SheetNames && workbook.SheetNames.length) {
        return utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[i]], {
            blankRows: false, // 跳过空白行
            defval: 'null',  //单元格为空时的默认值
            raw: false,
            dateNF: 'yyyy-mm-dd'
        })
    }
    return []
}

export default function getDatesetsJSON(i){
    if(i!==undefined){
        return parseSheetData(XLSX,i)
    }else {
        let key = 1
        const all = parseSheetData(XLSX, 0)
        all.push.apply(all,parseSheetData(XLSX, 1))
        all.push.apply(all,parseSheetData(XLSX, 2))
        fs.writeFileSync("public/files/data_downloaded.txt",
            JSON.stringify(all.map(item => {
                return {
                    key: key++,
                    st_id: item.id,
                    date_published: item.date_published,
                    method: item.method,
                    species: item.species,
                    strain: item.strain,
                    developmental_stage: item.developmental_stage,
                    organ: item.organ,
                    tissue: item.tissue,
                    pathological: item.pathological,
                }
            })),
            {flag: "w"})
        return all
    }
}