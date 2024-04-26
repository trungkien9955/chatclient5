import { useContext, useEffect, useRef, useState } from "react";
import {Alert, Button, Form, Row, Col, Stack, Spinner} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {motion} from 'framer-motion'
import { callLoader, removeLoader } from "../features/appSlice";
import { bT04, bT05, bT06, bT07, bT08, bT09, bT10 } from "../components/ui/FramerMotion";
import { loginUser, resetLogin, updateLoginInfo } from "../features/authSlice";

const Login2 = () => {
    const loginInfo = useSelector(state=>state.auth.loginInfo)
    const loginStatus = useSelector(state=>state.auth.loginStatus)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const emailRef = useRef()
    const [passwordShow, setPassWordShow] = useState(false)

    const togglePasswordShow = ()=>{
        setPassWordShow(!passwordShow)
    }
    useEffect(()=>{
        emailRef.current.focus()
    }, [])
    useEffect(()=>{
        dispatch(resetLogin())
    }, [])

    return ( <motion.div  
    variants = {bT04}
    initial = "hidden"
    animate = "visible"
    exit="exit"
    className= "login-section position-relative"
    style={{width: "100vw", height: "100vh"}}>
        {
            
                <motion.div
                className="register-container vertical-center register-form border-radius"
                style={{width: "70%", height: "auto"}}
                >
                    <Stack className="register-form-header">
                        <Stack  direction="vertical">
                            <Stack direction="horizontal" className="align-items-start">
                            <div>AMO DATING</div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                            </svg>
                            </Stack>
                            <span>Ở đây có phát người yêu</span>
                        </Stack>
                        <Stack style={{textAlign: "left"}}>
                            <h4 className="primary-color">Đăng nhập</h4>
                            {
                            loginStatus?.status == "failed" &&  <span className="color-bs-danger">{loginStatus?.errMsg}</span>
                            }
                        </Stack>
                    </Stack>
                    <Stack className="register-form-content">
                      <motion.div
                          variants = {bT05}
                          initial = "hidden"
                          animate = "visible"
                          exit="exit"
                      >
                    <Form.Group className="mb-1">
                        <Form.Label htmlFor="email">
                            Email
                        </Form.Label>
                        <Form.Control 
                        type="email"
                        size="md" 
                        ref = {emailRef}
                       maxLength={50} 
                       onChange={(e)=> dispatch(updateLoginInfo({...loginInfo, email: e.target.value}))} 
                       disabled = {loginStatus.status}
                       required
                       style = {loginStatus.status? {opacity: ".5"}: {}}
                        />
                    </Form.Group>
                      </motion.div>
                      <motion.div
                          variants = {bT06}
                          initial = "hidden"
                          animate = "visible"
                          exit="exit"
                      >
                        <Form.Group className="mb-1">
                        <Form.Label htmlFor="password">
                            Mật khẩu
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-eye ms-1" viewBox="0 0 16 16"
                            onClick={togglePasswordShow}
                            >
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                            </svg>
                        </Form.Label>
                        <Form.Control 
                        type={passwordShow ? "text" : "password"}
                        size="md" 
                       maxLength={50} 
                       onChange={(e)=> dispatch(updateLoginInfo({...loginInfo, password: e.target.value}))} 
                       disabled = {loginStatus.status}
                       required
                       style = {loginStatus.status? {opacity: ".5"}: {}}
                        />
                    </Form.Group>
                       </motion.div>
                        {
                          <motion.button 
                          variants = {bT07}
                          initial = "hidden"
                          animate = "visible"
                          exit="exit"
                          className= { !loginInfo.email || !loginInfo.password || loginStatus.status ? "mt-3 faded btn btn-primary  py-2": "mt-3 btn btn-primary py-2"}
                          disabled = {!loginInfo.email || !loginInfo.password || loginStatus.status ? true : false}
                          style = { {backgroundColor: "#bb86fc", border: "none"}} 
                          onClick={(e)=> {
                            e.preventDefault()
                            dispatch(loginUser(loginInfo))
                        }}>
                             Đăng nhập
                        </motion.button>
                        }
                         {
                           loginStatus.status == "failed" &&
                          <button 
                          variants = {bT07}
                          initial = "hidden"
                          animate = "visible"
                          exit="exit"
                          className= "mt-3 btn btn-primary  py-2"
                          style = {{backgroundColor: "#bb86fc", border: "none"}} onClick={(e)=> {
                            e.preventDefault()
                            dispatch(resetLogin())
                        }}>
                             Đăng nhập lại
                        </button>
                        }
                        <span className="my-1">Chưa có tài khoản? <span className="color-pr font-weight-bold cursor-pointer" onClick={()=>{
                            navigate("/registerr")
                        }}> Đăng ký ngay</span></span>
                        </Stack>
                </motion.div>
        }
    </motion.div> );
}
 
export default Login2;