import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { baseUrl, getRequest, postRequest } from "../utils/services"
import CustomAxios from "../utils/CustomAxios"
import getBgImg from "../hooks/useBgImg"
import { callLoader, removeLoader } from "./appSlice"

const initialState = {
    socketId: null,
    messages: [],
    isEstablishingConnection: null,
    isConnected: false,
    newMessage: null,
    recipient: null,
    currentChat: null,
    onlineUsers: [],
    messageNoti: [],
    emojiPickerShow: false,
    chatBgImg: null
}
export const sendMessage = createAsyncThunk(
    "chat/sendMessage",
    async(data, thunkAPI)=>{
        try{
            thunkAPI.dispatch(callLoader())
            const response = await CustomAxios.post(`/chats/save-message`, {
                chatId: data.chatId,
                senderId : data.sender._id,
                recipientId : data.recipient._id,
                text: data.text
            })
            thunkAPI.dispatch(removeLoader())
            return response.data
        }catch(error){
            thunkAPI.dispatch(removeLoader())
            console.log(error)
            return thunkAPI.rejectWithValue(error.response.data.errMsg)
        }
    }
)
export const getMessages = createAsyncThunk(
    "chat/getMessages",
    async(chatId, thunkAPI)=>{
        try{
            const response = await CustomAxios.get(`/chats/get-messages/${chatId}`)
            return response.data
        }catch(error){
            console.log(error)
        }
    }
)
export const addMessageNoti = createAsyncThunk(
    "chat/addMessageNoti",
    async(chatId, thunkAPI)=>{
        const state = thunkAPI.getState()
        const userId = state.auth.user._id
        console.log(chatId)
        try{
            const response = await CustomAxios.post(`/chats/add-message-noti`, {userId: userId,chatId: chatId})
            return response.data
        }catch(error){
            console.log(error)
        }
    }
)
export const removeMessageNoti = createAsyncThunk(
    "chat/removeMessageNoti",
    async(chatId, thunkAPI)=>{
       
        const state = thunkAPI.getState()
        const userId = state.auth.user._id
        try{
            thunkAPI.dispatch(callLoader())
            const response = await CustomAxios.post(`/chats/remove-message-noti`, {userId: userId,chatId: chatId})
            thunkAPI.dispatch(removeLoader())
            return response.data
        }catch(error){
            thunkAPI.dispatch(callLoader())
            console.log(error)
            return thunkAPI.rejectWithValue(error.response.data.errMsg)
        }
    }
)
const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        updateSocketId(state,action){
            state.socketId = action.payload
        },
        checkSocket(state,action){
            
        },
        connectionEstablished(state, action){
            state.isConnected = true
            state.isEstablishingConnection = false
            state.socketId = action.payload
        },
        updateCurrentChat(state,action){
            state.currentChat = action.payload
        },
        updateNewMessage(state, action){
            state.newMessage = action.payload
        },
        resetMessage(state, action){
            state.newMessage = action.payload
        },
        addEmoji(state, action){
            state.newMessage = state.newMessage+action.payload
        },
        updateRecipient(state,action){
            state.recipient = action.payload 
        },
        addMessage(state, action){
            state.messages = [...state.messages, action.payload]
        },
        updateMessages(state, action){
            state.messages = action.payload
        },
        updateMessageNoti(state, action){
            state.messages = [...state.messageNoti, action.payload]
        },
        addOnlineUser(state, action){
            state.onlineUsers = state.onlineUsers.push(action.payload)
        },
        updateUser(state,action){

        },
        updateOnlineUsers(state,action){
            state.onlineUsers = action.payload
        },
        sendMessageForSocket(state,action){

        },
        updateInnitialMessageNoti(state, action){
            state.messageNoti = action.payload
        },
        logOutUserFromChat(state, action){
            return initialState
        },
        showEmojiPicker(state,action){
            state.emojiPickerShow = true
        },
        closeEmojiPicker(state,action){
            state.emojiPickerShow = false
        },
        toggleEmojiPicker(state,action){
            state.emojiPickerShow = !state.emojiPickerShow 
        },
        updateChatBgImg(state,action){
            state.chatBgImg = action.payload
        },
    },
    extraReducers: (builder)=>{
        builder
        .addCase(getMessages.pending, (state, action)=>{
            state.status =  "loading"
        })
        .addCase(getMessages.fulfilled, (state, action)=>{
            state.status =  "success"
            state.messages = action.payload
        })
        .addCase(getMessages.rejected, (state, action)=>{
            state.status =  "failed"
        })
        .addCase(sendMessage.pending, (state, action)=>{
            state.status =  "loading"
        })
        .addCase(sendMessage.fulfilled, (state, action)=>{
            state.status =  "success"
            state.messages = [...state.messages, action.payload.message]
        })
        .addCase(sendMessage.rejected, (state, action)=>{
            state.status =  "failed"
        })
        .addCase(addMessageNoti.pending, (state, action)=>{
            state.status =  "loading"
        })
        .addCase(addMessageNoti.fulfilled, (state, action)=>{
            state.status =  "success"
            state.messageNoti = [...state.messageNoti, action.payload]
        })
        .addCase(addMessageNoti.rejected, (state, action)=>{
            state.status =  "failed"
        })
        .addCase(removeMessageNoti.pending, (state, action)=>{
            state.status =  "loading"
        })
        .addCase(removeMessageNoti.fulfilled, (state, action)=>{
            state.status =  "success"
            state.messageNoti = state.messageNoti.filter((chatId)=>chatId !== action.payload)
        })
    }
})
export const {updateSocketId,connectionEstablished, updateCurrentChat, updateRecipient, addMessage, updateNewMessage, addOnlineUser, updateUser, sendMessageForSocket, logOutUserFromChat, updateInnitialMessageNoti, addEmoji, toggleEmojiPicker, showEmojiPicker, closeEmojiPicker, updateOnlineUsers, checkSocket, updateChatBgImg, updateMessageNoti, updateMessages,resetMessage} = chatSlice.actions
export const chatActions = chatSlice.actions
export default chatSlice.reducer
