import request from "@/services";

// 获取账单列表
export const getBillListAPI = (date, page = 1, type_id = 'all') =>
  request.get(`/api/bill/list?date=${date}&page=${page}&type_id=${type_id}`)

// 新增账单
export const postBillAddAPI = (params) => request.post('/api/bill/add', params)

// 获取账单详情
export const getBillDetailAPI = (id) => request.get(`/api/bill/detail?id=${id}`)

// 删除订单
export const postBillDeleteAPI = (id) => request.post('/api/bill/delete', { id })

// 修改账单
export const postBillUpdateAPI = (params) => request.post('/api/bill/update', params)

// 获取图表数据（按消费类型整理后的数据
export const getBillDataAPI = (date) => request.get(`/api/bill/data?date=${date}`)
