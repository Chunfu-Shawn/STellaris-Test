import mysql from "mysql";

const options = {
    host: 'localhost',//主机名
    user: 'readonly',//用户
    password: 'access',//密码
    port: 3306,//端口号
    database: 'spatial_trans_web'//要操作的数据库
}

export async function getJobInfo(rid) {
    return new Promise(async (resolve, reject) => {
        let connection = mysql.createConnection(options)
        // 连接数据库
        connection.connect()
        // 使用 ? 做为查询参数占位符，在其内部自动调用 connection.escape() 方法对传入参数进行编码，防止sql注入
        let selectSql = `SELECT * FROM users_annotation_records WHERE rid=?`
        // 根据rid查询任务状态
        connection.query(selectSql, [rid], (err, result) => {
            if (err) {
                console.log(err.message);
                reject(err);
            }
            resolve({...JSON.parse(JSON.stringify(result))[0]})
        })
        connection.end()
    })
}