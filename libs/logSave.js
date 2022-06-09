const morgan = require('koa-morgan')
const fs = require("fs");

const accessLogStream = fs.createWriteStream(__dirname + '/../logs/access.log',
    { flags: 'a' })
const uploadLogStream = fs.createWriteStream(__dirname + '/../logs/post.log',
    { flags: 'a' })

module.exports.accesslogger = morgan('combined',{
    stream: accessLogStream,
    skip: function (ctx) { return ctx.url.startsWith("/static/") }})

module.exports.uploadlogger = morgan('combined', {
    stream: uploadLogStream,
    skip: function (ctx) { return ctx.method !== "POST"}})