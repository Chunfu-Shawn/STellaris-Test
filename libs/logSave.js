import morgan from 'koa-morgan'
import rfs from "rotating-file-stream"
import fs from "fs"; // version 2.x

//add 0 before month
export const pad = num => (num > 9 ? "" : "0") + num;

//generate the file path depended on date
const generator = (nowTime) => {
    if (!nowTime) return "access.log";
    let time = new Date(nowTime.getTime() - 1000*60*60*24);
    let yearMonth = time.getFullYear() + "" + pad(time.getMonth() + 1);
    let day = pad(time.getDate());

    return `${yearMonth}/${yearMonth}${day}-access.log`;
};

//generate the file path depended on date
const generator2 = (nowTime) => {
    if (!nowTime) return "mapping.log";
    let time = new Date(nowTime.getTime() - 1000*60*60*24);
    let yearMonth = time.getFullYear() + "" + pad(time.getMonth() + 1);
    let day = pad(time.getDate());

    return `${yearMonth}/${yearMonth}${day}.log`;
};

const accessLogStream = rfs.createStream(generator, {
    interval: '1d', // rotate daily
    path: 'logs/access_or_post/'
})

const annotationLogStream = rfs.createStream(generator2, {
    interval: '1d', // rotate daily
    path: 'logs/mapping_requests/'
})

// 实例1运行的rfs每天会对这个文件进行归档，其他实例把log写到mapping.log里面；
export const annotationLogger = process.env.ID === '1' ?
    new console.Console(annotationLogStream):
    new console.Console(fs.createWriteStream('logs/mapping_requests/mapping.log',{flags: 'a'}));

// 实例1运行的rfs每天会对这个文件进行归档，其他实例把log写到access.log里面；
export const accessLogger = morgan('combined',{
    stream: process.env.ID === '1' ? accessLogStream : fs.createWriteStream('logs/access_or_post/access.log',{flags: 'a'}),
    skip: function (ctx) {
        return ctx.url.search("/_next/")!==-1 ||
            ctx.url.search("/api/job-info")!==-1 ||
            ctx.url.search("/api/screening-log")!==-1 ||
            ctx.url.search("/api/queue")!==-1 ||
            ctx.url.search("/api/niche-anchor-log")!==-1 ||
            ctx.url.search("/api/server-time")!==-1 ||
            ctx.url.search("/images/")!==-1
    }})