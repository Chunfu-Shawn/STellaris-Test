import morgan from 'koa-morgan'
import fs from "fs"

/*fs.mkdirSync('public/results/' + ctx.request.file.filename, {
    //是否使用递归创建目录
    recursive: true
})
 */

const accessLogStream = fs.createWriteStream('logs/'+ new Date().getFullYear() + (new Date().getMonth() + 1) + new Date().getDate()
    +'_access.log',
    { flags: 'a' })
const uploadLogStream = fs.createWriteStream('logs/'+ new Date().getFullYear() + (new Date().getMonth() + 1) + new Date().getDate()
    +'_post.log',
    { flags: 'a' })

export const accesslogger = morgan('combined',{
    stream: accessLogStream,
    skip: function (ctx) { return ctx.url.startsWith("/static/") }})

export const uploadlogger = morgan('combined', {
    stream: uploadLogStream,
    skip: function (ctx) { return ctx.method !== "POST"}})