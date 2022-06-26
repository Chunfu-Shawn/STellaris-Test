import fs from "fs"
// 导入router路由middleware

export function getMouseMap() {
    return fs.readFileSync('frontend/static/images/mouse-color.svg', 'utf8')
}