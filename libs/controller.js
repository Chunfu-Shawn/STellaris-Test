const fs = require('fs');
const {uploadFile,uploadRecord} = require("./uploadFile")

// add url-route in /routes:

function addMapping(router,mapping){
    for(let url in mapping){
        if(url.startsWith('GET')){
            //如果url类似”GET xxx“
            let path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        }else if(url.startsWith('POST')){
            //如果url类似”POST xxx"
            let path = url.substring(5);
            // 如果url为上传文件”POST /upload"
            //if (path === '/annotations/upload') router.post(path, upload.single('matrix'),mapping[url]);
            //else
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        }else if (url.startsWith('PUT ')) {
            let path = url.substring(4);
            router.put(path, mapping[url]);
            console.log(`register URL mapping: PUT ${path}`);
        } else if (url.startsWith('DELETE ')) {
            let path = url.substring(7);
            router.del(path, mapping[url]);
            console.log(`register URL mapping: DELETE ${path}`);
        }
        else {
            // 无效的URL:
            console.log(`invalid URL: ${url}`);
        }
    }
};

function addController(router, dir){
    // 先导入fs模块，然后用readdirSync列出文件
    // 这里可以用sync是因为启动时值运行一次，不存在性能问题
    let files = fs.readdirSync(__dirname + '/' + dir)
    //过滤出js文件
    let js_files = files.filter((f)=>{
        return f.endsWith('.js');
    })
    for(let f of js_files){
        console.log(`process controller: ${f}...`)
        //导入js文件
        let mapping = require(__dirname+'/routes/' + f);
        addMapping(router,mapping);
    };
};

module.exports = function() {
    let 
        controller_dir = dir || 'routes', // 如果不传参数，扫描目录默认为'routes'
        router = require('koa-router')(); // the return of require('koa-router') is a function
    addController(router,controller_dir);
    router.post("/wait-page", uploadRecord);
    return router.routes();
};