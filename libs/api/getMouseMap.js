import fs from "fs"
// 导入router路由middleware

export function getMouseMap() {
    return fs.readFileSync('static/images/mouse-color.svg', 'utf8')
}