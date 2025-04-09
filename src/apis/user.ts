import request from "@/services";
import type {
  EditUserInfoRequest,
  ModifyPassRequest,
  RegisterOrLoginRequest,
  ResType,
  UserInfoResponse,
} from "./types";

// 用户注册
export const postUserRegisterAPI = (params: RegisterOrLoginRequest) =>
  request.post<null, ResType<null>>("/api/user/register", params);

// 用户登录
export const postUserLoginAPI = (params: RegisterOrLoginRequest) =>
  request.post<null, ResType<{ token: string }>>("/api/user/login", params);

// 获取用户信息
export const getUserGetUserInfoAPI = () =>
  request.get<UserInfoResponse, ResType<UserInfoResponse>>(
    "/api/user/get_userinfo"
  );

// 上传用户头像
// 通过axios设置  'Content-Type': 'multipart/form-data', 进行文件上传
export const postUploadAPI = (formData: FormData) =>
  request<string, ResType<string>>({
    method: "POST",
    url: "/api/upload",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// 修改用户信息
export const postUserEditUserInfoAPI = (params: EditUserInfoRequest) =>
  request.post<UserInfoResponse, ResType<UserInfoResponse>>(
    "/api/user/edit_userinfo",
    params
  );

// 修改用户密码
export const postUserModifyPassAPI = (params: ModifyPassRequest) =>
  request.post<null, ResType<null>>("/api/user/modify_pass", params);
