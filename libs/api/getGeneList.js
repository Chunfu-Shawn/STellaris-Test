import mysql from 'mysql'
// 数据库的配置选项
const options = {
    host: 'localhost',//主机名
    user: 'root',//用户
    password: 'mysql13975431861',//密码
    port: 3306,//端口号
    database: 'spatial_trans_web'//要操作的数据库
}

const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
};

export async function getGeneList(species,idType,geneName){
    let connection = mysql.createConnection(options)
    // 连接数据库
    connection.connect(() => {
        console.log('Connect database successfully')
    })
    let selectSql = ''
    let geneIdType = ''
    // 判断基因名类型
    if (idType === "HGNC") geneIdType = 'gene_name'
    else if (idType === "Ensembl") geneIdType = 'gene_id'
    else geneIdType = 'gene_entrez_id'
    // 判断物种
    // 使用 ? 做为查询参数占位符，在其内部自动调用 connection.escape() 方法对传入参数进行编码，防止sql注入
    if(species === "All") selectSql = `SELECT * FROM gene_list WHERE ${geneIdType} like ?`
    else if(species === "Human") selectSql = `SELECT * FROM gene_list WHERE ${geneIdType} like ? AND species = 'Homo_sapiens'`;
    else selectSql = `SELECT * FROM gene_list WHERE ${geneIdType} like ? AND species = 'Mus_musculus'`;
    //查询 相似LIKE
    return new Promise((resolve, reject) => {
        connection.query(selectSql,[`%${geneName}%`],(err, result) => {
            if(err){
                console.log(err.message);
                reject(err);
            }
            resolve(JSON.parse(JSON.stringify(result)))
        })
    })
}