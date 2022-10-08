import mysql from 'mysql'
// 数据库的配置选项
const options = {
    host: 'localhost',//主机名
    user: 'readonly',//用户
    password: 'access',//密码
    port: 3306,//端口号
    database: 'spatial_trans_web'//要操作的数据库
}

export async function getSpatiallyVariableGenes(geneOrDuplicate,param) {
    let connection = mysql.createConnection(options)
    // 连接数据库
    connection.connect()
    // 使用 ? 做为查询参数占位符，在其内部自动调用 connection.escape() 方法对传入参数进行编码，防止sql注入
    let selectSql
    // 加上BINARY区分大小写
    if(geneOrDuplicate === "gene") selectSql = `SELECT * FROM spatially_variable_genes WHERE BINARY gene_symbol=?`
    else if( geneOrDuplicate === "duplicate" ) selectSql = `SELECT * FROM spatially_variable_genes WHERE duplicate_id=?`

    //查询
    return new Promise((resolve, reject) => {
        connection.query(selectSql, [param], (err, result) => {
            if (err) {
                console.log(err.message);
                reject(err);
            }
            resolve(JSON.parse(JSON.stringify(result)))
            connection.end()
        })
    })
}