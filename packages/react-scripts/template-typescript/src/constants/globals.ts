export const isProd = process.env.NODE_ENV === 'production'
export const isDev = process.env.NODE_ENV === 'development'

export const BASE_URL = isProd ? 'https://schedule.meshkit.cn' : isDev ? 'http://47.98.249.12/' : 'http://test.schedule.meshkit.cn/'

export const MESH_SERVER_URL = isProd ? 'https://meshkit.cn' : 'http://test.meshtech.co'
