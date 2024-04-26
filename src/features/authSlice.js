import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { baseUrl, getRequest, postRequest } from "../utils/services";
import { showInfoOffCanvas, showOffCanvasAlertWithExternalData, showOffCanvasDisabledConfirmBtn, startLoadingStatus, stopLoadingStatus } from "./offCanvasSlice";
import { addChats, fetchInitialStrangers, getChats, getDataFromLogin, getFans, likeStranger, likeTheLastStranger, removeLikedStrangerFromHome,  saveDCityId_Filter,  updateDCityId_Filter,  updateDCityId_tempFilter, updateHCityId_Filter, updateHCityId_tempFilter, updateIniFilter, updateInitialLikedStrangers, updateInitialNoti, updateNewNotiCount, updateTempFilter } from "./homeSlice";
import { showInfMd, showModalNoti, showPgMdErrorAlert, showPgMdSuccessAlert } from "./modalSlice";
import { hideBtn, showTextModalNoti, showTxtMErrMsg, showTxtMoSuccessMsg } from "./textModalSlice";
import { addOnlineUser, updateChatBgImg, updateInnitialMessageNoti, updateUser } from "./chatSlice";
import { updateInnitialGenderId, updateNewDatingGoalIdArray } from "./profileSlice";
import { fetchStats } from "./statsSlice";
import { callLoader, removeLoader } from "./appSlice";
import axios from "axios";
import CustomAxios from "../utils/CustomAxios";
import { useSelector } from "react-redux";
import AxiosForFormData from "../utils/AxiosForFormData";
import { lightFormat } from "date-fns";
import getBgImg from "../hooks/useBgImg";
const initialState = {
    user: null,
    btnStatus: "",
    loginInfo: {
        email: "", 
        password: ""
    },
    registerInfo: {
        name: "",
        email: "", 
        password: "",
    },
    registerStatus: {
        errorMessage: "",
        status: "",
    },
    loginStatus: {
        errMsg: "",
        status: "",
    },
    cities: [],
    newName: "",
    IniDCityId: null,
    newDatingCityId: null,
    newHomeCityId: "",
    initialDatingGoalIdArray: [],
    tempDatingGoalIdArray: [],
    initialHobbyIdArray: [],
    initialHobbies: [],
    tempHobbies: [],
    tempHobbyIdArray: [],
    hobbySearchResults: [],
    iniKidOptId: null,
    tempKidOptId: null,
    iniSmokingOptId: null,
    tempSmokingOptId: null,
    iniDrinkingOptId: null,
    tempDrinkingOptId: null,
    iniJobs: [],
    tempJobs: [],
    iniJobIdArray: [],
    tempJobIdArray: [],
    jobSearchResults: [],
    iniEduOptId: null,
    tempEduOptId: null,
    iniColl: null,
    iniCollId: null,
    tempColl: null,
    tempCollId: null,
    collegeSearchResults: [],
    iniName: null,
    tempName: null,
    iniBio: null,
    tempBio: null,
    iniHeight: null,
    tempHeight: null,
    iniWeight: null,
    tempWeight: null,
    tempRemovedGalImgId: null, 
    tempProfImg: null,
    tempGalImages: [],
    iniDob: null,
    tempDob: null,
    status: "",
    appStatus: "",
    refreshToken: null,
    accessToken: null,
}
export const registerUser = createAsyncThunk(
     "auth/registerUser", 
    async(registerInfo, thunkAPI)=>{
        thunkAPI.dispatch(callLoader())
        try {
            let response = await CustomAxios(`/users/register`, registerInfo);
            thunkAPI.dispatch(removeLoader())
            response = response.data
            if(response.success){
                return response
            }else if(response.error){
                thunkAPI.dispatch(removeLoader())
                return thunkAPI.rejectWithValue(response.errMsg)
            }
        }
        catch(error){
            console.log(error)
            return thunkAPI.rejectWithValue("Lỗi ứng dụng")
        }
    }
)

