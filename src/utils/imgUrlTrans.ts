import { BASE_URL } from "@/services/request/config";

const MODE = (import.meta as any).env.MODE as "development" | "production";

export const imgUrlTrans = (url: string) => {
  if (url && url.startsWith("http")) {
    return url;
  } else {
    url = `${
      MODE === "development" ? "http://127.0.0.1:7001" : BASE_URL
    }${url}`;
    return url;
  }
};
