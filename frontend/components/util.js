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