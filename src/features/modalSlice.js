import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../utils/services";

const initialState = {
    infMdShow: false,
    infMdTitle: null,
    infMdBody: null,
    pgMd: {
        pgMdShow: false,
        alertVariant: null,
        alertText: null,
        btnShow: false,
        actionName: null,
    },
    cities: [],
    
}
const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        showPgMd(state, action){
            state.pgMd = {...state.pgMd, pgMdShow: true}
        },
        closePgMd(state, action){
            state.pgMd = {...state.pgMd, pgMdShow: false}
        },
        showPgMdSuccessAlert(state, action){
            state.pgMd = {...state.pgMd, alertVariant: "danger"}
            state.pgMd = {...state.pgMd, alertText: action.payload.text}
        },
        showPgMdErrorAlert(state, action){
            state.pgMd = {...state.pgMd, alertVariant: "danger"}
            state.pgMd = {...state.pgMd, alertText: action.payload.text}

        },
        showPgMdBtn(state, action){
            state.pgMd = {...state.pgMd, btnShow: true}
        },
        hidePgMdBtn(state, action){
            state.pgMd = {...state.pgMd, btnShow: false}

        },
        showDisabledConfirmBtnModal(state, action){
            state.disabledConfirmBtn = true
        },
        showActiveConfirmBtnModal(state, action){
            state.disabledConfirmBtn = false
        },
        resetModal(state,action){ 
            state.modalAlert = {}
            state.disabledConfirmBtn= true   
        },
        showModalNoti(state,action){
            state.title = action.payload.modalTitle
            state.body = action.payload.body
            state.modalShow = true
        },
        showModalForGalImageRemoveConfirm(state, action){
            state.title = `Xác nhận xóa hình ảnh `
            state.body = `Bạn có muốn xóa hình ảnh ${action.payload.imageId} ra khỏi bộ sưu tập?`
            state.modalShow = true
            state.isModalCentered = true
            state.isModalConfirmed = null
        }, 
        showModalForNameChange(state, action){
            state.confirmBtnVariant = "primary"
            state.confirmBtnName = "Xác nhận đổi tên"
            state.actionName = "change-name"
        },
        showModalForRemovingGalImage(state, action){
            state.confirmBtnVariant = "primary"
            state.confirmBtnName = "Xác nhận xóa ảnh"
            state.actionName = "remove-gal-image"
            state.data = action.payload
        },
        showModalForLikedStrangerRemoveConfirm(state, action){
            state.title = `Xác nhận `
            state.body = `Bạn có muốn hủy gửi tim đến ?`
            state.confirmBtnName = "Xác nhận"
            state.modalShow = true
        }, 
        preparePgMdForRemovingFan(state, action){
            state.pgMd = {...state.pgMd, actionName: "remove-fan"}
        },
        showInfMd(state, action){
            state.infMdTitle = action.payload.title
            state.infMdBody = action.payload.body
            state.infMdShow = true
        },
        closeInfMd(state, action){
            state.infMdShow = false
        },
        alertSameName(state, action){
            state.modalAlert = {variant: "warning", text: "Trùng với tên hiện tại!"}
        },
        alertValidName(state, action){
            state.modalAlert = {variant: "success", text: "Bạn có thể dùng tên này."}
        },
        resetPgMd(state, action){
           return initialState
        },
    },
    
})
export const {resetPgMd,showModalForGalImageRemoveConfirm, showModal, closeModal, resetModal, confirmModal, cancelModal, showModalForNameChange, alertSameName, alertValidName, showDisabledConfirmBtnModal, showActiveConfirmBtnModal, showModalForRemovingGalImage, showModalNoti, showModalForLikedStrangerRemoveConfirm,showInfMd, showPgMd, closePgMd, showPgMdBtn, hidePgMdBtn, showPgMdSuccessAlert, showPgMdErrorAlert, preparePgMdForRemovingFan} = modalSlice.actions
export default modalSlice.reducer