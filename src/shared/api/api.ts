import axios from 'axios'
// import createAuthRefreshInterceptor from 'axios-auth-refresh'
// import { getCookie } from '../utils'

const API_BASE =
  process.env.NODE_ENV === 'development' ? `/api` : `${process.env.NEXT_PUBLIC_API_BASE}/v1`

export const API = axios.create({
  baseURL: `/api`,
  withCredentials: true
})

// createAuthRefreshInterceptor(API, () => API.post('/auth/refresh'), {
//   statusCodes: [401],
//   pauseInstanceWhileRefreshing: true,
//   shouldRefresh: () => Boolean(Number(getCookie('hasRefreshToken')))
// })
