// 获取标签类型列表响应值
export interface LabelListResponse {
  code: number;
  list: LabelItem[];
  msg: string;
}

// 标签类型列表
export interface LabelItem {
  id: number | "all";
  name: string;
  type: number;
  user_id: number;
}
