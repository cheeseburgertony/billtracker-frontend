import request from "@/services";

// 用户注册
export const postUserRegisterAPI = (params) => request.post('/api/user/register', params)

// 用户登录
export const postUserLoginAPI = (params) => request.post('/api/user/login', params)

// 获取用户信息
export const getUserGetUserInfoAPI = () => request.get('/api/user/get_userinfo')
