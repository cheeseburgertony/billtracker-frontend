import request from "@/services";

// 获取账单列表
export const getBillListAPI = (date, page = 1, type_id = 'all') =>
  request.get(`/api/bill/list?date=${date}&page=${page}&type_id=${type_id}`)
