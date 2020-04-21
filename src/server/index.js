import request from './config';

const userLogin = (param, success) => {
    request(`user/login/${param}`,{}, 'POST', success);
}

const userRegister = (param, success) => {
    request(`user/register`,param, 'POST', success, 'application/x-www-form-urlencoded');
}

const getDeptList = (param, success) => {
    request(`dept/findList`,param, 'POST', success);
}

const deletUser = (param, success) => {
    request(`/user/delete/${param}`,{}, 'POST', success);
}

export {
    userLogin,
    userRegister,
    getDeptList,
    deletUser
}