import axios from 'axios'
import { getCookie } from 'cookies-next'

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
  withCredentials: true
})

API.interceptors.request.use(
  async (config) => {
    const token = getCookie('AccessToken')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  async (error) => {
    return Promise.reject(error)
  }
)
