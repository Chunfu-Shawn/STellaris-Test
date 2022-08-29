import mysql from "mysql";

const options = {
    host: 'localhost',//主机名
    user: 'readwrite',//用户
    password: 'mysql_update',//密码
    port: 3306,//端口号
    database: 'spatial_trans_web'//要操作的数据库
}

export function setJobStatus(rid,status) {
    let finishTime = new Date()
    let connection = mysql.createConnection(options)
    // 连接数据库
    connection.connect(() => {
        console.log('Connect database successfully')
    })
    // 使用 ? 做为查询参数占位符，在其内部自动调用 connection.escape() 方法对传入参数进行编码，防止sql注入
    let updateSql = `UPDATE users_annotation_records SET status=?, finish_time=? WHERE rid=?;`;
    // 根据rid查询任务状态
    connection.query(updateSql,[status,finishTime.toISOString(),rid],(err, result) => {
        if(err){
            console.log(err.message);
        }else {
            connection.end(()=>{
                console.log('Database connect closed')
            })
        }
    })
}