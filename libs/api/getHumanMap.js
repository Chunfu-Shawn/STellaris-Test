import fs from "fs"
// 导入router路由middleware

export function getHumanMap() {
    return fs.readFileSync('static/images/Veins_Medical_Diagram_clip_art.svg', 'utf8')
}