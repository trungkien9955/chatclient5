import axios from 'axios';
import { updateAccessToken } from '../features/authSlice';
import { baseUrl } from './services';

let store

export const injectStore = _store => {
  store = _store
}
// const accessToken = store.getState().auth.accessToken
const CustomAxios = axios.create({
    withCredentials: true,
    baseURL: baseUrl,
    headers: {'Content-Type': 'application/json',
}
})
CustomAxios.interceptors.request.use(function (config) {
  config.headers.authorization = `Bearer ${store.getState().auth.accessToken}`
  return config;
}, function (error) {
  return Promise.reject(error);
});
let refresh = false
CustomAxios.interceptors.response.use(resp =>resp, async error =>{
    if(error.response.status === 403 || error.response.status === 401 && !refresh){
        refresh  = true
        const response = await CustomAxios.post("/users/refresh", {refreshToken: `${store.getState().auth.refreshToken}`})
        if(response.status === 200){
          const newAccessToken = response?.data?.accessToken
          store.dispatch(updateAccessToken(newAccessToken))
          error.config.headers.authorization =  `Bearer ${newAccessToken}`
            return axios(error.config)
        }
    }
    refresh = false
    return Promise.reject(error);
  })

export default CustomAxios 