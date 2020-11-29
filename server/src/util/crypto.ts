import crypto = require('crypto')

/**
 * salt key
 */

let saltKey = "dayDayUP"

/**
 * use md5
 * encrypt password with salt.
 * @param password 
 * @param salt 
 */
let md5Algorithm = (password: string, salt: string) => {
    // MD5 value of salt cipher
    let md5 = crypto.createHash('md5');
    return md5.update(password + "*" + salt).digest("hex");
}

/**
 * exprot doule md5 encryption
 * @param password 
 */
export function cryptoPassword(password: string) {
    let pwd = md5Algorithm(password, saltKey);
    let md5 = crypto.createHash('md5');
    return md5.update(pwd).digest("hex");
}