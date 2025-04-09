// 用户注册接口参数类型
export interface RegisterOrLoginRequest {
  password: string;
  username: string;
}

// 获取用户信息接口返回类型
export interface UserInfoResponse {
  avatar: string;
  id: number;
  signature: string;
  username: string;
}

// 修改用户信息接口参数类型
export interface EditUserInfoRequest {
  avatar?: string;
  signature?: string;
}

// 修改用户密码接口参数类型
export interface ModifyPassRequest {
  new_pass: string;
  new_pass2: string;
  old_pass: string;
}
