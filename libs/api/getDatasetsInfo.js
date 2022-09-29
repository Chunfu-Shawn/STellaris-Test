import { readFile, set_fs, utils } from "xlsx/xlsx.mjs";
set_fs(fs);
import * as fs from "fs";
/* load 'fs' for readFile and writeFile support */
import mysql from 'mysql'
// 数据库的配置选项
const options = {
    host: 'localhost',//主机名
    user: 'readonly',//用户
    password: 'access',//密码
    port: 3306,//端口号
    database: 'spatial_trans_web'//要操作的数据库
}

export async function getDatasetsInfo(st_id){
    let connection = mysql.createConnection(options)
    // 连接数据库
    connection.connect()
    // 使用 ? 做为查询参数占位符，在其内部自动调用 connection.escape() 方法对传入参数进行编码，防止sql注入
    let selectSql = st_id==="all" ?
        `SELECT * FROM datasets_info` :
        `SELECT * FROM datasets_info WHERE id=?`

    //查询
    return new Promise((resolve, reject) => {
        connection.query(selectSql,[st_id],(err, result) => {
            if(err){
                console.log(err.message);
                reject(err);
            }
            resolve(JSON.parse(JSON.stringify(result)))
            connection.end()
        })
    })

    /*
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
    }else if (i === "human-ngs") {
        return human_ngs
    }else if (i === "mouse-ngs") {
        return mouse_ngs
    }else if (i === "mouse-smfish") {
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
     */
}

/*
let XLSX = readFile('public/files/data_downloaded.xlsx',
    {
        type: 'binary',
        cellDates: true,       //new Date()格式-->Tue May 18 2021 14:16:52 GMT+0800 (中国标准时间)
        cellText: false       //不生成w
    });

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
 */