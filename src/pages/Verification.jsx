// import { useContext } from "react";
// import {Alert, Button, Form, Row, Col, Stack, Spinner} from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { resetRegister, updateRegisterInfo, registerUser } from "../features/registerSlice";
// const Verify = () => {
//     const register = useSelector(state=>state.register)
//     const auth = useSelector(state=>state.auth)
//     const user = auth.user
//     const dispatch = useDispatch()
//     return ( <div  className= "login-section position-relative"style={{width: "100vw", height: "100vh"}}>
//         {
//             !user? 
//                 <Stack gap = "3" className="register-container vertical-center register-form align-items-center" style={{width: "60%", height: "auto"}}>
//                       <h4 className="primary-color">Xác minh đăng ký tài khoản</h4>
                       
//                         {
//                            0 == "loading" &&
//                             <Button variant="primary" disabled>
//                             <Spinner
//                               as="span"
//                               animation="border"
//                               size="sm"
//                               role="status"
//                               aria-hidden="true"
//                             />
//                             <span className="ps-1">Đang xử lý ...</span>
//                           </Button>

//                         }
//                         {
//                             register.verifyStatus?.status == "failed" &&
//                             <Alert variant="danger" className="mt-2 mb-2" style={{width: "100%", textAlign:"center"}}>
//                             {register.verifyStatus?.errorMessage} <span 
//                             onClick={()=>{
//                                 dispatch(resetRegister())
//                             }} className="btn btn-outline-secondary">Đăng ký lại</span>
//                             <span 
//                             onClick={()=>{
//                                 dispatch(resetRegister())
//                             }} className="btn btn-outline-secondary">Gửi lại email xác minh</span>
//                             </Alert>
//                         }
//                         {
//                             register.verifyStatus?.status == "success" &&
//                             <Alert variant="success" 
//                             className="mt-2 mb-2" 
//                             dismissible
//                             style={{width: "100%", 
//                             textAlign:"center"}}>
//                             Xác minh tài khoản thành công.
//                             <div
//                             className="btn btn-outline-secondary"
//                             onClick={()=>{
//                                 dispatch(resetRegister())
//                             }} 
//                             >
//                                 Đến trang chủ
//                             </div>
//                             </Alert>
//                         }
//                     </Stack>
//             :
//             <>
//             <Stack gap = "3" className="vertical-center register-form align-items-center" style={{width: "60%", height: "auto"}}>
//                       <h4 className="primary-color">Xin chào, {auth.user?.name}</h4>
//                       <div
//                             className="btn btn-outline-secondary"
//                             onClick={()=>{
//                                 dispatch(resetRegister())
//                             }} 
//                             >
//                                 Đến trang chủ
//                             </div>
//                     </Stack>
//             </>
//         }

//     </div> );
// }
 
// export default Verify;