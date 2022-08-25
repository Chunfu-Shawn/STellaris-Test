import morgan from 'koa-morgan'
import rfs from "rotating-file-stream" // version 2.x

//add 0 before month
const pad = num => (num > 9 ? "" : "0") + num;
//generate the file path depended on date
const generator = () => {
    let time = new Date();
    let month = time.getFullYear() + "" + pad(time.getMonth() + 1);
    let day = pad(time.getDate());
    return time
    //return `${month}/${month}${day}-`;
};

const accessLogStream = rfs.createStream(generator()+'access.log', {
    interval: '5s', // rotate daily
    path: 'logs/access_or_post/'
})
const uploadLogStream = rfs.createStream(generator()+'post.log', {
    interval: '5s', // rotate daily
    path: 'logs/access_or_post/'
})


export const accessLogger = morgan('combined',{
    stream: accessLogStream,
    skip: function (ctx) { return ctx.url.search("/_next/static/")!==-1 }})

export const uploadLogger = morgan('combined', {
    stream: uploadLogStream,
    skip: function (ctx) { return ctx.method !== "POST"}})