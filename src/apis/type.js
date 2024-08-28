import request from "@/services";

// 获取标签列表
export const getTypeListAPI = () => request.get('/api/type/list')
