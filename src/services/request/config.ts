
const MODE = (import.meta as any).env.MODE as 'development' | 'production'; // 环境变量

export const BASE_URL = MODE === 'development' ? 'http://139.159.194.91:7001' : 'http://139.159.194.91:7001'
export const TIMEOUT = 10000
