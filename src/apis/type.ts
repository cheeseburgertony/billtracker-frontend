import request from "@/services";
import type { LabelItem, LabelListResponse } from "./types";

// 获取标签列表
export const getTypeListAPI = () =>
  request.get<LabelItem, LabelListResponse>("/api/type/list");
