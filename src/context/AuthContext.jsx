import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl } from "../utils/services";
import {postRequest} from "../utils/services"

export const AuthContext = createContext();
export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    })
    useEffect(()=>{
        const user = localStorage.getItem("User");
        setUser(JSON.parse(user));
    }, [])
    // useEffect(()=>{
    //     let user = JSON.stringify(user)
    //     localStorage.setItem("User", user);
    //     setUser(JSON.parse(user));
    // }, [user])

    console.log("auth context user", user)

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, [])
    const registerUser = useCallback(async(e)=>{
        e.preventDefault();
        console.log("clientRegisterInfo", registerInfo)
        setIsRegisterLoading(true);
        setRegisterError(null);
        const response = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo));
        setIsRegisterLoading(false);
        if(response.error) {
            return setRegisterError(response);
        }
        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
    }, [registerInfo])
    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info);
    }, [])
    const loginUser = useCallback(async(e) => {
        e.preventDefault()
        console.log("clientloginInfo", loginInfo)
        setIsLoginLoading(true)
        setLoginError(null)
        const response = await postRequest(`${baseUrl}/users/login`, JSON.stringify(loginInfo));
        setIsLoginLoading(false);
        if(response.error){
            return setLoginError(response)
        }
        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);

    }, [loginInfo])
    const logoutUser = useCallback(()=> {
        localStorage.removeItem("User");
        setUser(null)
    }, [])
    return (
        <AuthContext.Provider 
        value = {{
            user, 
            setUser,
            registerInfo, 
            updateRegisterInfo, 
            registerUser,
            isRegisterLoading, 
            registerError, 
            loginInfo,
            updateLoginInfo,
            loginUser,
            isLoginLoading,
            loginError,
            logoutUser,
            }}>
            {children}
        </AuthContext.Provider>
    )
}