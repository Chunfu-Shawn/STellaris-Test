import morgan from 'koa-morgan'
import rfs from "rotating-file-stream" // version 2.x

//add 0 before month
const pad = num => (num > 9 ? "" : "0") + num;
//generate the file path depended on date
const generator = (time) => {
    if (!time) return "access.log";
    let month = time.getFullYear() + "" + pad(time.getMonth() + 1);
    let day = pad(time.getDate());

    return `${month}/${month}${day}-access.log`;
};
//generate the file path depended on date
const generator2 = (time) => {
    if (!time) return "annotation.log";
    let month = time.getFullYear() + "" + pad(time.getMonth() + 1);
    let day = pad(time.getDate());

    return `${month}/${month}${day}.log`;
};

const accessLogStream = rfs.createStream(generator, {
    interval: '1d', // rotate daily
    path: 'logs/access_or_post/'
})

const annotationLogStream = rfs.createStream(generator2, {
    interval: '1d', // rotate daily
    path: 'logs/annotation_requests/'
})
// 创建注释功能的logger
export const annotationLogger = new console.Console(annotationLogStream);

export const accessLogger = morgan('combined',{
    stream: accessLogStream,
    skip: function (ctx) { return ctx.url.search("/_next/static/")!==-1 }})