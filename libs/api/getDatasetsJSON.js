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
    let all = parseSheetData(XLSX, 0)
    const human_ngs = parseSheetData(XLSX, 0)
    const mouse_ngs = parseSheetData(XLSX, 1)
    const mouse_smfish = parseSheetData(XLSX, 2)
    all.push.apply(all,mouse_ngs)
    all.push.apply(all,mouse_smfish)
    if (i === undefined){
        return {}
    }else if (i === "all") {
        return all
    }else if (i === "human_ngs") {
        return human_ngs
    }else if (i === "mouse_ngs") {
        return mouse_ngs
    }else if (i === "mouse_smfish") {
        return mouse_smfish
    }else {
        let resData = {}
        all.forEach((item)=> {
            if (item.ID === i)
                resData = item
        })
        let key = 1
        fs.writeFileSync("public/files/data_downloaded.txt",
            JSON.stringify(all.map(item => {
                return {
                    key: key++,
                    st_id: item.ID,
                    date_published: item.Date_published,
                    method: item.Method,
                    species: item.Species,
                    strain: item.Strain,
                    developmental_stage: item.Develomental_stage,
                    organ: item.Organ,
                    tissue: item.Tissue,
                    pathological: item.Pathological,
                }
            })),
            {flag: "w"})
        key = 1
        mouse_ngs.push.apply(mouse_ngs,mouse_smfish)
        fs.writeFileSync("public/files/data_downloaded_mouse.txt",
            JSON.stringify(mouse_ngs.map(item => {
                return {
                    key: key++,
                    st_id: item.ID,
                    date_published: item.Date_published,
                    method: item.Method,
                    species: item.Species,
                    strain: item.Strain,
                    developmental_stage: item.Develomental_stage,
                    organ: item.Organ,
                    tissue: item.Tissue,
                    pathological: item.Pathological,
                }
            })),
            {flag: "w"})
        key = 1
        fs.writeFileSync("public/files/data_downloaded_human.txt",
            JSON.stringify(human_ngs.map(item => {
                return {
                    key: key++,
                    st_id: item.ID,
                    date_published: item.Date_published,
                    method: item.Method,
                    species: item.Species,
                    strain: item.Strain,
                    developmental_stage: item.Develomental_stage,
                    organ: item.Organ,
                    tissue: item.Tissue,
                    pathological: item.Pathological,
                }
            })),
            {flag: "w"})
        return resData
    }
}