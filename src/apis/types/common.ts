export type ResType<T = any> = {
  code: number;
  message: string;
  data: T;
};
