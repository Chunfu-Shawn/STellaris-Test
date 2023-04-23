import {annotationLogger} from "./logSave.js";

const threshold = 0.5;

// 发送到google服务器对token进行人机验证；
export const verifyRecaptcha = async (recaptchaToken) => {
    const url = `https://www.recaptcha.net/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${recaptchaToken}`;
    let valid = false;
    await fetch(url, {method: 'post'})
        .then((response) => response.json())
        .then((data)=> {
            valid = (data.success && data.score && data.action && data.score >= threshold);
            annotationLogger.log(`[${new Date().toLocaleString()}] reCAPTCHA: success-${data.success},score-${data.score},action-${data.action}`)
        }).catch((error) => {
            console.log(error);
        });
    return valid;
};