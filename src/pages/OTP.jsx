import { Alert, Button, Container, Form, Stack } from "react-bootstrap";
import OtpInput from 'react-otp-input';
import { auth } from "../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useEffect, useState } from "react";
const OTP = () => {
    const [status, setStatus] = useState("")
    const [user, setUser] = useState(null)
    const [otp, setOtp] = useState("")
    const [phone,setPhone] = useState("")
    const [otpShow,setOtpShow] = useState(true)

    const onCaptchaVerify = ()=>{
        if(!window.recaptchaVerifier){
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'normal',
                'callback': (response) => {
                  // reCAPTCHA solved, allow signInWithPhoneNumber.
                  setOtpShow(true)
                  // ...
                  onSignup()
                },
                'expired-callback': () => {
                  // Response expired. Ask user to solve reCAPTCHA again.
                  // ...
                }
              });
        }
    }
    const onSignup = ()=>{
        onCaptchaVerify()
        const appVerifier = window.recaptchaVerifier
        const phoneNumber = `+84${phone}`
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        setStatus("success")
        // ...
        }).catch((error) => {
            console.log(error)
            setStatus("failed")
        // Error; SMS not sent
        // ...
        });
    }
    const onOTPVerify = ()=>{
        window.confirmationResult
        .confirm(otp)
        .then(async()=>{
            setUser("0964666156")
        }).catch((error)=>{
            console.log(error)
        })
    }
    useEffect(()=>{
        console.log(user)
    }, [user])

    return ( 
        <div className="otp-section bg">
            {/* <Stack className="page-header">
                <div className="page-title">OTP</div>
                <div className="page-desc">Xác nhận đăng ký tài khoản bằng SMS</div>
                <hr />
            </Stack> */}
            <Container className="py-4 px-2" style={{margin: "auto"}}>
                <Stack direction="vertical" gap = {2} style = {{width: "75%", margin: "auto"}}>
                    <div id="recaptcha-container"></div>
                    <Form.Control 
                    type="text" 
                    
                    style={{cursor:"pointer"}}
                    onChange={(e)=>{
                        setPhone(e.target.value)
                    }}
                    />
                    <Button
                    onClick={onSignup}
                    >Gửi OTP</Button>
                    {
                        otpShow && <>
                        <OtpInput 
                        value={otp}
                        numInputs = {6}
                    onChange = {setOtp}
                    renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} />}
                    
                    ></OtpInput>
                    <Button
                    onClick={onOTPVerify}
                    >Nhập OTP</Button>
                    </>
                    }
                    
                </Stack>
                <Stack>
                    {
                        status == "success" &&
                        <Alert variant ="success">
                        Gửi SMS thành công.
                    </Alert>
                    }
                    {
                        status == "failed" &&
                        <Alert variant ="danger">
                        Đã xảy ra lỗi.
                    </Alert>
                    }
                    
                </Stack>
            </Container>
        </div>
     );
}
 
export default OTP;