import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Stack } from "react-bootstrap";
import { verifyEmail } from "../features/registerSlice";
import {motion} from 'framer-motion'
import { bT06, bT07, lR, rL05 } from "../components/ui/FramerMotion";
const VerifyEmail = () => {
    const auth = useSelector(state=>state.auth)
    const register = useSelector(state=>state.register)

    const user = auth.user
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const emailToken = searchParams.get("emailToken")
    const dispatch = useDispatch()
    console.log(emailToken)
    useEffect(()=>{
        const verify = async()=>{
            if(user && user?.isVerified){
                setTimeout(()=>{
                    return navigate("/")
                },3000)
            }else{
                if(emailToken){
                    console.log(emailToken)
                    dispatch(verifyEmail(emailToken))
                }
        }
        }
        verify()
    },[emailToken, user])
    return ( <Stack 
        className="align-items-center w-100 h-100"
    >
        {
            register.verifyStatus.status == "success" &&
            <Stack 
            gap={3}
            className="align-items-center p-3 surface-1 border-radius"
            style={{width: "75%", marginTop: "2rem", margin: "auto"}}
            >
                <motion.svg 
                variants = {lR}
                initial= "hidden"
                animate="visible"
                exit="exit"
                xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#198754" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </motion.svg>
                <motion.div 
                variants = {rL05}
                initial= "hidden"
                animate="visible"
                exit="exit"
                style={{fontSize: "1.2rem"}}
                >Xác minh tài khoản thành công.</motion.div>
                <motion.div
                variants = {bT06}
                initial= "hidden"
                animate="visible"
                exit="exit"
                style={{fontSize: "0.8rem"}}
                >
                    Bạn có thể đăng nhập ngay bây giờ.</motion.div> 

                <motion.div 
                variants = {bT07}
                initial= "hidden"
                animate="visible"
                exit="exit"
                className="btn btn-outline-secondary  hoverable" 
                style={{backgroundColor: "#bb86fc", border: "none", color: "#fff"}}
                onClick={()=>{
                    navigate("/login")
                }}
                >Đến trang đăng nhập</motion.div>
            </Stack>
        }
                {
            register.verifyStatus.status == "failed" &&
            <Stack 
            gap={3}
            className="align-items-center p-3 surface-1 border-radius"
            style={{width: "75%", marginTop: "2rem", margin: "auto"}}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#ffc107" className="bi bi-exclamation-square-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                </svg>
                <div style={{fontSize: "1.5rem"}}>{register.verifyStatus?.errorMessage}</div>
                <div>Vui lòng kiểm tra hoặc đăng ký lại.</div> 
                <div 
                className="btn btn-outline-secondary"
                onClick={()=>{
                    navigate("/registerr")
                }}
                >Đến trang đăng ký</div>
            </Stack>
        }
    </Stack>
     );
}
 
export default VerifyEmail;