export const loginUser2 = createAsyncThunk(
    "auth/login", 
   async(input, thunkAPI)=>{
       try {
           const response = await postRequest(`${baseUrl}/users/login`, JSON.stringify(input));
            if(response.user.name){
                thunkAPI.dispatch(updateIniName(response.user.name))
                thunkAPI.dispatch(updateTempName(response.user.name))
            }
            if(response.user.fans.length > 0){
                thunkAPI.dispatch(getFans(response.user.fans))
            }
            if(response.user.likedStrangers.length > 0){
                thunkAPI.dispatch(updateInitialLikedStrangers(response.user.likedStrangers))
            }
            if(response.user.chats.length > 0){
                thunkAPI.dispatch(getChats(response.user.chats))
            }
           if(response.user.datingCity) {
            thunkAPI.dispatch(fetchInitialStrangers({datingCityId: response.user.datingCity._id, userId: response.user._id}))
           }
           if(response?.user){
            thunkAPI.dispatch(updateUserInAuth(response.user))
           }

           if(response.user.messageNoti.length >0){
            thunkAPI.dispatch(updateInnitialMessageNoti(response.user.messageNoti))
           }
           if(response.user.noti.length >0){
            let newNotiCount = 0
            response.user.noti.map((noti)=>{
                if(!noti.isRead){
                    newNotiCount++
                }
            })
            if(newNotiCount > 0){
                thunkAPI.dispatch(updateNewNotiCount(newNotiCount))
            }
            thunkAPI.dispatch(updateInitialNoti(response.user.noti))
           }
           if(response.user.gender){
            thunkAPI.dispatch(updateInnitialGenderId(response.user.gender._id))
           }
           if(response.user.datingGoals?.length >0){
            let initialDatingGoalIdArray = []
            response.user.datingGoals?.map((datingGoal)=>{
                initialDatingGoalIdArray.push(datingGoal._id)
            })
            thunkAPI.dispatch(updateInitialDatingGoalIdArrayInAuth(initialDatingGoalIdArray))
           }
           if(response.user.datingGoals.length >0){
            let initialDatingGoalIdArray = []
            response.user.datingGoals.map((datingGoal)=>{
                initialDatingGoalIdArray.push(datingGoal._id)
            })
            thunkAPI.dispatch(updateInitialDatingGoalIdArrayInAuth(initialDatingGoalIdArray))
           }
           if(response.user.hobbies.length >0){
            let initialHobbyIdArray = []
            response.user.hobbies.map((hobby)=>{
                initialHobbyIdArray.push(hobby._id)
            })
            thunkAPI.dispatch(updateInitialHobbyIdArrayInAuth(initialHobbyIdArray))
            thunkAPI.dispatch(updateInitialHobbies(response.user.hobbies))
            thunkAPI.dispatch(updateTempHobbies(response.user.hobbies))
            thunkAPI.dispatch(updateTempHobbyIdArray(initialHobbyIdArray))
           }
           if(response.user.kidOption){
            thunkAPI.dispatch(updateIniKidOptId(response.user.kidOption._id))
            thunkAPI.dispatch(updateTempKidOptId(response.user.kidOption._id))
           }
           if(response.user.smokingOption){
            thunkAPI.dispatch(updateIniSmokingOptId(response.user.smokingOption._id))
            thunkAPI.dispatch(updateTempSmokingOptId(response.user.smokingOption._id))
           }
           if(response.user.drinkingOption){
            thunkAPI.dispatch(updateIniDrinkingOptId(response.user.drinkingOption._id))
            thunkAPI.dispatch(updateTempDrinkingOptId(response.user.drinkingOption._id))
           }
           if(response.user.jobs.length >0){
            let iniJobIdArray = []
            response.user.jobs.map((job)=>{
                iniJobIdArray.push(job._id)
            })
            thunkAPI.dispatch(updateIniJobIdArray(iniJobIdArray))
            thunkAPI.dispatch(updateIniJobs(response.user.jobs))
            thunkAPI.dispatch(updateTempJobs(response.user.jobs))
            thunkAPI.dispatch(updateTempJobIdArray(iniJobIdArray))
           }
           if(response.user.eduOption){
            thunkAPI.dispatch(updateIniEduOptId(response.user.eduOption._id))
            thunkAPI.dispatch(updateTempEduOptId(response.user.eduOption._id))
           }
           if(response.user.college){
            thunkAPI.dispatch(updateIniColl(response.user.college))
            thunkAPI.dispatch(updateIniCollId(response.user.college._id))
            thunkAPI.dispatch(updateTempColl(response.user.college))
            thunkAPI.dispatch(updateTempCollId(response.user.college._id))
           }
           if(response.user.height){
            thunkAPI.dispatch(updateIniHeight(response.user.height))
            thunkAPI.dispatch(updateTempHeight(response.user.height))
           }
           if(response.user.weight){
            thunkAPI.dispatch(updateIniHeight(response.user.weight))
            thunkAPI.dispatch(updateTempHeight(response.user.weight))
           }
           if(response.user.filter){
            thunkAPI.dispatch(updateIniFilter(response.user.filter))
            thunkAPI.dispatch(updateTempFilter(response.user.filter))
           }
           if(response.user._id){
            thunkAPI.dispatch(updateLastSeen(response?.user?._id))
           }
           thunkAPI.dispatch(fetchStats())
           return response
       }
       catch(error){
           return rejectWithValue("Đã xảy ra lỗi.")
       }
   }
)
export const loginUser = createAsyncThunk(
    "auth/login", 
   async(input, thunkAPI)=>{
       try {
           let response = await CustomAxios.post("/users/login2",input);

            response = response.data
            if(response.refreshToken){
                thunkAPI.dispatch(updateReFreshToken(response.refreshToken))
            }
            if(response.accessToken){
                thunkAPI.dispatch(updateAccessToken(response.accessToken))
            }
            if(response.user.name){
                thunkAPI.dispatch(updateIniName(response.user.name))
                thunkAPI.dispatch(updateTempName(response.user.name))
            }
            if(response.user.dob){
                thunkAPI.dispatch(updateIniDob(response.user.dob))
                thunkAPI.dispatch(updateTempDob(response.user.dob))
            }
            if(response.user.bio){
                thunkAPI.dispatch(updateIniBio(response.user.bio))
                thunkAPI.dispatch(updateTempBio(response.user.bio))
            }
            if(response.user.fans.length > 0){
                thunkAPI.dispatch(getFans(response.user.fans))
            }
            if(response.user.likedStrangers.length > 0){
                thunkAPI.dispatch(updateInitialLikedStrangers(response.user.likedStrangers))
            }
            if(response.user.chats.length > 0){
                thunkAPI.dispatch(getChats(response.user.chats))
            }
           if(response.user.datingCity) {
            thunkAPI.dispatch(fetchInitialStrangers({datingCityId: response.user.datingCity._id, userId: response.user._id}))

           }
           if(response?.user){
            thunkAPI.dispatch(updateUserInAuth(response.user))
           }

           if(response.user.messageNoti.length >0){
            thunkAPI.dispatch(updateInnitialMessageNoti(response.user.messageNoti))
           }
           if(response.user.noti.length >0){
            let newNotiCount = 0
            response.user.noti.map((noti)=>{
                if(!noti.isRead){
                    newNotiCount++
                }
            })
            if(newNotiCount > 0){
                thunkAPI.dispatch(updateNewNotiCount(newNotiCount))
            }
            thunkAPI.dispatch(updateInitialNoti(response.user.noti))
           }
           if(response.user.gender){
            thunkAPI.dispatch(updateInnitialGenderId(response.user.gender._id))
           }
           if(response.user.datingGoals?.length >0){
            let initialDatingGoalIdArray = []
            response.user.datingGoals?.map((datingGoal)=>{
                initialDatingGoalIdArray.push(datingGoal._id)
            })
            thunkAPI.dispatch(updateInitialDatingGoalIdArrayInAuth(initialDatingGoalIdArray))
           }
           if(response.user.datingGoals.length >0){
            let initialDatingGoalIdArray = []
            response.user.datingGoals.map((datingGoal)=>{
                initialDatingGoalIdArray.push(datingGoal._id)
            })
            thunkAPI.dispatch(updateInitialDatingGoalIdArrayInAuth(initialDatingGoalIdArray))
           }
           if(response.user.hobbies.length >0){
            let initialHobbyIdArray = []
            response.user.hobbies.map((hobby)=>{
                initialHobbyIdArray.push(hobby._id)
            })
            thunkAPI.dispatch(updateInitialHobbyIdArrayInAuth(initialHobbyIdArray))
            thunkAPI.dispatch(updateInitialHobbies(response.user.hobbies))
            thunkAPI.dispatch(updateTempHobbies(response.user.hobbies))
            thunkAPI.dispatch(updateTempHobbyIdArray(initialHobbyIdArray))
           }
           if(response.user.kidOption){
            thunkAPI.dispatch(updateIniKidOptId(response.user.kidOption._id))
            thunkAPI.dispatch(updateTempKidOptId(response.user.kidOption._id))
           }
           if(response.user.smokingOption){
            thunkAPI.dispatch(updateIniSmokingOptId(response.user.smokingOption._id))
            thunkAPI.dispatch(updateTempSmokingOptId(response.user.smokingOption._id))
           }
           if(response.user.drinkingOption){
            thunkAPI.dispatch(updateIniDrinkingOptId(response.user.drinkingOption._id))
            thunkAPI.dispatch(updateTempDrinkingOptId(response.user.drinkingOption._id))
           }
           if(response.user.jobs.length >0){
            let iniJobIdArray = []
            response.user.jobs.map((job)=>{
                iniJobIdArray.push(job._id)
            })
            thunkAPI.dispatch(updateIniJobIdArray(iniJobIdArray))
            thunkAPI.dispatch(updateIniJobs(response.user.jobs))
            thunkAPI.dispatch(updateTempJobs(response.user.jobs))
            thunkAPI.dispatch(updateTempJobIdArray(iniJobIdArray))
           }
           if(response.user.eduOption){
            thunkAPI.dispatch(updateIniEduOptId(response.user.eduOption._id))
            thunkAPI.dispatch(updateTempEduOptId(response.user.eduOption._id))
           }
           if(response.user.college){
            thunkAPI.dispatch(updateIniColl(response.user.college))
            thunkAPI.dispatch(updateIniCollId(response.user.college._id))
            thunkAPI.dispatch(updateTempColl(response.user.college))
            thunkAPI.dispatch(updateTempCollId(response.user.college._id))
           }
           if(response.user.height){
            thunkAPI.dispatch(updateIniHeight(response.user.height))
            thunkAPI.dispatch(updateTempHeight(response.user.height))
           }
           if(response.user.weight){
            thunkAPI.dispatch(updateIniHeight(response.user.weight))
            thunkAPI.dispatch(updateTempHeight(response.user.weight))
           }
           if(response.user.filter){
            thunkAPI.dispatch(updateIniFilter(response.user.filter))
            thunkAPI.dispatch(updateTempFilter(response.user.filter))
           }
           if(response.user._id){
            thunkAPI.dispatch(updateLastSeen(response?.user?._id))
           }
           thunkAPI.dispatch(updateChatBgImg(getBgImg()))
           return response
       }
       catch(error){
        thunkAPI.dispatch(removeLoader())
        if(error.response.status == 400){
            return thunkAPI.rejectWithValue(error.response.data.errMsg)
        }else{
            return thunkAPI.rejectWithValue(error.response.data.errMsg)
        }
       }
   }
)
export const changeName = createAsyncThunk(
    "changeName",
    async(input)=>{
        try{
            const response = await CustomAxios.post(`/profile/change-name`, input);
            return response.data
        }catch(error){
            return rejectWithValue("Đã xảy ra lỗi.")
        }
    }
)
export const updateLastSeen = createAsyncThunk(
    "auth/updateLastSeen",
    async(userId, thunkAPI)=>{
        console.log(userId)
        const lastSeen  = Date.now()
        try{
            const response = await CustomAxios.post(`/profile/update-last-seen`, {userId, lastSeen});
            return response.data.lastSeen
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data.errMsg)
        }
    }
)
export const updateNotiAsRead = createAsyncThunk(
    "auth/updateNotiAsRead", 
    async(notiId, thunkAPI)=>{

        try{
            thunkAPI.dispatch(callLoader())
            let response = await CustomAxios.post(`/home/update-noti-as-read`,{notiId})
            thunkAPI.dispatch(removeLoader())
            const newNotiArr =  thunkAPI.getState().auth.user.noti.map((noti)=>{
                        if(noti._id === response.data.noti._id){
                          return  noti = response.data.noti
                        }
                    })
            return newNotiArr

        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)
export const saveProfImg = createAsyncThunk(
    "auth/saveProfImg",
    async(input, thunkAPI)=>{
        for (var pair of input.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }
        try{
            thunkAPI.dispatch(callLoader())
            let response = await AxiosForFormData.post(`/profile/save-profile-image`, input)
            console.log(response)
            if (response.status == 200){
                thunkAPI.dispatch(removeLoader())
                thunkAPI.dispatch(showOffCanvasDisabledConfirmBtn())
                thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                    alertVariant: "success",
                    alertText: `Đã cập nhật ảnh đại diện`
                }))
                console.log(response.data)
                  return response?.data?.profileImage
            }
           
          }catch(error){
            console.log(error)
            thunkAPI.dispatch(removeLoader())
            thunkAPI.dispatch(showOffCanvasDisabledConfirmBtn())
            if(error.response.status == 404){
                thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                    alertVariant: "danger",
                    alertText: "Lỗi ứng dụng"
                }))
            }
            if(error.response.status == 500){
                thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                    alertVariant: "danger",
                    alertText: error.response.data.errMsg
                }))
            }
            if(error.response.status == 400){
                thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                    alertVariant: "danger",
                    alertText: error.response.data.errMsg
                }))
            }
            if(error.response.status == 403){
                thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                    alertVariant: "danger",
                    alertText: error.response.data.errMsg
                }))
            }
            thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                alertVariant: "danger",
                alertText: error.response.data.errMsg
            }))
            return thunkAPI.rejectWithValue(error.response.data.errMsg)
          }
    }
)
export const saveGalImages = createAsyncThunk(
    "auth/saveGalImages",
    async(input, thunkAPI)=>{
        try{
            thunkAPI.dispatch(callLoader())
            const response = await AxiosForFormData.post(`/profile/save-gal-images`, input)
            if (response.status == 200){
                thunkAPI.dispatch(removeLoader())
                thunkAPI.dispatch(showOffCanvasDisabledConfirmBtn())
                thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                    alertVariant: "success",
                    alertText: `Đã cập nhật ảnh bộ sưu tập`
                }))
                  return response?.data?.galImages
            }
          }catch(error){
            console.log(error)
            thunkAPI.dispatch(removeLoader())
            thunkAPI.dispatch(showOffCanvasDisabledConfirmBtn())
            if(error.response.status == 404){
                thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                    alertVariant: "danger",
                    alertText: "Lỗi ứng dụng"
                }))
            }
            if(error.response.status == 500){
                thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                    alertVariant: "danger",
                    alertText: error.response.data.errMsg
                }))
            }
            if(error.response.status == 400){
                thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                    alertVariant: "danger",
                    alertText: error.response.data.errMsg
                }))
            }
            if(error.response.status == 403){
                thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                    alertVariant: "danger",
                    alertText: error.response.data.errMsg
                }))
            }
            thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                alertVariant: "danger",
                alertText: error.response.data.errMsg
            }))
            return thunkAPI.rejectWithValue(error.response.data.errMsg)
          }
    }
)
export const saveName = createAsyncThunk(
    "saveName",
    async(input, thunkAPI)=>{
        try{
            const response = await CustomAxios.post(`/profile/save-name`, {userId: input.userId, name: input.name});
            if(response.data.status = "success"){
                thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                    alertVariant: "success",
                    alertText: `Đã đổi tên thành ${response.data.values.name}`
                }))
                return response.data.values.name
            }
            
        }catch(error){
            thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                alertVariant: "danger",
                alertText: "Không thể cập nhật"
             }))
            return rejectWithValue("Đã xảy ra lỗi.")
        }
    }
)
export const saveDob = createAsyncThunk(
    "auth/saveDob",
    async(input, thunkAPI)=>{
        try{
            thunkAPI.dispatch(callLoader())
            const response = await CustomAxios.post(`/profile/save-dob`, input);
            thunkAPI.dispatch(removeLoader())
            thunkAPI.dispatch(showOffCanvasDisabledConfirmBtn())
            let formatedDob
            if(response.data.dob){
                formatedDob = lightFormat(new Date(response.data.dob), 'dd-MM-yyyy')
            }
                thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                    alertVariant: "success",
                    alertText: `Đã lưu ngày sinh ${formatedDob}`
                }))
                return response.data.dob
        }catch(error){
            thunkAPI.dispatch(removeLoader())
            thunkAPI.dispatch(showOffCanvasDisabledConfirmBtn())
            thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                alertVariant: "danger",
                alertText: error.response.data.errMsg
             }))
            return thunkAPI.rejectWithValue(error.response.data.errMsg)
        }
    }
)
export const saveBio = createAsyncThunk(
    "auth/saveBio",
    async(input, thunkAPI)=>{
        thunkAPI.dispatch(callLoader())
        try{
            const response = await CustomAxios.post(`/profile/save-bio`, {userId: input.userId, bio: input.bio});
            thunkAPI.dispatch(removeLoader())
            if(response?.data.success){
                thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                    alertVariant: "success",
                    alertText: `Đã cập nhật phần giới thiệu`
                }))
                return response?.data.data.bio
            }else{
                return thunkAPI.rejectWithValue(response?.data.data.errMsg)
            }
        }catch(error){
            thunkAPI.dispatch(removeLoader())
            thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                alertVariant: "danger",
                alertText: "Lỗi hệ thống."
             }))
        }
    }
)
export const saveDatingCity = createAsyncThunk(
    "saveDatingCity",
    async(input, thunkAPI)=>{
        try{
            const state = thunkAPI.getState()
            const userId = state.auth.user._id
            const response = await CustomAxios.post(`/profile/save-dating-city`, input);
            thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                alertVariant: "success",
                alertText: `Đã thay đổi địa điểm hẹn hò thành ${response.data.name}.`
             }))
             thunkAPI.dispatch(fetchInitialStrangers({datingCityId: response.data._id, userId: userId}))
             thunkAPI.dispatch(updateDCityId_Filter(response.data._id))
             thunkAPI.dispatch(updateDCityId_tempFilter(response.data._id))
             thunkAPI.dispatch(saveDCityId_Filter({userId: userId, dCityId:response.data._id}))
             thunkAPI.dispatch(updateIniDCityId(response.data._id))
             thunkAPI.dispatch(updateNewDatingCity(response.data._id))
             return response.data
        }catch(error){
            return rejectWithValue("Đã xảy ra lỗi.")
        }
    }
)
export const saveHomeCity = createAsyncThunk(
    "auth/saveHomeCity",
    async(input, thunkAPI)=>{
        thunkAPI.dispatch(callLoader())
        try{
            const response = await CustomAxios.post(`/profile/save-home-city`, input);
            thunkAPI.dispatch(removeLoader())
            if(response.data.success){
                thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                    alertVariant: "success",
                    alertText: `Đã thay đổi quê quán thành ${response.data.values.homeCity.name}.`
                 }))

                 return response.data.values.homeCity
            }else{
                thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                    alertVariant: "warning",
                    alertText: response.data.errMsg
                 }))
                return thunkAPI.rejectWithValue(response.data.errMsg)
            }
        }catch(error){
            thunkAPI.dispatch(removeLoader())
        }
    }
)
export const saveGender = createAsyncThunk(
    "auth/saveGender",
    async(genderId, thunkAPI)=>{
        thunkAPI.dispatch(startLoadingStatus())
        try{
            const state = thunkAPI.getState()
            const userId = state.auth.user._id
            const response = await CustomAxios.post(`/profile/save-gender`, {userId: userId, genderId: genderId});
            thunkAPI.dispatch(stopLoadingStatus())
            thunkAPI.dispatch(updateInnitialGenderId(response.data._id))
            thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                alertVariant: "success",
                alertText: `Đã thay đổi giới tính thành ${response.data.name}.`
             }))
             return response.data
        }catch(error){
            thunkAPI.dispatch(stopLoadingStatus())
            thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                alertVariant: "danger",
                alertText: "Không thể cập nhật giới tính"
             }))
            return rejectWithValue("Đã xảy ra lỗi.")
        }
    }
)

