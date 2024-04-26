import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { baseUrl, getRequest, postRequest } from "../utils/services"
import { callLoader, removeLoader } from "./appSlice"
import CustomAxios from "../utils/CustomAxios"

const initialState = {
    dCityId: null,
    initialStrangers:  [],
    stranger:  null,
    likedStrangers:  [],
    fans:  [],
    chats: [],
    strangerProfile: null,
    tempFilter: {
        gender: "",
        job: "",
        heightAbove: null,
        heightBelow: null,
        weightAbove: null,
        weightBelow: null,
        dCityId: "",
        hCityId: "",
    },
    filter: {
        genderId: null,
        jobId: null,
        heightAbove: null,
        heightBelow: null,
        weightAbove: null,
        weightBelow: null,
        dCityId: "",
        hCityId: "",
    },
    noti: [],
    messageNoti: [],
    newNotiCount: null,
    messageNotiCount: null,
    errMsg: null,
}
export const fetchHomeUsers = createAsyncThunk(
    "fetchHomeUsers",
    async() => {
        const state = getState()
        const filter = state.home.filter
        const defaultCityId = "65a8ac874efc673284b31212"
        let input = {defaultCityId}
        try{
            let response  = await CustomAxios.post(`/home/get-home-users`, input)
            return response.data
        }catch(error){
            return rejectWithValue("Đã xảy ra lỗi.")
        }
    }
)
export const fetchInitialStrangers = createAsyncThunk(
    "fetchInitialStrangers",
    async(input)=>{
        try{
            let response  = await CustomAxios.post(`/home/get-initial-strangers`, input)
            return response.data
        }catch(error){
            return rejectWithValue("Đã xảy ra lỗi.")
        }
    }
)
export const getStrangerProfile = createAsyncThunk(
    "home/getStrangerProfile",
    async(input)=>{
        try{
            let response  = await CustomAxios.get(`/profile/get-stranger-profile/${input}`)
            return response.data
        }catch(error){
            return rejectWithValue("Đã xảy ra lỗi.")
        }
    }
)
export const updateNotiAsRead = createAsyncThunk(
    "home/updateNotiAsRead", 
    async(notiId, thunkAPI)=>{

        try{
            let response = await CustomAxios.post(`/home/update-noti-as-read`,{notiId})
                return response.data.chatId
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data.errMsg)
        }
    }
)
export const removeMessageNoti = createAsyncThunk(
    "home/removeMessageNoti",
    async(chatId, thunkAPI)=>{
       
        const state = thunkAPI.getState()
        const userId = state.auth.user._id
        try{
            thunkAPI.dispatch(callLoader())
            const response = await CustomAxios.post(`/home/remove-message-noti`, {userId: userId,chatId: chatId})
            thunkAPI.dispatch(removeLoader())
            return response.data
        }catch(error){
            thunkAPI.dispatch(callLoader())
            console.log(error)
            return thunkAPI.rejectWithValue(error.response.data.errMsg)
        }
    }
)
export const getStranger = createAsyncThunk(
    "home/getStranger",
    async(input, thunkAPI)=>{
        // console.log(filter)
        thunkAPI.dispatch(callLoader())
        try{
            const response = await CustomAxios.post(`/home/get-stranger`, input)
            thunkAPI.dispatch(removeLoader())
            if(response?.data.success)
                return response.data.values.stranger
            
        }catch(error){
            thunkAPI.dispatch(removeLoader())
            return thunkAPI.rejectWithValue(error.response.data.errMsg) 

        }
    }
)
export const saveFilter = createAsyncThunk(
    "home/saveFilter",
    async(input, thunkAPI)=>{
        thunkAPI.dispatch(callLoader())
        try{
            const response = await CustomAxios.post(`/home/save-filter`, input)
            thunkAPI.dispatch(removeLoader())
            return response.data.filter
        }catch(error){
            thunkAPI.dispatch(removeLoader())
            return thunkAPI.rejectWithValue(error.response.data.errMsg) 
        }
    }
)
export const saveDCityId_Filter = createAsyncThunk(
    "home/saveDCityId_Filter",
    async(input, thunkAPI)=>{
        thunkAPI.dispatch(callLoader())
        try{
            const response = await CustomAxios.post(`/home/save-dcityid-filter`, input)
            thunkAPI.dispatch(removeLoader())
            if(response.success)
                return response.data.dCityId
            else{
                return thunkAPI.rejectWithValue(response.errMsg) 
            }
        }catch(error){
            thunkAPI.dispatch(removeLoader())
        }
    }
)
const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        updateIniFilter(state, action) {
            state.filter = action.payload
        },
        updateTempFilter(state, action) {
            state.tempFilter = action.payload
        },
        updateDCityId_Filter(state, action) {
            state.filter = {...state.filter, dCityId: action.payload}
        },
        updateDCityId_tempFilter(state, action) {
            state.tempFilter = {...state.tempFilter, dCityId: action.payload}
        },
        updateHCityId_Filter(state, action) {
            state.filter = {...state.filter, hCityId: action.payload}
        },
        updateHCityId_tempFilter(state, action) {
            state.tempFilter = {...state.tempFilter, hCityId: action.payload} 
        },
        updateGender_TempFilter(state, action) {
            state.tempFilter = {...state.tempFilter, gender: action.payload}
        },
        updateJob_tempFilter(state, action) {
            state.tempFilter = {...state.tempFilter, job: action.payload}
        },
        updateheightAbove_TempFilter(state, action) {
            state.tempFilter = {...state.tempFilter, heightAbove: action.payload}
        },
        updateheightBelow_TempFilter(state, action) {
            state.tempFilter = {...state.tempFilter, heightBelow: action.payload}
        },
        updateWeightAbove_TempFilter(state, action) {
            state.tempFilter = {...state.tempFilter, weightAbove: action.payload}
        },
        updateWeightBelow_TempFilter(state, action) {
            state.tempFilter = {...state.tempFilter, weightBelow: action.payload}
        },
        getRandomStranger(state, action) {
            state.stranger = state.initialStrangers[Math.floor(Math.random()*state.initialStrangers.length)]
        },
        getFans(state,action){
            state.fans = action.payload
        },
        updateInitialLikedStrangers(state,action){
            state.likedStrangers = action.payload
        },
        getChats(state,action){
            state.chats = action.payload
        },
        addChats(state,action){
            state.chats = [...state.chats, action.payload]
        },
        likeStranger(state,action){
            state.likedStrangers =  [...state.likedStrangers, action.payload]
            state.initialStrangers = state.initialStrangers.filter((user)=>user._id !== action.payload._id)
            state.stranger = state.initialStrangers[Math.floor(Math.random()*state.initialStrangers.length)]
        },
        likeTheLastStranger(state,action){
            state.initialStrangers = []
            state.stranger = null
        },
        removeLikedStrangerFromHome(state,action){
            state.likedStrangers =  state.likedStrangers.filter((stranger)=>stranger._id!==action.payload._id)
            state.initialStrangers = state.initialStrangers.filter((user)=>user._id !== action.payload._id)
            state.stranger = state.initialStrangers[Math.floor(Math.random()*state.initialStrangers.length)]
        },
        updateInitialNoti(state, action){
            state.noti = action.payload
        },
        getNoti(state, action){
            state.noti = action.payload
        },
        updateNoti(state, action){
            state.noti = [...state.noti, action.payload]
        },
        getMesssageNoti(state, action){
            state.messageNoti = action.payload
        },
        updateNewNotiCount(state, action){
            state.newNotiCount = action.payload
        },
        addNewNotiCount(state, action){
            state.newNotiCount = state.newNotiCount + 1
        },
        substractNewNotiCount(state, action){
            state.newNotiCount = state.newNotiCount - 1
        },
        addMessageNotiCount(state, action){
            state.messageNotiCount = state.messageNotiCount + 1
        },
        substracMessageNotiCount(state, action){
            state.messageNotiCount = state.messageNotiCount - 1
        },
        logoutUserfromHome(state, action){
            return initialState
        },
        resetTempFilter(state, action){
            state.tempFilter = action.payload
        },
        updateRemovedFanId(state, action){
            state.removedFanId = action.payload
        },
        resetHome(state, action){
            return initialState
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchInitialStrangers.pending, (state, action)=>{
            state.status =  "loading"
        })
        .addCase(fetchInitialStrangers.fulfilled, (state, action)=>{
            state.status =  "success"
            state.initialStrangers = action.payload
            if(state.initialStrangers.length>0){
                state.stranger = state.initialStrangers[Math.floor(Math.random()*state.initialStrangers.length)]
            }
            else{
                state.stranger = null
            }
        })
        .addCase(fetchInitialStrangers.rejected, (state, action)=>{
            state.status =  "failed"
        })
        .addCase(getStrangerProfile.pending, (state, action)=>{
            state.status =  "loading"
        })
        .addCase(getStrangerProfile.fulfilled, (state, action)=>{
            state.status =  "success"
            state.strangerProfile = action.payload
        })
        .addCase(getStrangerProfile.rejected, (state, action)=>{
            state.status =  "failed"
        })
        .addCase(updateNotiAsRead.fulfilled, (state, action)=>{ 
            state.newNotiCount = state.newNotiCount - 1
        })
        .addCase(removeMessageNoti.fulfilled, (state, action)=>{ 
            state.messageNotiCount = state.messageNotiCount - 1
        })
        .addCase(getStranger.fulfilled, (state, action)=>{
            state.stranger =  action.payload
            state.errMsg =  null

        })
        .addCase(getStranger.rejected, (state, action)=>{
            state.errMsg =  action.payload
            state.stranger =  null
        })
        .addCase(saveFilter.fulfilled, (state, action)=>{
            state.filter =  action.payload
            state.tempFilter =  action.payload
            state.errMsg =  null
        })
    }
})
export const {getDataFromLogin,getRandomStranger, likeStranger, likeTheLastStranger, logoutUserfromHome, removeLikedStrangerFromHome, getFans,updateInitialLikedStrangers, getChats, addChats, updateInitialNoti, updateNewNotiCount, resetHome, updateGender_TempFilter, updateDCityId_Filter, updateDCityId_tempFilter, updateHCityId_Filter, updateHCityId_tempFilter, updateJob_tempFilter, updateheightAbove_TempFilter, updateheightBelow_TempFilter, updateWeightAbove_TempFilter, updateWeightBelow_TempFilter, updateIniFilter, updateTempFilter, resetTempFilter, updateNoti, getNoti, getMesssageNoti, updateRemoved, updateRemovedFanId, addNewNotiCount, substractNewNotiCount, addMessageNotiCount, substracMessageNotiCount} = homeSlice.actions
export default homeSlice.reducer