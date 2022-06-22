import morgan from 'koa-morgan'
import fs from "fs"

const accessLogStream = fs.createWriteStream('logs/access.log',
    { flags: 'a' })
const uploadLogStream = fs.createWriteStream('logs/post.log',
    { flags: 'a' })

export const accesslogger = morgan('combined',{
    stream: accessLogStream,
    skip: function (ctx) { return ctx.url.startsWith("/static/") }})

export const uploadlogger = morgan('combined', {
    stream: uploadLogStream,
    skip: function (ctx) { return ctx.method !== "POST"}})