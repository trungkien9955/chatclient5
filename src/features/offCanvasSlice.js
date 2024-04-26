import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl,getRequest, postRequest} from "../utils/services";
import CustomAxios from "../utils/CustomAxios";
const initialState = {
    pageOffCanvasShow: false,
    appOffCanvasShow: false,
    notiOffCanvasShow: false,
    filterOffCanvasShow: false,
    infoOffCanvasShow: false,
    bOffShow: false,
    alert: {variant: "", text: ""},
    disabledConfirmBtn: true,
    offCanvasLoadingStatus: null,
    confirmBtnName: "",
    actionName: "",
    data: null,
    cities: [],
    dataFromServer: null,
    confirmBtnName: "",
    alertShow: false,
    alertVariant: "",
    alertText: "",
    infoOffTitle: "",
    infoOffBody: "",
    tempDatingGoalIdArray: [],
}

export const getCitiesForOffCanvas = createAsyncThunk(
    "getCitiesForOffCanvas",
    async()=>{
        try{
            let response = await CustomAxios.get(`/data/cities`);
            return response.data
        }catch(error){
            return rejectWithValue("Đã xảy ra lỗi.")
        }
    }
)
const offCanvasSlice = createSlice({
    name: "offCanvas",
    initialState,
    reducers: {
        showAppOffCanvas: (state, action)=>{
            state.appOffCanvasShow = true
        },
        showNotiOffCanvas: (state, action)=>{
            state.notiOffCanvasShow = true
        },
        showFilterOffCanvas: (state, action)=>{
            state.filterOffCanvasShow = true
        },
        showInfoOffCanvas: (state, action)=>{
            state.infoOffTitle = action.payload.title
            state.infoOffBody = action.payload.body
            state.infoOffCanvasShow = true
        },
        showBOff: (state, action)=>{
            state.bOffShow = true
        },
        updateImgOffStatus: (state, action)=>{
            state.imgOff.status = action.payload
        },
        closeAppOffCanvas: (state, action)=>{
            state.appOffCanvasShow = false
        },
        closeNotiOffCanvas: (state, action)=>{
            state.notiOffCanvasShow = false
        },
        closeFilterOffCanvas: (state, action)=>{
            state.filterOffCanvasShow = false
        },
        closeInfoOffCanvas: (state, action)=>{
            state.infoOffCanvasShow = false
        },
        closeOffCanvasForDatingGoalChange(state,action){
            state.tempDatingGoalIdArray = action.payload
        },
        closeBOff(state,action){
            state.bOffShow = false
        },
        closeOffCanvas(state,action){
            return initialState
        },
        showOffCanvasDisabledConfirmBtn(state, action){
            state.disabledConfirmBtn = true
        },
        showOffCanvasActiveConfirmBtn(state, action){
            state.disabledConfirmBtn = false
        },
        showOffCanvasAlert: (state, action)=>{
            state.alertVariant= "success"
            state.alertText = "Đã lưu thay đổi địa điểm hẹn hò"
        },
        showOffCanvasAlertWithExternalData: (state, action)=>{
            state.alertShow = true
            state.alertVariant= action.payload.alertVariant
            state.alertText = action.payload.alertText
        },
        updateData(state, action){
            state.data = action.payload
        },
        startLoadingStatus(state, action){
            state.offCanvasLoadingStatus = true
        },
        stopLoadingStatus(state, action){
            state.offCanvasLoadingStatus = false
        },
        showOffCanvasForDatingCityChange: (state, action)=>{
            state.confirmBtnName= "Lưu thay đổi"
            state.actionName = "save-dating-city"
        },
        prepareOffCanvasForHomeCity: (state, action)=>{
            state.confirmBtnName= "Lưu thay đổi"
            state.actionName = "save-home-city"
        },
        prepareOffCanvasForGenderChange: (state, action)=>{
            state.confirmBtnName= "Lưu thay đổi"
            state.actionName = "save-gender"
        },
        prepareOffCanvasForDatingGoalsChange: (state, action)=>{
            state.confirmBtnName= "Lưu thay đổi"
            state.actionName = "save-dating-goals"
        },
        prepareOffCanvasForHobby: (state, action)=>{
            state.confirmBtnName= "Lưu thay đổi"
            state.actionName = "save-hobbies"
        },
        prepareOffCanvasForKidOption: (state, action)=>{
            state.confirmBtnName= "Lưu thay đổi"
            state.actionName = "save-kid-option"
        },
        prepareOffCanvasForSmokingOptions: (state, action)=>{
            state.confirmBtnName= "Lưu thay đổi"
            state.actionName = "save-smoking-option"
        },
        prepareOffCanvasForDrinkingOptions: (state, action)=>{
            state.confirmBtnName= "Lưu thay đổi"
            state.actionName = "save-drinking-option"
        },
        prepareOffCanvasForJobs: (state, action)=>{
            state.confirmBtnName= "Lưu thay đổi"
            state.actionName = "save-jobs"
        },
        prepareOffCanvasForEduOptions: (state, action)=>{
            state.confirmBtnName= "Lưu thay đổi"
            state.actionName = "save-edu-option"
        },
        prepareOffCanvasForColleges: (state, action)=>{
            state.confirmBtnName= "Lưu thay đổi"
            state.actionName = "save-college-option"
        },
        prepareOffCanvasForName: (state, action)=>{
            state.confirmBtnName= "Đổi tên"
            state.actionName = "save-name-change"
        },
        prepareOffCanvasForBio: (state, action)=>{
            state.confirmBtnName= "Lưu thay đổi"
            state.actionName = "save-bio"
        },
        prepareOffCanvasForHeight: (state, action)=>{
            state.confirmBtnName= "Lưu"
            state.actionName = "save-height"
        },
        prepareOffCanvasForWeight: (state, action)=>{
            state.confirmBtnName= "Lưu"
            state.actionName = "save-weight"
        },
        prepareOffCanvasForRemovingGalImg: (state, action)=>{
            state.confirmBtnName= "Xóa ảnh"
            state.actionName = "remove-gal-image"
        },
        prepareOffCanvasForGalImages: (state, action)=>{
            state.confirmBtnName= "Lưu ảnh bộ sưu tập"
            state.actionName = "save-gal-images"        },
        prepareOffCanvasForProfImg: (state, action)=>{
            state.confirmBtnName= "Lưu ảnh đại diện"
            state.actionName = "save-profile-image"
        },
        prepareOffCanvasForDob: (state, action)=>{
            state.confirmBtnName= "Lưu ngày sinh"
            state.actionName = "save-dob"
        },
        addToTempDatingGoalIdArray: (state, action)=>{
            state.tempDatingGoalIdArray= [...state.tempDatingGoalIdArray, action.payload]
        },
        removeFromTempDatingGoalIdArray: (state, action)=>{
            state.tempDatingGoalIdArray= state.tempDatingGoalIdArray.filter((id)=> id!==action.payload)
        },
        resetOffCanvasAlert: (state, action)=>{
            state.alertVariant= ""
            state.alertText = ""
            state.alertShow = false
        },
        resetOffCanvas: (state, action)=>{
            return initialState
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getCitiesForOffCanvas.pending, (state, action)=> {
            state.status = "loading"
        })
        .addCase(getCitiesForOffCanvas.fulfilled, (state, action)=> {
            state.status = "success"
            state.dataFromServer = action.payload
        })
        .addCase(getCitiesForOffCanvas.rejected, (state, action)=> {
            state.status = "failed"
        })
    }
})
export const {showAppOffCanvas, closeAppOffCanvas, showNotiOffCanvas, closeNotiOffCanvas,showFilterOffCanvas, closeFilterOffCanvas,closeOffCanvas,  showOffCanvasForDatingCityChange, showOffCanvasDisabledConfirmBtn, showOffCanvasActiveConfirmBtn, startLoadingStatus, stopLoadingStatus,showOffCanvasAlertWithExternalData, updateData, showInfoOffCanvas, closeInfoOffCanvas, prepareOffCanvasForGenderChange, prepareOffCanvasForDatingGoalsChange, closeOffCanvasForDatingGoalChange, prepareOffCanvasForHobby, prepareOffCanvasForKidOption, prepareOffCanvasForSmokingOptions, prepareOffCanvasForDrinkingOptions, prepareOffCanvasForJobs, prepareOffCanvasForEduOptions, prepareOffCanvasForColleges, resetOffCanvasAlert, prepareOffCanvasForName, showBOff,closeBOff, prepareOffCanvasForHomeCity, prepareOffCanvasForHeight, prepareOffCanvasForWeight, prepareOffCanvasForBio, prepareOffCanvasForRemovingGalImg, resetOffCanvas, prepareOffCanvasForProfileImg, prepareOffCanvasForProfImg, prepareOffCanvasForGalImages, prepareOffCanvasForDob} =   offCanvasSlice.actions
export default offCanvasSlice.reducer