export const saveDatingGoals = createAsyncThunk(
    "auth/saveDatingGoals",
    async(input,thunkAPI)=>{
        try{
            const state = thunkAPI.getState()
            const userId = state.auth.user._id
            const tempDatingGoalIdArray = state.auth.tempDatingGoalIdArray
            const response = await CustomAxios.post(`/profile/save-dating-goals`, {userId: userId, datingGoals: tempDatingGoalIdArray});
            thunkAPI.dispatch(stopLoadingStatus())
            if(response.data.length >0){
                let initialDatingGoalIdArray = []
                response.data.map((datingGoal)=>{
                    initialDatingGoalIdArray.push(datingGoal._id)
                })
                thunkAPI.dispatch(updateInitialDatingGoalIdArrayInAuth(initialDatingGoalIdArray))
            }else{
                thunkAPI.dispatch(updateInitialDatingGoalIdArrayInAuth([]))
            }

            thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                alertVariant: "success",
                alertText: `Đã lưu ${response.data.length} mục tiêu hẹn hò `
             }))
             return response.data
        }catch(error){
            thunkAPI.dispatch(stopLoadingStatus())
            thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                alertVariant: "danger",
                alertText: "Không thể cập nhật"
             }))
            return rejectWithValue("Đã xảy ra lỗi.")
        }
    }
)
export const saveLikedStrangers = createAsyncThunk(
    "saveLikedStrangers",
    async(strangerId, thunkAPI)=>{
        try{
            thunkAPI.dispatch(callLoader())
            const state = thunkAPI.getState()
            const userId = state.auth.user._id

            const response = await CustomAxios.post(`/profile/save-liked-strangers`, {userId, strangerId});
            thunkAPI.dispatch(removeLoader())
            thunkAPI.dispatch(showInfoOffCanvas({
                title: "Thành công",
                body: `Đã gửi tim.`
             }))
            return response.data
        }catch(error){
            thunkAPI.dispatch(removeLoader())
            thunkAPI.dispatch(showInfoOffCanvas({
                title: "Lỗi",
                body: error.response.data.errMsg
             }))
            return thunkAPI.rejectWithValue(error.response.data.errMsg)
        }
    }
)
export const removeLikedStranger = createAsyncThunk(
    "removeLikedStranger",
    async(strangerId, thunkAPI)=>{

        try{
            thunkAPI.dispatch(hideBtn())
            thunkAPI.dispatch(callLoader())
            const state = thunkAPI.getState()
            const userId = state.auth.user._id
            const response = await CustomAxios.post(`/profile/remove-liked-stranger`, {userId: userId, strangerId: strangerId});
            thunkAPI.dispatch(removeLoader())
            thunkAPI.dispatch(showTxtMoSuccessMsg({
                msg: "Đã hủy gửi tim"
             }))
            return response.data.strangerId
        }catch(error){
            thunkAPI.dispatch(removeLoader())
            thunkAPI.dispatch(hideBtn())
            thunkAPI.dispatch(showTxtMErrMsg({
                msg: "Không thể thực hiện"
             }))
            return thunkAPI.rejectWithValue(error.response.data.errMsg)
        }
    }
)
export const removeFan = createAsyncThunk(
    "auth/removeFan",
    async(strangerId, thunkAPI)=>{

        try{
            thunkAPI.dispatch(hideBtn())
            thunkAPI.dispatch(callLoader())
            const userId = thunkAPI.getState().auth.user._id
            const response = await CustomAxios.post(`/profile/remove-fan`, {userId, strangerId});
            thunkAPI.dispatch(removeLoader())
            thunkAPI.dispatch(showPgMdSuccessAlert({
                text: "Đã xóa người dùng này khỏi danh sách"
             }))
            return response.data
        }catch(error){
            thunkAPI.dispatch(removeLoader())
            thunkAPI.dispatch(showPgMdErrorAlert({
                text: error.response.data.errMsg
             }))
            return thunkAPI.rejectWithValue(error.response.data.errMsg)
        }
    }
)
export const createChat = createAsyncThunk(
    "createChat",
    async(input, thunkAPI)=>{
        const state = thunkAPI.getState()
        const userId = state.auth.user._id
        const strangerId = input
        try{
            const response  = await CustomAxios.post(`/chats/create-chat`, {userId: userId, strangerId: strangerId})
            if(!state.auth.user.chats.includes(response.data._id)){
                thunkAPI.dispatch(addChats(response.data))
            }
            return response.data
        }catch(error){
            return rejectWithValue("Đã xảy ra lỗi.")
        }
    }
)
export const createMatch = createAsyncThunk(
    "auth/createMatch",
    async(input, thunkAPI)=>{
        const state = thunkAPI.getState()
        const userId = state.auth.user._id
        try{
            const response  = await CustomAxios.post(`/chats/create-match`, {userId: userId, strangerId: input})
            return response.data
        }catch(error){
            console.log(error)
            thunkAPI.dispatch(showInfoOffCanvas({
                title: "Không thể thực hiện",
                body: err.response.data.errMsg
             }))
            return thunkAPI.rejectWithValue("Đã xảy ra lỗi.")
        }
    }
)
export const removeMatch = createAsyncThunk(
    "auth/removeMatch",
    async(input, thunkAPI)=>{
        const state = thunkAPI.getState()
        const userId = state.auth.user._id
        try{
            thunkAPI.dispatch(hideBtn())
            thunkAPI.dispatch(callLoader())
            const response  = await CustomAxios.post(`/chats/remove-match`, {userId: userId, strangerId: input})
            thunkAPI.dispatch(removeLoader())
            const chats = thunkAPI.getState().auth.user.chats
            const matches = thunkAPI.getState().auth.user.matches
            const updatedChats = chats.filter(chatId => chatId !== response.data.chatId)
            const updatedMatches = matches.filter(userId => userId !== response.data.strangerId)
            return {updatedChats, updatedMatches, noti: response.data.noti}
        }catch(error){
            thunkAPI.dispatch(removeLoader())
            console.log(error)
            thunkAPI.dispatch(showInfoOffCanvas({
                title: "Không thể thực hiện",
                body: err.response.data.errMsg
             }))
            return thunkAPI.rejectWithValue("Đã xảy ra lỗi.")
        }
    }
)
export const removeGalImage = createAsyncThunk(
    "removeGalImage",
    async(input, thunkAPI)=>{
        thunkAPI.dispatch(callLoader())
        try{
            const response = await CustomAxios.post(`/profile/remove-gal-image`, input)
            thunkAPI.dispatch(removeLoader())
            thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                alertVariant: "success",
                alertText: `Đã xóa ảnh.`
             }))
            thunkAPI.dispatch(showOffCanvasDisabledConfirmBtn())
            return response.data.galImages
        }catch(error){
            thunkAPI.dispatch(removeLoader())
            if(error.response.status == 500){
                thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                    alertVariant: "danger",
                    alertText: error.response.errMsg
                 }))
                 thunkAPI.dispatch(showOffCanvasDisabledConfirmBtn())
                return thunkAPI.rejectWithValue(error.response.errMsg)
            }else{
                thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                    alertVariant: "danger",
                    alertText: "Lỗi hệ thống."
                 }))
                 thunkAPI.dispatch(showOffCanvasDisabledConfirmBtn())
                return thunkAPI.rejectWithValue("Lỗi hệ thống.")
            }
        }
    }
)
export const getCities = createAsyncThunk(
    "getCities",
    async()=>{
        try{
            const response = await CustomAxios.get(`/data/cities`);
            return response.data
        }catch(error){
            return rejectWithValue("Đã xảy ra lỗi.")
        }
    }
)
export const getHobbySearchResults = createAsyncThunk(
    "auth/getHobbySearchResults",
    async(query, thunkAPI)=>{
        if(query !== ""){
            try{
                const response = await CustomAxios.post(`/profile/search-hobbies`, {query: query})
                return response.data
            }catch(error){
                console.log(error)
            }
        }
    }
)
export const getJobSearchResults = createAsyncThunk(
    "auth/getJobSearchResults",
    async(query, thunkAPI)=>{
        if(query !== ""){
            try{
                const response = await CustomAxios.post(`/profile/search-jobs`, {query: query})
                return response.data
            }catch(error){
                console.log(error)
            }
        }
    }
)
export const saveHobbies = createAsyncThunk(
    "auth/saveHobbies", 
    async(input, thunkAPI)=>{
        try{
            let response = await CustomAxios.post(`/profile/save-hobbies`, {userId: input.userId, hobbyIdArray: input.hobbyIdArray})
            if(response.data.status  == "success"){
                if(response.data.values.hobbies.length > 0){
                    thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                        alertVariant: "success",
                        alertText: `Đã lưu ${response.data.values.hobbies.length} sở thích`
                     }))
                     return {hobbies: response.data.values.hobbies, hobbyIdArray: response.data.values.hobbyIdArray}
                }else if(response.data.values.hobbies.length == 0){
                    thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                        alertVariant: "success",
                        alertText: `Đã hủy lựa chọn sở thích.`
                     }))
                     return {hobbies: [], hobbyIdArray: []}
                }
            }
        }catch(error){
            thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                alertVariant: "danger",
                alertText: "Không thể cập nhật"
             }))
            console.log(error)
            return rejectWithValue("Đã xảy ra lỗi.")
        }
    }
)
export const saveJobs = createAsyncThunk(
    "auth/saveJobs", 
    async(input, thunkAPI)=>{
        try{
            const response = await CustomAxios.post(`/profile/save-jobs`, {userId: input.userId, jobIdArray: input.jobIdArray})
            
            if(response.data.status == "success"){
                 if(response.data.values.jobs.length == 0){
                    thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                        alertVariant: "success",
                        alertText: `Đã hủy lựa chọn nghề nghiệp`
                     }))
                    return { jobs: [],jobIdArray: []}
                 }else if(response.data.values.jobs.length > 0){
                    thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                        alertVariant: "success",
                        alertText: `Đã lưu ${response.data.values.jobs.length} nghề nghiệp`
                     }))
                    const jobs = response.data.values.jobs
                    const jobIdArray = response.data.values.jobIdArray
                    return {jobs, jobIdArray}
                 }
            }
        }catch(error){
            thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                alertVariant: "danger",
                alertText: "Không thể cập nhật"
             }))
            console.log(error)
            return rejectWithValue("Đã xảy ra lỗi.")
        }
    }
)
export const saveKidOption = createAsyncThunk(
    "auth/saveKidOption", 
    async(input, thunkAPI)=>{
        try{
            const response = await CustomAxios.post(`/profile/save-kid-option`, {userId: input.userId, kidOptId: input.kidOptId})
            if(response.data.status = "success"){
                thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                    alertVariant: "success",
                    alertText: `Đã cập nhật lựa chọn ${response.data.values.name}`
                 }))
                const kidOpt = response.data.values
                return kidOpt
            }
        }catch(error){
            thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                alertVariant: "danger",
                alertText: "Không thể cập nhật"
             }))
            console.log(error)
            return rejectWithValue("Đã xảy ra lỗi.")
        }
    }
)
export const saveSmokingOption = createAsyncThunk(
    "auth/saveSmokingOption", 
    async(input, thunkAPI)=>{
        try{
            const response = await CustomAxios.post(`/profile/save-smoking-option`, {userId: input.userId, smokingOptId: input.smokingOptId})
            if(response.data.status = "success"){
                thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                    alertVariant: "success",
                    alertText: `Đã cập nhật lựa chọn ${response.data.values.name}`
                 }))
                const smokingOpt = response.data.values
                return smokingOpt
            }
        }catch(error){
            thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                alertVariant: "danger",
                alertText: "Không thể cập nhật"
             }))
            console.log(error)
            return rejectWithValue("Đã xảy ra lỗi.")
        }
    }
)
export const saveDrinkingOption = createAsyncThunk(
    "auth/saveDrinkingOption", 
    async(input, thunkAPI)=>{
        try{
            const response = await CustomAxios.post(`/profile/save-drinking-option`, {userId: input.userId, drinkingOptId: input.drinkingOptId})
            if(response.data.status = "success"){
                thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                    alertVariant: "success",
                    alertText: `Đã cập nhật lựa chọn ${response.data.values.name}`
                 }))
                const drinkingOpt = response.data.values
                return drinkingOpt
            }
        }catch(error){
            thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                alertVariant: "danger",
                alertText: "Không thể cập nhật"
             }))
            console.log(error)
            return rejectWithValue("Đã xảy ra lỗi.")
        }
    }
)
export const saveEduOption = createAsyncThunk(
    "auth/saveEduOption", 
    async(input, thunkAPI)=>{
        try{
            const response = await CustomAxios.post(`/profile/save-edu-option`, {userId: input.userId, eduOptId: input.eduOptId})
            if(response.status = "success"){
                thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                    alertVariant: "success",
                    alertText: `Đã cập nhật lựa chọn ${response.data.values.eduOpt.name}`
                 }))
                const eduOpt = response.data.values.eduOpt
                return eduOpt
            }
        }catch(error){
            thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                alertVariant: "danger",
                alertText: "Không thể cập nhật"
             }))
            console.log(error)
            return rejectWithValue("Đã xảy ra lỗi.")
        }
    }
)
export const getCollegeSearchResults = createAsyncThunk(
    "auth/getCollegeSearchResults",
    async(query, thunkAPI)=>{
        if(query !== ""){
            try{
                const response = await CustomAxios.post(`/profile/search-colleges`, {query: query})
                return response.data
            }catch(error){
                console.log(error)
            }
        }
    }
)
export const saveCollegeOption = createAsyncThunk(
    "auth/saveCollege", 
    async(input, thunkAPI)=>{
        try{
            const response = await CustomAxios.post(`/profile/save-college-option`, {userId: input.userId, collId: input.collId})
            if(response.data.status == "success"){
                if(response.data.values.coll){
                    thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                        alertVariant: "success",
                        alertText: `Đã cập nhật lựa chọn ${response.data.values.coll.name}`
                     }))
                    const coll = response.data.values.coll
                    return {coll: coll, collId: coll._id}
                }else{
                    thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                        alertVariant: "success",
                        alertText: `Đã hủy lựa chọn trường.`
                     }))
                    return {coll: null, collId: null}
                }
                
            }
        }catch(error){
            thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                alertVariant: "danger",
                alertText: "Không thể cập nhật"
             }))
            console.log(error)
            return rejectWithValue("Đã xảy ra lỗi.")
        }
    }
)
export const sendMail = createAsyncThunk(
    "auth/sendMail", 
    async()=>{
        try{
          response =   await CustomAxios.get(`/profile/send-mail`)
        }catch(error){
            console.log(error)
        }
    }
)
export const saveHeight = createAsyncThunk(
    "auth/saveHeight",
    async(input, thunkAPI)=>{
        thunkAPI.dispatch(callLoader())
        try{
            const response = await CustomAxios.post(`/profile/save-height`, input);
            thunkAPI.dispatch(removeLoader())
            if(response.data.success){
                thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                    alertVariant: "success",
                    alertText: `Đã thay đổi chiều cao thành ${response.data.values.height} cm.`
                 }))
                 return response.data.values.height
            }else{
                thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                    alertVariant: "warning",
                    alertText: response.data.errMsg
                 }))
                return thunkAPI.rejectWithValue(response.data.errMsg)
            }
        }catch(error){
            thunkAPI.dispatch(removeLoader())
        }
    }
)
export const saveWeight = createAsyncThunk(
    "auth/saveWeight",
    async(input, thunkAPI)=>{
        thunkAPI.dispatch(callLoader())
        try{
            const response = await CustomAxios.post(`/profile/save-weight`, input);
            thunkAPI.dispatch(removeLoader())
            if(response.data.success){
                thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                    alertVariant: "success",
                    alertText: `Đã thay đổi cân nặng thành ${response.data.values.weight} kg.`
                 }))
                 return response.data.values.weight
            }else{
                thunkAPI.dispatch(showOffCanvasAlertWithExternalData({
                    alertVariant: "warning",
                    alertText: response.data.errMsg
                 }))
                return thunkAPI.rejectWithValue(response.data.errMsg)
            }
        }catch(error){
            thunkAPI.dispatch(removeLoader())
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        startAppLoadingStatus(state, action){
            state.appStatus = "loading"
        },
        stopAppLoadingStatus(state, action){
            state.appStatus = ""
        },
        updateRegisterInfo(state, action){
            state.registerInfo = action.payload
        },
        updateLoginInfo(state, action){
            state.loginInfo = action.payload
        },
        updateUserInAuth(state,action){
            state.user = action.payload
        },
        updateUserProfileImage(state, action){
            state.user = {...state.user, profileImage: action.payload}
        },
        addUserGalImages(state, action){
            state.user = {...state.user, galImages: action.payload}
        },
        updateGalImage(state, action){
            state.user = {...state.user, galImages: action.payload}
        },
        updateIniDCityId(state, action){
            state.IniDCityId = action.payload
        },
        updateNewDatingCity(state, action){
            state.newDatingCityId = action.payload
        },
        updateNewHomeCityId(state, action){
            state.newHomeCityId = action.payload
        },
        updateUserName(state, action){
            state.newName = action.payload
        },
        updateUserForChat(state,action){
        },
        getMessageNoti(state,action){
            state.user = {...state.user, messageNoti: action.payload}
        },
        updateInitialDatingGoalIdArrayInAuth(state,action){
            state.initialDatingGoalIdArray = action.payload
        },
        addToTempDatingGoalIdArray: (state, action)=>{
            state.tempDatingGoalIdArray= [...state.tempDatingGoalIdArray, action.payload]
        },
        removeFromTempDatingGoalIdArray: (state, action)=>{
            state.tempDatingGoalIdArray= state.tempDatingGoalIdArray.filter((id)=> id!==action.payload)
        },
        resetTempDatingGoalIdArray(state,action){
            state.tempDatingGoalIdArray = action.payload
        },
        updateInitialHobbyIdArrayInAuth(state,action){
            state.initialHobbyIdArray = action.payload
        },
        updateInitialHobbies(state,action){
            state.initialHobbies = action.payload
        },
        addToTempHobbyIdArray: (state, action)=>{
            state.tempHobbyIdArray= [...state.tempHobbyIdArray, action.payload]
        },
        removeFromTempHobbyIdArray: (state, action)=>{
            state.tempHobbyIdArray= state.tempHobbyIdArray.filter((id)=> id!==action.payload)
        },
        updateTempHobbies: (state, action)=>{
            state.tempHobbies= action.payload
        },
        updateTempHobbyIdArray: (state, action)=>{
            state.tempHobbyIdArray= action.payload
        },
        addToTempHobbies: (state, action)=>{
            state.tempHobbies= [...state.tempHobbies, action.payload]
        },
        removeFromTempHobbies: (state, action)=>{
            state.tempHobbies= state.tempHobbies.filter((hobby)=> hobby._id!==action.payload)
        },
        resetTempHobbies(state,action){
            state.tempHobbies = action.payload
        },
        resetTempHobbyIdArray(state,action){
            state.tempHobbyIdArray = action.payload
        },
        resetHobbySearchResults(state,action){
            state.hobbySearchResults = action.payload
        },
        updateHobbySearchResults(state,action){
            state.hobbySearchResults = action.payload
        },
        updateIniKidOptId(state,action){
            state.iniKidOptId = action.payload
        },
        updateTempKidOptId(state,action){
            state.tempKidOptId = action.payload
        },
        resetTempKidOptId(state,action){
            state.tempKidOptId = action.payload
        },
        updateIniSmokingOptId(state,action){
            state.iniSmokingOptId = action.payload
        },
        updateTempSmokingOptId(state,action){
            state.tempSmokingOptId = action.payload
        },
        resetTempSmokingOptId(state,action){
            state.tempSmokingOptId = action.payload
        },
        updateIniDrinkingOptId(state,action){
            state.iniDrinkingOptId = action.payload
        },
        updateTempDrinkingOptId(state,action){
            state.tempDrinkingOptId = action.payload
        },
        resetTempDrinkingOptId(state,action){
            state.tempDrinkingOptId = action.payload
        },
        updateIniJobs(state,action){
            state.iniJobs = action.payload
        },
        updateTempJobs: (state, action)=>{
            state.tempJobs= action.payload
        },
        updateIniJobIdArray(state,action){
            state.iniJobIdArray = action.payload
        },
        updateTempJobIdArray: (state, action)=>{
            state.tempJobIdArray= action.payload
        },
        addToTempJobs: (state, action)=>{
            state.tempJobs= [...state.tempJobs, action.payload]
        },
        removeFromTempJobs: (state, action)=>{
            state.tempJobs= state.tempJobs.filter((job)=> job._id!==action.payload)
        },
        addToTempJobIdArray: (state, action)=>{
            state.tempJobIdArray= [...state.tempJobIdArray, action.payload]
        },
        removeFromTempJobIdArray: (state, action)=>{
            state.tempJobIdArray= state.tempJobIdArray.filter((id)=> id!==action.payload)
        },
        resetTempJobs(state,action){
            state.tempJobs = action.payload
        },
        resetTempJobIdArray(state,action){
            state.tempJobIdArray = action.payload
        },
        resetJobSearchResults(state,action){
            state.jobSearchResults = action.payload
        },
        updateJobSearchResults(state,action){
            state.jobSearchResults = action.payload
        },
        updateIniEduOptId(state,action){
            state.iniEduOptId = action.payload
        },
        updateTempEduOptId(state,action){
            state.tempEduOptId = action.payload
        },
        resetTempEduOptId(state,action){
            state.tempEduOptId = action.payload
        },
        updateIniColl(state,action){
            state.iniColl = action.payload
        },
        updateIniCollId(state,action){
            state.iniCollId = action.payload
        },
        updateTempColl(state,action){
            state.tempColl = action.payload
        },
        updateTempCollId(state,action){
            state.tempCollId = action.payload
        },
        resetTempColl(state,action){
            state.tempColl = action.payload
        },
        resetTempCollId(state,action){
            state.tempCollId = action.payload
        },
        resetCollegeSearchResults(state,action){
            state.collegeSearchResults = action.payload
        },
        updateIniName(state,action){
            state.iniName = action.payload
        },
        updateTempName(state,action){
            state.tempName = action.payload
        },
        updateIniBio(state,action){
            state.iniBio = action.payload
        },
        updateTempBio(state,action){
            state.tempBio = action.payload
        },
        resetTempBio(state,action){
            state.tempBio = action.payload
        },
        resetTempName(state,action){
            state.tempName = action.payload
        },
        updateIniHeight(state,action){
            state.iniHeight = action.payload
        },
        updateTempHeight(state,action){
            state.tempHeight = action.payload
        },
        resetTempHeight(state,action){
            state.tempHeight = action.payload
        },
        updateIniWeight(state,action){
            state.tempHeight = action.payload
        },
        updateTempWeight(state,action){
            state.tempWeight = action.payload
        },
        resetTempWeight(state,action){
            state.tempWeight = action.payload
        },
        updateTempRemovedGalImgId(state,action){
            state.tempRemovedGalImgId = action.payload
        },
        resetTempRemovedGalImgId(state,action){
            state.tempRemovedGalImgId = action.payload
        },
        updateReFreshToken(state,action){
            state.refreshToken = action.payload
        },
        updateAccessToken(state,action){
            state.accessToken = action.payload
        },
        updateTempProfImg(state,action){
            state.tempProfImg = action.payload
        },
        resetTempProImg(state,action){
            state.tempProfImg = action.payload
        },
        updateTempGalImages(state,action){
            state.tempGalImages = action.payload
        },
        resetTempGalImages(state,action){
            state.tempGalImages = []
        },
        updateIniDob(state,action){
            state.iniDob = action.payload
        },
        updateTempDob(state,action){
            state.tempDob = action.payload
        },
        updateUserNoti(state,action){
            state.user = {...state.user, noti: [...state.user.noti, action.payload._id]}
        },
        addMessageNoti(state,action){
            state.user = {...state.user, messageNoti: [...state.user.messageNoti, action.payload]}
        },
        resetLogin(state,action){
            state.loginInfo = {...state.loginInfo, email: null, password: null}
            state.loginStatus = {...state.loginStatus, status: null, errMsg: null}
        },
        logoutUser(state, action){
            return initialState
        }
    },
    extraReducers: (builder)=> {
        builder
        .addCase(registerUser.pending, (state, action)=> {
            state.status = "loading"
        })
        .addCase(registerUser.fulfilled, (state, action)=> {
            state.status = "success"
            state.user = action.payload.data.user
            state.registerStatus = {...state.registerStatus, status: action.payload.status, errorMessage: action.payload.data.error}
        })
        .addCase(registerUser.rejected, (state, action)=> {
            state.status = "failed"
        })
        //login
        .addCase(loginUser.pending, (state, action)=> {
            state.status = "loading"
        })
        .addCase(loginUser.fulfilled, (state, action)=> {
            state.status = "success"
            state.user = action.payload.user
        })
        .addCase(loginUser.rejected, (state, action)=> {
            state.loginStatus = {...state.loginStatus, status: "failed", errMsg: action.payload}
        })
        .addCase(changeName.pending, (state,action)=>{
            state.status = "loading"
        })
        .addCase(changeName.fulfilled, (state, action)=> {
            state.status = "success"
            state.user = {...state.user, name: action.payload}
        })
        .addCase(changeName.rejected, (state, action)=> {
            state.status = "failed"
        })
        .addCase(removeGalImage.fulfilled, (state, action)=> {
            state.status = "success"
            state.user = {...state.user, galImages: action.payload}
        })
        .addCase(removeGalImage.rejected, (state, action)=> {
            state.status = "failed"
        })
        .addCase(getCities.pending, (state,action)=>{
            state.status = "loading"
        })
        .addCase(getCities.fulfilled, (state, action)=> {
            state.status = "success"
            state.cities = action.payload
        })
        .addCase(getCities.rejected, (state, action)=> {
            state.status = "failed"
        })
        .addCase(saveDatingCity.pending, (state,action)=>{
            state.status = "loading"
        })
        .addCase(saveDatingCity.fulfilled, (state, action)=> {
            state.status = "success"
            state.user = {...state.user, datingCity: action.payload}
        })
        .addCase(saveDatingCity.rejected, (state, action)=> {
            state.status = "failed"
        })
        .addCase(saveHomeCity.fulfilled, (state, action)=> {
            state.user = {...state.user, homeCity: action.payload}
        })
        .addCase(saveLikedStrangers.pending, (state,action)=>{
            state.status = "loading"
        })
        .addCase(saveLikedStrangers.fulfilled, (state, action)=> {
            state.status = "success",
            state.user = {...state.user, likedStrangers: action.payload.likedStrangers, lastSeen: action.payload.lastSeen}
        })
        .addCase(removeLikedStranger.pending, (state,action)=>{
            state.status = "loading"
        })
        .addCase(removeLikedStranger.fulfilled, (state, action)=> {
            state.status = "success",
            state.user = {...state.user, likedStrangers: state.user.likedStrangers.filter((user)=>user._id!==action.payload)}
        })
        .addCase(removeLikedStranger.rejected, (state, action)=> {
            state.status = "failed"
        })
        .addCase(createChat.pending, (state,action)=>{
            state.status = "loading"
        })
        .addCase(createChat.fulfilled, (state, action)=> {
            state.status = "success",
            state.user = {...state.user, chats: [...state.user.chats, action.payload._id]}
        })
        .addCase(createChat.rejected, (state, action)=> {
            state.status = "failed"
        })
        .addCase(saveGender.pending, (state,action)=>{
            state.status = "loading"
        })
        .addCase(saveGender.fulfilled, (state, action)=> {
            state.status = "success",
            state.user = {...state.user, gender:   action.payload}
        })
        .addCase(saveGender.rejected, (state, action)=> {
            state.status = "failed"
        })
        .addCase(saveDatingGoals.pending, (state,action)=>{
            state.status = "loading"
        })
        .addCase(saveDatingGoals.fulfilled, (state, action)=> {
            state.status = "success",
            state.user = {...state.user, datingGoals:   action.payload}
        })
        .addCase(saveDatingGoals.rejected, (state, action)=> {
            state.status = "failed"
        })
        .addCase(getHobbySearchResults.pending, (state,action)=>{
            state.status = "loading"
        })
        .addCase(getHobbySearchResults.fulfilled, (state, action)=> {
            state.status = "success"
            state.hobbySearchResults = action.payload
        })
        .addCase(getHobbySearchResults.rejected, (state, action)=> {
            state.status = "failed"
        })
        .addCase(saveHobbies.pending, (state,action)=>{
            state.status = "loading"
            state.appStatus = "loading"
        })
        .addCase(saveHobbies.fulfilled, (state, action)=> {
            state.appStatus = ""
            state.status = "success"
            state.initialHobbies = action.payload.hobbies
            state.initialHobbyIdArray = action.payload.hobbyIdArray
            state.tempHobbies = action.payload.hobbies
            state.tempHobbyIdArray = action.payload.hobbyIdArray
            state.user = {...state.user, hobbies:   action.payload.hobbies}
        })
        .addCase(saveHobbies.rejected, (state, action)=> {
            state.status = "failed"
        })
        .addCase(saveKidOption.pending, (state,action)=>{
            state.status = "loading"
            state.appStatus = "loading"
        })
        .addCase(saveKidOption.fulfilled, (state, action)=> {
            state.appStatus = ""
            state.iniKidOptId = action.payload._id
            state.tempKidOptId = action.payload._id
            state.user = {...state.user, kidOption:   action.payload}
        })
        .addCase(saveKidOption.rejected, (state, action)=> {
            state.status = "failed"
            state.appStatus = ""
        })
        .addCase(saveSmokingOption.pending, (state,action)=>{
            state.status = "loading"
            state.appStatus = "loading"
        })
        .addCase(saveSmokingOption.fulfilled, (state, action)=> {
            state.appStatus = ""
            state.iniSmokingOptId = action.payload._id
            state.tempSmokingOptId = action.payload._id
            state.user = {...state.user, smokingOption:   action.payload}
        })
        .addCase(saveSmokingOption.rejected, (state, action)=> {
            state.status = "failed"
            state.appStatus = ""
        })
        .addCase(saveDrinkingOption.pending, (state,action)=>{
            state.status = "loading"
            state.appStatus = "loading"
        })
        .addCase(saveDrinkingOption.fulfilled, (state, action)=> {
            state.appStatus = ""
            state.iniDrinkingOptId = action.payload._id
            state.tempDrinkingOptId = action.payload._id
            state.user = {...state.user, drinkingOption:   action.payload}
        })
        .addCase(saveDrinkingOption.rejected, (state, action)=> {
            state.status = "failed"
            state.appStatus = ""
        })
        .addCase(getJobSearchResults.pending, (state,action)=>{
            state.status = "loading"
        })
        .addCase(getJobSearchResults.fulfilled, (state, action)=> {
            state.status = "success"
            state.jobSearchResults = action.payload
        })
        .addCase(getJobSearchResults.rejected, (state, action)=> {
            state.status = "failed"
        })
        .addCase(saveJobs.pending, (state,action)=>{
            state.status = "loading"
        })
        .addCase(saveJobs.fulfilled, (state, action)=> {
            state.status = "success"
            state.iniJobs = action.payload.jobs
            state.tempJobs = action.payload.jobs
            state.iniJobIdArray = action.payload.jobIdArray
            state.tempJobIdArray = action.payload.jobIdArray
            state.user = {...state.user, jobs:   action.payload.jobs}
        })
        .addCase(saveJobs.rejected, (state, action)=> {
            state.status = "failed"
        })
        .addCase(saveEduOption.pending, (state,action)=>{
            state.status = "loading"
            state.appStatus = "loading"
        })
        .addCase(saveEduOption.fulfilled, (state, action)=> {
            state.appStatus = ""
            state.iniEduOptId = action.payload._id
            state.tempEduOptId = action.payload._id
            state.user = {...state.user, eduOption:   action.payload}
        })
        .addCase(saveEduOption.rejected, (state, action)=> {
            state.status = "failed"
            state.appStatus = ""
        })
        .addCase(getCollegeSearchResults.pending, (state,action)=>{
            state.status = "loading"
            state.appStatus = "loading"
        })
        .addCase(getCollegeSearchResults.fulfilled, (state, action)=> {
            state.status = "success"
            state.appStatus = ""
            state.collegeSearchResults = action.payload
        })
        .addCase(getCollegeSearchResults.rejected, (state, action)=> {
            state.status = "failed"
            state.appStatus = ""
        })
        .addCase(saveCollegeOption.pending, (state,action)=>{
            state.status = "loading"
            state.appStatus = "loading"
        })
        .addCase(saveCollegeOption.fulfilled, (state, action)=> {
            state.appStatus = ""
            state.iniColl = action.payload.coll
            state.tempColl = action.payload.coll
            state.iniCollId = action.payload.collId
            state.tempCollId = action.payload.collId
            state.user = {...state.user, college:   action.payload.coll}
        })
        .addCase(saveCollegeOption.rejected, (state, action)=> {
            state.status = "failed"
            state.appStatus = ""
        })
        .addCase(saveName.pending, (state,action)=>{
            state.status = "loading"
            state.appStatus = "loading"
        })
        .addCase(saveName.fulfilled, (state, action)=> {
            state.appStatus = ""
            state.iniName = action.payload
            state.tempName = action.payload
            state.user = {...state.user, name:   action.payload}
        })
        .addCase(saveName.rejected, (state, action)=> {
            state.status = "failed"
            state.appStatus = ""
        })
        .addCase(saveBio.fulfilled, (state, action)=> {
            state.iniBio = action.payload
            state.tempBio = action.payload
            state.user = {...state.user, bio:   action.payload}
        })
        .addCase(saveBio.rejected, (state, action)=> {
            state.appStatus = ""
        })
        .addCase(saveHeight.fulfilled, (state, action)=> {
            state.appStatus = ""
            state.iniHeight = action.payload
            state.tempHeight = action.payload
            state.user = {...state.user, height:   action.payload}
        })
        .addCase(saveWeight.fulfilled, (state, action)=> {
            state.appStatus = ""
            state.iniWeight = action.payload
            state.tempWeight = action.payload
            state.user = {...state.user, weight:   action.payload}
        })
        .addCase(saveProfImg.fulfilled, (state, action)=> {
            state.user = {...state.user, profileImage: action.payload}
        })
        .addCase(saveProfImg.rejected, (state, action)=> {
            state.appStatus = ""
        })
        .addCase(saveGalImages.fulfilled, (state, action)=> {
            state.user = {...state.user, galImages: action.payload} 
        })
        .addCase(updateNotiAsRead.fulfilled, (state, action)=> {
            state.user = {...state.user, noti: action.payload}
        })
        .addCase(updateLastSeen.fulfilled, (state, action)=> {
            state.user = {...state.user, lastSeen: action.payload}
        })
        .addCase(saveDob.fulfilled, (state, action)=> {
            state.user = {...state.user, dob: action.payload}
            state.tempDob = action.payload
            state.iniDob = action.payload
        })
        .addCase(createMatch.fulfilled, (state, action)=> {
            state.user.chats = [...state.user.chats, action.payload.chatId]
            state.user.fans =  state.user.fans.filter(_id=>_id !== action.payload.strangerId)
            state.user.matches = [...state.user.matches, action.payload.strangerId]
        })
        .addCase(removeMatch.fulfilled, (state, action)=> {
            state.user.chats = [...state.user.chats, action.payload.updatedChats]
            state.user.matches = [...state.user.matches, action.payload.updatedMatches]
        })
        .addCase(removeFan.fulfilled, (state, action)=> {
            state.user.fans =  state.user.fans.filter(_id=>_id !== action.payload.strangerId)
        })
    }
})
export const {startAppLoadingStatus, stopAppLoadingStatus,updateRegisterInfo, updateLoginInfo, updateUserInAuth,updateUserProfileImage, logoutUser, addUserGalImages, updateGalImage, updateUserName, updateNewDatingCity, updateInitialDatingGoalIdArrayInAuth, addToTempDatingGoalIdArray, removeFromTempDatingGoalIdArray, resetTempDatingGoalIdArray, resetTempHobbyIdArray, resetHobbySearchResults, updateHobbySearchResults, updateInitialHobbies, addToTempHobbies, removeFromTempHobbies, resetTempHobbies,  addToTempHobbyIdArray, removeFromTempHobbyIdArray, updateInitialHobbyIdArrayInAuth, updateTempHobbies, updateTempHobbyIdArray, updateIniKidOptId, updateTempKidOptId, resetTempKidOptId, updateIniSmokingOptId, updateTempSmokingOptId, resetTempSmokingOptId, updateIniDrinkingOptId, updateTempDrinkingOptId, resetTempDrinkingOptId, updateIniJobs, updateTempJobs, updateIniJobIdArray, updateTempJobIdArray, addToTempJobIdArray, removeFromTempJobIdArray, addToTempJobs, removeFromTempJobs, resetTempJobs, resetTempJobIdArray, resetJobSearchResults, updateJobSearchResults, updateIniEduOptId, updateTempEduOptId, resetTempEduOptId, updateIniColl, updateIniCollId, updateTempColl, resetTempColl, updateTempCollId, resetTempCollId, resetCollegeSearchResults, updateIniName, updateTempName, resetTempName, updateRegisterStatus, updateNewHomeCityId,updateTempHeight, resetTempHeight, updateIniHeight, updateIniWeight, updateTempWeight, resetTempWeight, updateIniDCityId, updateAccessToken, updateReFreshToken, updateIniBio, updateTempBio, resetTempBio, resetLogin, updateTempRemovedGalImgId,resetTempRemovedGalImgId, updateTempProfImg,resetTempProImg, updateTempGalImages, resetTempGalImages, updateIniDob, updateTempDob, getMessageNoti, updateUserNoti, addMessageNoti} = authSlice.actions
export const authActions = authSlice.actions
export default authSlice.reducer
