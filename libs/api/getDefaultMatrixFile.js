import fs from "fs"
// 导入router路由middleware

export function getDefaultMatrixFile() {
    return fs.readFileSync('./public/files/matrix.mtx.gz', 'utf8')
}