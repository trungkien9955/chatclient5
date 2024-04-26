// import axios from 'axios';
//  const  CommonAxiosPost = axios.create({
//     withCredentials: true,
//     baseURL: "http://192.168.1.218:5000/api",
//     headers: { 
//         "Content-Type": "application/json", 
//         'Access-Control-Allow-Origin': '*', 
//     },
//     credentials: 'include',
// })
// // let refresh = false
// // CommonAxiosPost.interceptors.response.use(resp =>resp, async error =>{
// //     if(error.response.status === 403 && !refresh){
// //         refresh  = true
// //         const response = await CommonAxiosPost.post("/users/refresh", {}, {withCredentials:true})
// //         if(response.status === 200){
// //             CommonAxiosPost.defaults.headers.common['Authorization'] = `Bearer ${response.data['accessToken']}`
// //             return axios(error.config)
// //         }
// //     }
// //     refresh = false
// //     return error
// // })
// export default CommonAxiosPost

                                     