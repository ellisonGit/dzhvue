import request from '@/js/ajax'

//我的课程
export function MyCourse(userId) {
    return request({
        url: 'http://www.rhyun.top:8080/person/myCourse',
        method: 'get',
        params: {userId}

    })
}
//我的班级
export function MyClass(userId) {
    return request({
        url: 'http://www.rhyun.top:8080/person/myClass',
        method: 'get',
        params: {userId}

    })
}
//我的班级课程
export function myClassCourse(userId) {
    return request({
        url: 'http://www.rhyun.top:8080/person/myClassCourse',
        method: 'get',
        params: {userId}

    })
}


//我的学习记录
export function MyLearningRecord(userId) {
    return request({
        url: 'http://www.rhyun.top:8080/person/myLearningRecord',
        method: 'get',
        params: {userId}

    })
}

//不同学习状态下的课程
export function getCourseStatus(userId) {
    return request({
        url: 'http://www.rhyun.top:8080/person/getCourseStatus',
        method: 'get',
        params: {userId}

    })
}

//我的订单
export function MyOrder(userId) {
    return request({
        url: 'http://www.rhyun.top:8080/person/myOrder',
        method: 'get',
        params: {userId}

    })
}
//我的收藏
export function MyCollect(userId,keywords) {
    return request({
        url: 'http://www.rhyun.top:8080/person/myCollect',
        method: 'get',
        params: {userId,keywords}

    })
}

//我的资料
export function MyMaterial(userId) {
    return request({
        url: 'http://www.rhyun.top:8080/person/myMaterial',
        method: 'get',
        params: {userId}

    })
}

//我的优惠卷
export function myCoupon(userId,tenantId) {
    return request({
        url: 'http://www.rhyun.top:8080/person/myCoupon',
        method: 'get',
        params: {userId,tenantId}

    })
}
//我的学习卡
export function myCard(userId,tenantId) {
    return request({
        url: 'http://www.rhyun.top:8080/person/myCard',
        method: 'get',
        params: {userId,tenantId}

    })
}


//我的学习卡
export function myOrderDeatil(id) {
    return request({
        url: 'http://www.rhyun.top:8080/person/myOrderDeatil',
        method: 'get',
        params: {id}

    })
}

//确认是否已购买课程，加入学习
export function confirmCourse(userId,courseId) {
    return request({
        url: 'http://www.rhyun.top:8080/person/confirmCourse',
        method: 'get',
        params: {userId,courseId}

    })
}


//我的直播课程
export function MyLiveCourse(userId) {
    return request({
        url: 'http://www.rhyun.top:8080/study/myStudyLive',
        method: 'get',
        params: {userId}

    })

}

//加入学习
export function addStudy(courseId,userId,tenantId) {
    return request({
        url: 'http://www.rhyun.top:8080/course/addStudy',
        method: 'get',
        params: {courseId,userId,tenantId}

    })
}

//课程资料
export function courseMaterials(courseId) {
    return request({
        url: 'http://www.rhyun.top:8080/course/courseMaterials',
        method: 'get',
        params: {courseId}

    })
}
//课程学员
export function courseMembers(courseId) {
    return request({
        url: 'http://www.rhyun.top:8080/course/courseMembers',
        method: 'get',
        params: {courseId}

    })
}




//我的笔记
export function MyStudyNote(userId) {
    return request({
        url: 'http://www.rhyun.top:8080/study/myStudyNote',
        method: 'get',
        params: {userId}

    })
}


//我的笔记
export function addLessonLearn(userId, lessonId, courseId,tenantId) {
    return request({
        url: 'http://www.rhyun.top:8080/study/addLessonLearn',
        method: 'get',
        params: {userId,lessonId, courseId,tenantId}

    })
}










