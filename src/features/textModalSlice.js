import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../utils/services";

const initialState = {
    title: "",
    body: "",
    modalShow: false,
    actionName: "",
    txtModalMsg: null,
    txtMoSuccessMsgShow: false,
    txtMoErrMsgShow: false,
    btnShow: true,
    data: null,
}
const textModalSlice = createSlice({
    name: "textModal",
    initialState,
    reducers: {
        showTextModal(state, action){
            state.modalShow = true
        },
        confirmTextModal(state, action){
            state.title = ""
            state.body = ""
            state.modalShow = false
            state.modalShow = false
        },
        closeTextModal(state,action) {
            return initialState
        },
        showTextModalNoti(state,action){
            state.title = action.payload.modalTitle
            state.body = action.payload.modalBody
            state.modalShow = true
        },
        showBtn(state,action) {
           state.btnShow =  true
        },
        hideBtn(state,action) {
            state.btnShow =  false
         },
        showTextModalForLikedStrangerRemoveConfirm(state, action){
            state.title = `Xác nhận `
            state.body = `Bạn có muốn hủy gửi tim đến ${action.payload.name}?`
            state.actionName = "remove-liked-stranger"
            state.data = action.payload.strangerId
            state.modalShow = true
        },
        showTextModalForRemovingMatch(state, action){
            state.title = `Xác nhận `
            state.body = `Bạn có muốn hủy match với ${action.payload.name}?`
            state.actionName = "remove-match"
            state.data = action.payload.strangerId
            state.btnShow =  true
            state.modalShow = true
        },
        showTxtMoSuccessMsg(state, action){
            state.txtModalMsg = action.payload.msg
            state.txtMoSuccessMsgShow = true

        },
        showTxtMErrMsg(state, action){
            state.txtModalMsg = action.payload.msg
            state.txtMoErrMsgShow = true
        },
    },
    
})
export const { showTextModal, closeTextModal,  confirmTextModal, showTextModalNoti,showTextModalForLikedStrangerRemoveConfirm, showTxtMErrMsg, showTxtMoSuccessMsg, showBtn, hideBtn, showTextModalForRemovingMatch} = textModalSlice.actions
export default textModalSlice.reducer