const nodemailer = require('nodemailer'); //引入模块
let transporter = nodemailer.createTransport({
    //node_modules/nodemailer/lib/well-known/services.json 查看相关的配置，如果使用qq邮箱，就查看qq邮箱的相关配置
    service: '163', //类型qq邮箱
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'noreply_bgm@163.com', // 发送方的邮箱
        pass: 'IGMINQGJDGBEOUAH' // smtp 的授权码
    }});
//pass 不是邮箱账户的密码而是stmp的授权码（必须是相应邮箱的stmp授权码）
//邮箱---设置--账户--POP3/SMTP服务---开启---获取stmp授权码
function sendMail(mail, url, call) {

    // 发送的配置项
    let mailOptions = {
        from: 'noreply_bgm@163.com', // 发送方
        to: mail, //接收者邮箱，多个邮箱用逗号间隔
        subject: 'Spatial Trans Web: the Url of annotations result"', // 标题
        // text: 'Hello world?', // 文本内容
        html: '<p>The url of spatial annotations result: <a href="https://localhost:3000/annotations/results/'+url+
            '">https://localhost:3000/annotations/results/'+url+'</a></p>'+
            '<p>Spatially annotating will take a long time. For your data security, we will keep the raw data and result page for <b>a week</b>.</p>'+
            '<p>This is an automatically sent messages, please do not respond to this email adress, thank you!</p>'+
            '<small>Best wishes</br>'+
            'The BGM team</br>'+
            'Institute of Molecular Medicine</br>' +
            'College of Future Technology</br>' +
            'Peking University</br>' +
            'Beijing, P.R. China 100871</small>', //页面内容
        // attachments: [{//发送文件
        // filename: 'index.html', //文件名字
        // path: './index.html' //文件路径,
        // {
        // filename: 'sendEmail.js', //文件名字
        // content: 'sendEmail.js' //文件路径
        // }
        // ] };
        //发送函数
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            call(false)
            console.log(error.message);
            return
        } else {
            call(true) //因为是异步 所以需要回调函数通知成功结果
            console.log("Message sent successfully.",mail,url)
        }
    });
}
module.exports = {
    sendMail
}