import {poolReadWrite} from "./createMysqlPool.js";


export function updateJob2Finished(rid) {
    return new Promise( (resolve, reject)=>{
        // 使用 ? 做为查询参数占位符，在其内部自动调用 connection.escape() 方法对传入参数进行编码，防止sql注入
        let updateSql = `UPDATE job_mapping_queue SET status = 'finished', version = version + 1 
                        WHERE version = "1" AND rid = ?`;
        // 连接mysql连接池
        poolReadWrite.getConnection((err, connection)=>{
            if(err){
                reject(err)
            }
            connection.query(updateSql, [rid], (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            });
            connection.release();
        });
    })
}
