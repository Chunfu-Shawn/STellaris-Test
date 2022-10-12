import mysql from 'mysql'
// 数据库的配置选项
const options = {
    host: 'localhost',//主机名
    user: 'readonly',//用户
    password: 'access',//密码
    port: 3306,//端口号
    database: 'spatial_trans_web'//要操作的数据库
}

export async function getDatasetsList(species){
    let connection = mysql.createConnection(options)
    // 连接数据库
    connection.connect()
    // 使用 ? 做为查询参数占位符，在其内部自动调用 connection.escape() 方法对传入参数进行编码，防止sql注入
    let selectSql = species === "all" ?
        `SELECT * FROM datasets_info` :
        `SELECT * FROM datasets_info WHERE species=?`

    //查询
    return new Promise((resolve, reject) => {
        connection.query(selectSql,[species],(err, result) => {
            if(err){
                console.log(err.message);
                reject(err);
            }
            resolve(JSON.parse(JSON.stringify(result)))
        })
        connection.end()
    })
}