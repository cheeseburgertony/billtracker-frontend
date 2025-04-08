import request from "@/services";
import type {
  AddBillParams,
  BillChartResponse,
  BillDetailData,
  BillListData,
  EditBillParams,
  ResType,
} from "./types";

// 获取账单列表
export const getBillListAPI = (
  date: string,
  page: number = 1,
  type_id: string | number = "all"
) =>
  request.get<BillListData, ResType<BillListData>>(
    `/api/bill/list?date=${date}&page=${page}&type_id=${type_id}`
  );

// 新增账单
export const postBillAddAPI = (params: AddBillParams) =>
  request.post<null, ResType>("/api/bill/add", params);

// 获取账单详情
export const getBillDetailAPI = (id: number) =>
  request.get<BillDetailData, ResType<BillDetailData>>(
    `/api/bill/detail?id=${id}`
  );

// 删除订单
export const postBillDeleteAPI = (id: number) =>
  request.post<null, ResType<null>>("/api/bill/delete", { id });

// 修改账单
export const postBillUpdateAPI = (params: EditBillParams) =>
  request.post<null, ResType<null>>("/api/bill/update", params);

// 获取图表数据（按消费类型整理后的数据）
export const getBillDataAPI = (date: string) =>
  request.get<BillChartResponse, ResType<BillChartResponse>>(
    `/api/bill/data?date=${date}`
  );
