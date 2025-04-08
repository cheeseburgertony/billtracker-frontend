/**
 * 下拉刷新状态
 */
export const REFRESH_STATE = {
  /** 普通 */
  normal: 0,
  /** 释放刷新（不满足刷新条件） */
  pull: 1,
  /** 释放立即刷新（满足刷新条件） */
  drop: 2,
  /** 加载中 */
  loading: 3,
  /** 加载成功 */
  success: 4,
  /** 加载失败 */
  failure: 5,
};

/**
 * 上拉加载状态
 */
export const LOAD_STATE = {
  /** 普通 */
  normal: 0,
  /** 中止 */
  abort: 1,
  /** 加载中 */
  loading: 2,
  /** 加载成功 */
  success: 3,
  /** 加载失败 */
  failure: 4,
  /** 加载完成（无新数据） */
  complete: 5,
};
