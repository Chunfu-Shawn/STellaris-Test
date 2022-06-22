import fs from "fs"
// 导入router路由middleware

export function getHumanMap() {
    return fs.readFileSync('public/images/Veins_Medical_Diagram_clip_art.svg', 'utf8')
}