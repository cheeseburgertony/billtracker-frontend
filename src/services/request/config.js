
const MODE = import.meta.env.MODE // 环境变量

export const BASE_URL = MODE === 'development' ? 'http://139.159.194.91:7001' : 'http://139.159.194.91:7001'
export const TIMEOUT = 10000
