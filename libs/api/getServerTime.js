export function getServerTime(){
    const time = new Date().toUTCString()
    return new Promise((resolve, reject) => {
        resolve({serverTime:time})
    })
}