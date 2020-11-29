import uuid = require('node-uuid')

/**
 * generator uuid
 */
export function getUuId(){
    return uuid.v4();
}