/**
 * 将字符串首字母大写，后续字母小写
 * @param str  {string}    需要修改的字符串
 * @return {string}    返回modified字符串
 */

export function firstUpperCase(str) {
    return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}

/**
 * 频率控制 返回函数连续调用时，action 执行频率限定为 次 / delay
 * @param delay  {number}    延迟时间，单位毫秒
 * @param action {function}  请求关联函数，实际应用需要调用的函数
 * @return {function}    返回客户调用函数
 */

export function throttle(delay, action){
    let last = 0;
    return function(){
        let curr = +new Date();
        if (curr - last > delay){
            action.apply(this, arguments)
            last = curr
        }else console.log("During the delay time!")
    }
}

/**
 * 返回函数连续调用时，停留时间大于或等于 idle，action 才会执行
 * @param idle   {number}    停留空闲时间，单位毫秒
 * @param action {function}  请求关联函数，实际应用需要调用的函数
 * @return {function}    返回客户调用函数
 */

export function debounce (idle, action){
    let last;
    return function(){
        let ctx = this,
            args = arguments;
        clearTimeout(last);
        last = setTimeout(function(){
            action.apply(ctx, args); // 延迟idle毫秒后 执行action
            }, idle);
    };
}

/**
 * 返回year-month-day格式的时间
 * @param date  {Date}  Date对象
 * @return {String}    返回格式化时间
 */

export function DateFomatter (date){
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}

/**
 * 将科学计数法记录的数字转变成非冗余正常数字
 * 参考：https://cloud.tencent.com/developer/article/1489054
 * @param num  {Number}  科学计数法记录的数值对象
 * @return {String}    数值对象
 */
export function toNonExponential(num) {
    let m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
    return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
}
/**
 * export table to csv or excel
 * @param data  {JSON}  js对象数据
 * @param fileName  {String}  文件名称
 * @return {null} 下载文件
 */
export function exportToCsv(data,fileName) {
    const replacer = (key, value) => (value === null ? "" : value);
    let dataDownload = data;
    const header = Object.keys(dataDownload[0]);
    let csv = dataDownload.map(row =>
        header
            .map(fieldName => JSON.stringify(row[fieldName], replacer))
            .join(",")
    );
    csv.unshift(header.join(","));
    csv = csv.join("\r\n");
    csv = "data:text/csv;charset=utf-8,\uFEFF" + csv;;
    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = `${fileName}.csv`;
    document.body.appendChild(link); // Required for FF
    link.click(); // This will download the data file named 'my_data.csv'.
    document.body.removeChild(link); // Required for FF
};

/**
 * calculate time consumed
 * @param nowtime  {Date}  当前时间
 * @param etime  {Date}  早期时间
 * @return {String} 消耗的小时、分钟、秒
 */
export function calTime(nowtime,etime){
    let usedTime = Date.parse(nowtime) - Date.parse(etime)
    // 计算相差小时数
    let hours=Math.floor(usedTime/(3600*1000))
    //计算相差分钟数
    let leave1=usedTime%(3600*1000);        //计算小时数后剩余的毫秒数
    let minutes=Math.floor(leave1/(60*1000));
    //计算相差秒数
    let leave2=leave1%(60*1000);      //计算分钟数后剩余的毫秒数
    let seconds=Math.round(leave2/1000);
    return hours + "h " + minutes + "m " + seconds + "s"
}