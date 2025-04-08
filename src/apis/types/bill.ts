// 账单列表数据结构
export interface BillListData {
  list: BillList[];
  totalExpense: number;
  totalIncome: number;
  totalPage: number;
}

// 账单列表项数据结构
export interface BillList {
  bills?: BillItemData[];
  date?: string;
}

// 账单单项数据结构
export interface BillItemData {
  amount?: string;
  date?: string;
  id?: number;
  pay_type?: number;
  remark?: string;
  type_id?: number;
  type_name?: string;
}

// 新增账单请求参数数据结构
export interface AddBillParams {
  amount: string;
  date: string;
  pay_type: number;
  remark?: string;
  type_id: number;
  type_name: string;
}

// 获取账单详情数据结构
export interface BillDetailData {
  amount: string;
  date: string;
  id: number;
  pay_type: number;
  remark: string;
  type_id: number;
  type_name: string;
  user_id: number;
}

// 编辑账单请求参数数据结构
export interface EditBillParams {
  amount: string;
  date: string;
  id?: number;
  pay_type: number;
  remark?: string;
  type_id: number;
  type_name: string;
}

// 获取图表数据响应数据结构
export interface BillChartResponse {
  total_data: TotalDatum[];
  total_expense: string;
  total_income: string;
}

// 图表数据项数据结构
export interface TotalDatum {
  number: number;
  pay_type: number;
  type_id: number;
  type_name: string;
}
