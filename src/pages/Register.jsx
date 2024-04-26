import { useContext, useEffect, useRef, useState } from "react";
import {Alert, Button, Form, Row, Col, Stack, Spinner} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, resetRegister, updateRegisterInfo } from "../features/registerSlice";
import {motion} from 'framer-motion'
import { callLoader, removeLoader } from "../features/appSlice";
import { baseUrl, getRequest } from "../utils/services";
import CustomAxios from "../utils/CustomAxios";
import { bT04, bT05, bT06, bT07, bT08, bT09, bT10 } from "../components/ui/FramerMotion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import { vi } from 'date-fns/locale/vi';
registerLocale('vi', vi)
const containerVariants = {
    hidden: {
        y: '100vh',
        opacity: 0,
    }, 
    visible: {
        opacity: 1,
        y: 0,
        transition: {delay: 0.4, duration:  0.4}
    },
    exit: {
        y: '100vh',
        transition: {ease: "easeInOut"}
    }
}

const Register = () => {
    const register = useSelector(state=>state.register)
    const registerInfo = register.registerInfo
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/
    const nameRegex = /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]{8,30}$/i
    const [cities, setCities]=useState([]) 
    const emailRef = useRef()
    const [validEmail, setValidEmail]=useState(false)
    const [emailFocus, setEmailFocus]=useState(false)
    const [validPassword, setValidPassword]=useState(false)
    const [passwordFocus, setPasswordFocus]=useState(false)
    const [matchPassword, setMatchPassword]=useState("")
    const [validMatch, setValidMatch]=useState(false)
    const [matchFocus, setMatchFocus]=useState(false)
    const [validName, setValidName]=useState(false)
    const [nameFocus, setNameFocus]=useState(false)
    const [errMsg, setErrMsg]=useState("")
    const [passwordShow, setPassWordShow] = useState(false)
    const [mPasswordShow, setMPassWordShow] = useState(false)
    const [gender, setGender]=useState(null)
    const [dCity, setDCity]=useState(null)
    const [startDate, setStartDate] = useState(new Date());

    const togglePasswordShow = ()=>{
        setPassWordShow(!passwordShow)
    }
    const toggleMPasswordShow = ()=>{
        setMPassWordShow(!mPasswordShow)
    }
    useEffect(()=>{
        emailRef.current.focus()
    }, [])
    useEffect(()=>{
        const result = emailRegex.test(registerInfo.email)
        setValidEmail(result)
    }, [registerInfo.email])
    useEffect(()=>{
        const result = passwordRegex.test(registerInfo.password)
        setValidPassword(result)
        const match = registerInfo.password === matchPassword
        setValidMatch(match)
    }, [registerInfo.password, matchPassword])
    useEffect(()=>{
        const result = nameRegex.test(registerInfo.name)
        console.log(result)
        setValidName(result)
    }, [registerInfo.name])
    useEffect(()=>{
        
        setErrMsg("")
    }, [registerInfo.email, registerInfo.password, matchPassword])
    useEffect(()=>{
        const fetchCities = async()=>{
            let cities = await CustomAxios.get(`/data/cities`)
            cities = cities.data
            if(cities.length > 0){
                setCities(cities)
            }
        }
        fetchCities()
    }, [])
    useEffect(()=>{
        window.addEventListener('pageshow', ()=>{
            dispatch(resetRegister())
          })
    }, [])

    return ( <motion.div  
    variants = {containerVariants}
    initial = "hidden"
    animate = "visible"
    exit="exit"
    className= "register-section position-relative"
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
                            <h4 className="primary-color">Đăng ký tài khoản</h4>
                            {
                            register.registerStatus?.status == "failed" &&  <span className="color-bs-danger">{register.registerStatus?.errorMessage}</span>
                            }
                             {
                            register.registerStatus?.status == "success" &&  <Stack className="p-2 bg-light border-radius-sm my-2"><span className="color-bs-success">Xin chào {register.tempUser?.name}, vui lòng xác minh qua email để hoàn tất quá trình đăng ký.</span></Stack>
                            }
                        </Stack>
                    </Stack>
                    <Stack className="register-form-content">
                    <motion.div
                          variants = {bT04}
                          initial = "hidden"
                          animate = "visible"
                          exit="exit"
                      >
                        <Stack style={{maxHeight: "360px", overflowY: "scroll"}}>
                        <Form.Select 
                         aria-label="Select city" 
                         size="md"
                         disabled = {register.registerStatus.status}
                         style = {register.registerStatus.status? {opacity: ".5"}: {}}
                         onChange={(e)=>{
                            setDCity(e.target.value)
                            dispatch(updateRegisterInfo({...registerInfo, dCityId: e.target.value}))
                         }}
                         >
                            <option value="">Chọn tỉnh, thành phố</option>
                            {
                                cities?.length > 0 && 
                                    cities.map((city, index)=>{
                                        return <option value={city._id} key={index}>{city.name}</option>
                                    })
                            }
                        </Form.Select>
                        </Stack>
                       </motion.div>
                      <motion.div
                          variants = {bT05}
                          initial = "hidden"
                          animate = "visible"
                          exit="exit"
                      >
                    <Form.Group className="mb-1">
                        <Form.Label htmlFor="email">
                            Email
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#28a745" className={validEmail ? "bi bi-check-circle ms-1": "hidden"} viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#dc3545" className={validEmail || !registerInfo.email ? "hidden" : "bi bi-x-circle ms-1"} viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </Form.Label>
                        <Form.Control 
                        type="email"
                        size="md" 
                        ref = {emailRef}
                        defaultValue = {registerInfo.email}
                       maxLength={50} 
                       onChange={(e)=> dispatch(updateRegisterInfo({...registerInfo, email: e.target.value}))} 
                       onFocus={()=>{setEmailFocus(true)}}
                       onBlur={()=>{setEmailFocus(false)}}
                       disabled = {register.registerStatus.status}
                       required
                       style = {register.registerStatus.status? {opacity: ".5"}: {}}
                        />
                        {emailFocus && <span>Ví dụ: abc@xyz.com</span>}
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#28a745" className={validPassword ? "bi bi-check-circle ms-1": "hidden"} viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#dc3545" className={validPassword || !registerInfo.password ? "hidden" : "bi bi-x-circle ms-1"} viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </Form.Label>
                        <Form.Control 
                        type={passwordShow ? "text" : "password"}
                        size="md" 
                        defaultValue = {registerInfo.password}
                       maxLength={50} 
                       onChange={(e)=> dispatch(updateRegisterInfo({...registerInfo, password: e.target.value}))} 
                       onFocus={()=>{setPasswordFocus(true)}}
                       onBlur={()=>{setPasswordFocus(false)}}
                       disabled = {register.registerStatus.status}
                       required
                       style = {register.registerStatus.status? {opacity: ".5"}: {}}
                        />
                        {passwordFocus && <span>Ít nhất 8 ký tự, bao gồm 1 chữ thường, 1 chữ hoa, 1 số và 1 ký tự đặc biệt (@$!%*?&).</span>}
                    </Form.Group>
                       </motion.div>
                       <motion.div
                          variants = {bT07}
                          initial = "hidden"
                          animate = "visible"
                          exit="exit"
                      >
                        <Form.Group className="mb-1">
                        <Form.Label htmlFor="match-password">
                            Nhập lại mật khẩu
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-eye ms-1" viewBox="0 0 16 16"
                            onClick={toggleMPasswordShow}
                            >
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#28a745" className={validMatch ? "bi bi-check-circle ms-1": "hidden"} viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#dc3545" className={validMatch || !matchPassword ? "hidden" : "bi bi-x-circle ms-1"} viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                            </Form.Label>
                        <Form.Control 
                        type={mPasswordShow ? "text" : "password"}
                        size="md" 
                        defaultValue = {matchPassword}
                       maxLength={50} 
                       onChange={(e)=> {
                        setMatchPassword(e.target.value)
                    }} 
                       disabled = {register.registerStatus.status}
                       required
                       style = {register.registerStatus.status? {opacity: ".5"}: {}}
                        />
                    </Form.Group>
                       </motion.div>
                       <motion.div
                          variants = {bT08}
                          initial = "hidden"
                          animate = "visible"
                          exit="exit"
                      >
                        <Form.Group className="mb-1">
                        <Form.Label htmlFor="name">
                            Tên hiển thị
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#28a745" className={validName ? "bi bi-check-circle ms-1": "hidden"} viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#dc3545" className={validName || !registerInfo.name ? "hidden" : "bi bi-x-circle ms-1"} viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </Form.Label>
                        <Form.Control 
                        type="text"
                        size="md" 
                        defaultValue = {registerInfo.name}
                       maxLength={50} 
                       onChange={(e)=> dispatch(updateRegisterInfo({...registerInfo, name: e.target.value}))} 
                       onFocus={()=>{setNameFocus(true)}}
                       onBlur={()=>{setNameFocus(false)}}
                       disabled = {register.registerStatus.status}
                       required
                       style = {register.registerStatus.status? {opacity: ".5"}: {}}
                        />
                        {nameFocus && <span>8-30 ký tự, VD: Ngọc Phương Trang</span>}
                        </Form.Group>
                       </motion.div>
                       <motion.div
                          variants = {bT09}
                          initial = "hidden"
                          animate = "visible"
                          exit="exit"
                      >
                        <Stack direction="horizontal" gap={3} className="my-1">
                        <Form.Check
                            type="radio"
                            label="Nam"
                            name="gender"
                            value="65dca214d75b5575b7cd92e6"
                            disabled = {register.registerStatus.status}
                            style = {register.registerStatus.status? {opacity: ".5"}: {}}
                            onClick={(e)=>{
                                setGender(e.target.value)
                                dispatch(updateRegisterInfo({...registerInfo, genderId: e.target.value}))
                            }}
                        />
                        <Form.Check
                            type="radio"
                            label="Nữ"
                            name="gender"
                            value="65dca214d75b5575b7cd92e5"
                            disabled = {register.registerStatus.status}
                            style = {register.registerStatus.status? {opacity: ".5"}: {}}
                            onClick={(e)=>{
                                setGender(e.target.value)
                                dispatch(updateRegisterInfo({...registerInfo, genderId: e.target.value}))
                            }}
                        />
                        </Stack>
                       </motion.div>
                       <Stack>
                        <span>Ngày sinh:</span>
                        <DatePicker 
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        locale="vi"
                        dateFormat="dd/MM/yyyy"
                        className="border-radius-sm p-1"
                        selected={startDate} 
                        onChange={(date) => {
                            setStartDate(date)
                            dispatch(updateRegisterInfo({...registerInfo, dob: date.toISOString()}))
                        }} 
                        />
                        </Stack>
                        {
                          <motion.button 
                          variants = {bT10}
                          initial = "hidden"
                          animate = "visible"
                          exit="exit"
                          className= { !validEmail || !validPassword || !validMatch || !validName || !gender ||!dCity || register.registerStatus.status ? "mt-3 faded btn btn-primary  py-2": "mt-3 btn btn-primary py-2"}
                          disabled = {!validEmail || !validPassword || !validMatch || !validName || !gender ||!dCity || register.registerStatus.status ? true : false}
                          style = { {backgroundColor: "#bb86fc", border: "none"}} 
                          onClick={(e)=> {
                            e.preventDefault()
                            dispatch(registerUser(registerInfo))
                        }}>
                             Đăng ký
                        </motion.button>
                        }
                         {
                            register.registerStatus.status == "failed" &&
                          <button 
                          variants = {bT10}
                          initial = "hidden"
                          animate = "visible"
                          exit="exit"
                          className= "mt-3 btn btn-primary  py-2"
                          style = {{backgroundColor: "#bb86fc", border: "none"}} onClick={(e)=> {
                            e.preventDefault()
                            dispatch(resetRegister())
                            
                        }}>
                             Đăng ký lại
                        </button>
                        }
                                              {
                            register.registerStatus.status == "success" &&
                          <button 
                          variants = {bT10}
                          initial = "hidden"
                          animate = "visible"
                          exit="exit"
                          className= "mt-3 btn btn-primary  py-2"
                          style = {{backgroundColor: "#bb86fc", border: "none"}} 
                          onClick={(e)=> {
                            e.preventDefault()
                            dispatch(resetRegister())
                        }}>
                             Đăng ký tài khoản khác
                        </button>
                        }
                        </Stack>
                </motion.div>
        }
    </motion.div> );
}
 
export default Register;