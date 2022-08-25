import morgan from 'koa-morgan'
import rfs from "rotating-file-stream" // version 2.x

//add 0 before month
const pad = num => (num > 9 ? "" : "0") + num;
//generate the file path depended on date
const generator = (time) => {
    if (!time) return "access.log";
    let month = time.getFullYear() + "" + pad(time.getMonth() + 1);
    let day = pad(time.getDate());
    //let hour = pad(time.getHours());
    //let minute = pad(time.getMinutes());

    return `${month}/${month}${day}-access.log`;
};

const accessLogStream = rfs.createStream(generator, {
    interval: '1d', // rotate daily
    path: 'logs/access_or_post/'
})


export const accessLogger = morgan('combined',{
    stream: accessLogStream,
    skip: function (ctx) { return ctx.url.search("/_next/static/")!==-1 }})