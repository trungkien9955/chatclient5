import axios from 'axios';
import { updateAccessToken } from '../features/authSlice';
import { baseUrl } from './services';

let store

export const injectStoreForAxiosFormData = _store => {
  store = _store
}
// const accessToken = store.getState().auth.accessToken
const AxiosForFormData = axios.create({
    withCredentials: true,
    baseURL: baseUrl,
    headers: {'Content-Type': 'multipart/form-data',
    'Accept': 'multipart/form-data',
}
})
AxiosForFormData.interceptors.request.use(function (config) {
  console.log("inter re quest")
  config.headers.refresh = store.getState().auth.refreshToken
  config.headers.authorization = `Bearer ${store.getState().auth.accessToken}`
  console.log("inter request ends")
  console.log(config)
  return config;
}, function (error) {
  return Promise.reject(error);
});
let refresh = false
AxiosForFormData.interceptors.response.use(resp =>resp, async error =>{
    if(error.response.status === 403 || error.response.status === 401 && !refresh)
    {
        refresh  = true
        console.log("refresh starts")
        const response = await AxiosForFormData.post("/users/refresh-form-data")
        if(response.status === 200){
          const newAccessToken = response?.data?.accessToken
          store.dispatch(updateAccessToken(newAccessToken))
          error.config.headers.authorization =  `Bearer ${newAccessToken}`
          console.log("refresh ends")

            return axios(error.config)
        }
    }
    refresh = false
    return Promise.reject(error);
  })

export default AxiosForFormData 