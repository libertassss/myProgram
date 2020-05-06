import request from './config';

const userLogin = (param, success) => {
    request(`user/login/${param}`,{}, 'POST', success);
}

const userRegister = (param, success) => {
    request(`user/register`,param, 'POST', success, {"content-type":'application/x-www-form-urlencoded'});
}

const getDeptList = (param, success) => {
    request(`dept/findList`,param, 'POST', success);
}

const deletUser = (param, success) => {
    request(`user/delete/${param}`,{}, 'POST', success);
}

const findPageBean = (param, success) => {
    request(`course/findPageBean`, {}, 'POST', success);
}

const getHomeWork = ( headers, success ) => {
    request (`homeWork/findList`, {}, 'POST', success, headers);
}

const addHomeWork = ( params, success ) => {
    request(`homeWork/saveOrUpdate`, params, 'POST', success);
}

const getCourse = (headers,success) => {
    request(`course/findList`, {}, 'POST', success, headers);
}

const upLoadCourse = ( params, headers, success ) => {
    request(`course/save/upload`,params, 'POST', success, headers)
}

const saveOrUpdateHomeWork = (param, headers, success) => {
    console.log(headers);
    request(`homeWork/saveOrUpdate`, param, 'POST', success, headers);
}

const getHomeWorkList = (param, headers, success) => {
    request(`homeWork/findList`, param, 'POST', success, headers);
}

export {
    userLogin,
    userRegister,
    getDeptList,
    deletUser,
    findPageBean,
    getHomeWork,
    addHomeWork,
    getCourse,
    upLoadCourse,
    saveOrUpdateHomeWork,
    getHomeWorkList
}