import request from '@/js/ajax'

//获取播流地址
export function getPlayAuth(lessonId, roomName) {
    return request({
        url: 'http://www.rhyun.top:8080/video/getPlayAuth',
        method: 'get',
        params: {lessonId, roomName}

    })
}

//获取推流地址
export function getPushUrl(lessonId, roomName) {
    return request({
        url: 'http://www.rhyun.top:8080/video/getPushUrl',
        method: 'get',
        params: {lessonId, roomName}
    })
}

export function uploadImage(docToUpload, docToUploadFileName) {
    return request({
        url: 'http://www.rhyun.top:8080/video/uploadImage',
        method: 'get',
        params: {docToUpload, docToUploadFileName}
    })
}

