import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl, getRequest, postRequest } from "../utils/services";
import { callLoader, removeLoader } from "./appSlice";
import CustomAxios from "../utils/CustomAxios";
const initialState = {
    tempUser: null,
    registerInfo: {
        dCityId: null,
        email: null, 
        password: null,
        name: null,
        genderId: null,
        dob: null,
    },
    registerStatus: {
        errorMessage: null,
        status: "",
    },
    verifyStatus: {
        errorMessage: null,
        status: "",
    },
}
export const registerUser = createAsyncThunk(
    "register/registerUser", 
   async(registerInfo, thunkAPI)=>{
       thunkAPI.dispatch(callLoader())
       try {
           let response = await CustomAxios.post(`/users/register`, registerInfo);
            response = response.data
           thunkAPI.dispatch(removeLoader())
            return response.values.user
           
       }
       catch(error){
           thunkAPI.dispatch(removeLoader())
            if(error.response.status == 400){
                return thunkAPI.rejectWithValue(error.response.data.errMsg)
            }else{
                return thunkAPI.rejectWithValue("Lỗi hệ thống")
            }
       }
   }
)
export const verifyEmail = createAsyncThunk(
    "register/verifyEmail", 
   async(emailToken, thunkAPI)=>{

       try {
            thunkAPI.dispatch(callLoader())
           const response = await CustomAxios.post(`/users/verify-email`, {emailToken:emailToken})
           thunkAPI.dispatch(removeLoader())
           return response.data.values.user
       }
       catch(error){
            thunkAPI.dispatch(removeLoader())
            if(error.response.status = 404){
                thunkAPI.rejectWithValue(error.response.data.errMsg)
            }else{
                thunkAPI.rejectWithValue("Lỗi hệ thống.")
            }
            }
   }
)
const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        updateRegisterInfo(state, action){
            state.registerInfo = action.payload
        },
        resetRegister(state,action){
            return initialState
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(registerUser.pending, (state, action)=> {
            state.status = "loading"
        })
        .addCase(registerUser.fulfilled, (state, action)=> {
                state.tempUser = action.payload
                state.registerStatus = {...state.registerStatus, status: "success", errorMessage: null}
        })
        .addCase(registerUser.rejected, (state, action)=> {
           state.registerStatus = {...state.registerStatus, status: "failed", errorMessage: action.payload}
        })
        .addCase(verifyEmail.fulfilled, (state, action)=> {
                state.verifyStatus = {...state.verifyStatus, status: "success", errorMessage: null}
        })
        .addCase(verifyEmail.rejected, (state, action)=> {
            state.verifyStatus = {...state.verifyStatus, status: "failed", errorMessage: action.payload}

        })
        .addDefaultCase((state, action) => {})
    }
})
export const {updateRegisterInfo, resetRegister} = registerSlice.actions
export default registerSlice.reducer