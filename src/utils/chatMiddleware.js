import { io } from "socket.io-client"
import { addMessage, chatActions, checkSocket, connectionEstablished, sendMessage, updateChatBgImg, updateOnlineUsers, updateSocketId } from "../features/chatSlice"
import { addMessageNoti, authActions, createMatch, loginUser, logoutUser, removeFan, removeMatch, saveLikedStrangers, updateUserNoti } from "../features/authSlice"
import getBgImg from "../hooks/useBgImg"
import { addMessageNotiCount, addNewNotiCount, updateNoti } from "../features/homeSlice"
import { chatUrl } from "./services"
const chatMiddleware = store => {
    let socket
    return next => action => {
        if(chatActions.checkSocket.match(action)){
            if(!store.getState().chat.socketId && store.getState().auth.user) {
                socket = io(chatUrl)
                store.dispatch(updateSocketId(socket.id))
                socket.on("connect", ()=>{
                    store.dispatch(updateSocketId(socket.id))
                    store.dispatch(updateChatBgImg(getBgImg()))
                    socket.emit("addOnlineUser", {
                        _id: store.getState().auth.user?._id,
                        name: store.getState().auth.user?.name,
                        dCityId: store.getState().auth.user?.datingCity._id,
                        profileImage: store.getState().auth.user?.profileImage,
                    })
                })
                socket.on("getOnlineUsers", (onlineUsers)=>{
                    let onlineUserNames = []
                    onlineUsers.map((user)=>{
                        onlineUserNames.push(user?.name)
                    })
                    store.dispatch(updateOnlineUsers(onlineUsers))
                })
                socket.on("getMessage", (message)=>{
                    console.log(message.text)
                    // store.dispatch(addMessageNoti(message.chatId))
                    store.dispatch(addMessageNotiCount())

                    console.log(store.getState().home.messageNoti)
                    if(store.getState().chat.currentChat && store.getState().chat.currentChat._id == message.chatId) {
                        store.dispatch(addMessage(message))
                    }
                })
                socket.on("getMessageNoti", (noti)=>{
                    store.dispatch(addMessageNoti(noti.chatId))
                })
                socket.on("getLikeNoti", (noti)=>{
                    store.dispatch(updateNoti(noti))
                    store.dispatch(updateUserNoti(noti))
                    store.dispatch(addNewNotiCount(noti))

                })
                socket.on("getMatchNoti", (noti)=>{
                    store.dispatch(updateNoti(noti))
                    store.dispatch(updateUserNoti(noti))
                    store.dispatch(addNewNotiCount(noti))

                })
                socket.on("getRemoveMatchNoti", (noti)=>{
                    store.dispatch(updateNoti(noti))
                    store.dispatch(updateUserNoti(noti))
                    store.dispatch(addNewNotiCount(noti))

                })
                socket.on("getRejectNoti", (noti)=>{
                    store.dispatch(updateNoti(noti))
                    store.dispatch(updateUserNoti(noti))
                    store.dispatch(addNewNotiCount(noti))

                })
                socket.on("disconnect", ()=>{
                    console.log("disconnect")
                    store.dispatch(updateSocketId(null))
                })
            }     
        }
        if(createMatch.fulfilled.match(action)){
            if(!store.getState().chat.socketId && store.getState().auth.user) {
                socket = io(chatUrl)
                store.dispatch(updateSocketId(socket.id))
                socket.on("connect", ()=>{
                    store.dispatch(updateSocketId(socket.id))
                    store.dispatch(updateChatBgImg(getBgImg()))
                    socket.emit("addOnlineUser", {
                        _id: store.getState().auth.user?._id,
                        name: store.getState().auth.user?.name,
                        dCityId: store.getState().auth.user?.datingCity._id,
                        profileImage: store.getState().auth.user?.profileImage,
                    })
    
                })
                socket.emit("sendMatchNoti", action.payload.noti)
                socket.on("getOnlineUsers", (onlineUsers)=>{
                    let onlineUserNames = []
                    onlineUsers.map((user)=>{
                        onlineUserNames.push(user?.name)
                    })
                    store.dispatch(updateOnlineUsers(onlineUsers))
                })
                socket.on("getMessage", (message)=>{
                    console.log(message.text)
                    // store.dispatch(addMessageNoti(message.chatId))
                    store.dispatch(addMessageNotiCount())
                    if(store.getState().chat.currentChat && store.getState().chat.currentChat._id == message.chatId) {
                        store.dispatch(addMessage(message))
                    }
                })
                socket.on("getMessageNoti", (noti)=>{
                    store.dispatch(addMessageNoti(noti.chatId))
                })
                socket.on("getRemoveMessageNoti", (noti)=>{
                    store.dispatch(updateNoti(noti))
                })
                socket.on("getMatchNoti", (noti)=>{
                    store.dispatch(updateNoti(noti))
                    store.dispatch(updateUserNoti(noti))
                    store.dispatch(addNewNotiCount(noti))

                })
                socket.on("getLikeNoti", (noti)=>{
                    store.dispatch(updateNoti(noti))
                    store.dispatch(updateUserNoti(noti))
                    store.dispatch(addNewNotiCount(noti))

                })
                socket.on("getRemoveMatchNoti", (noti)=>{
                    store.dispatch(updateNoti(noti))
                    store.dispatch(updateUserNoti(noti))
                    store.dispatch(addNewNotiCount(noti))

                })
                socket.on("getRejectNoti", (noti)=>{
                    store.dispatch(updateNoti(noti))
                    store.dispatch(updateUserNoti(noti))
                    store.dispatch(addNewNotiCount(noti))

                })
                socket.on("disconnect", ()=>{
                    console.log("disconnect")

                    store.dispatch(updateSocketId(null))
                })
            }   
            socket.emit("sendMatchNoti", action.payload.noti)  
        }
        if(removeMatch.fulfilled.match(action)){
            if(!store.getState().chat.socketId && store.getState().auth.user) {
                socket = io(chatUrl)
                store.dispatch(updateSocketId(socket.id))
                socket.on("connect", ()=>{
                    store.dispatch(updateSocketId(socket.id))
                    store.dispatch(updateChatBgImg(getBgImg()))
                    socket.emit("addOnlineUser", {
                        _id: store.getState().auth.user?._id,
                        name: store.getState().auth.user?.name,
                        dCityId: store.getState().auth.user?.datingCity._id,
                        profileImage: store.getState().auth.user?.profileImage,
                    })
    
                })
                socket.emit("sendRemoveMatchNoti", action.payload.noti)
                socket.on("getOnlineUsers", (onlineUsers)=>{
                    let onlineUserNames = []
                    onlineUsers.map((user)=>{
                        onlineUserNames.push(user?.name)
                    })
                    store.dispatch(updateOnlineUsers(onlineUsers))
                })
                socket.on("getMessage", (message)=>{
                    console.log(message.text)
                    // store.dispatch(addMessageNoti(message.chatId))
                    store.dispatch(addMessageNotiCount())
                    if(store.getState().chat.currentChat && store.getState().chat.currentChat._id == message.chatId) {
                        store.dispatch(addMessage(message))
                    }
                })
                socket.on("getMessageNoti", (noti)=>{
                    store.dispatch(addMessageNoti(noti.chatId))
                })
                socket.on("getRemoveMessageNoti", (noti)=>{
                    store.dispatch(updateNoti(noti))
                })
                socket.on("getMatchNoti", (noti)=>{
                    store.dispatch(updateNoti(noti))
                    store.dispatch(updateUserNoti(noti))
                    store.dispatch(addNewNotiCount(noti))

                })
                socket.on("getRemoveMatchNoti", (noti)=>{
                    store.dispatch(updateNoti(noti))
                    store.dispatch(updateUserNoti(noti))
                    store.dispatch(addNewNotiCount(noti))

                })
                socket.on("getLikeNoti", (noti)=>{
                    store.dispatch(updateNoti(noti))
                    store.dispatch(updateUserNoti(noti))
                    store.dispatch(addNewNotiCount(noti))


                })
                socket.on("getRejectNoti", (noti)=>{
                    store.dispatch(updateNoti(noti))
                    store.dispatch(updateUserNoti(noti))
                    store.dispatch(addNewNotiCount(noti))

                })
                socket.on("disconnect", ()=>{
                    console.log("disconnect")

                    store.dispatch(updateSocketId(null))
                })
            }   
            socket.emit("sendRemoveMatchNoti", action.payload.noti)  
        }
        if(loginUser.fulfilled.match(action)){
            socket = io(chatUrl)
            socket.on("connect", ()=>{
                store.dispatch(updateSocketId(socket.id))
                store.dispatch(connectionEstablished(socket.id))
                socket.emit("addOnlineUser", {
                    _id: action.payload.user?._id,
                    name: action.payload.user?.name,
                    profileImage: action.payload.user?.profileImage,
                })

            })
            socket.on("getOnlineUsers", (onlineUsers)=>{
                let onlineUserNames = []
                onlineUsers.map((user)=>{
                    onlineUserNames.push(user.name)
                })
                store.dispatch(updateOnlineUsers(onlineUsers))
            })
            socket.on("getMessage", (message)=>{
                console.log(message.text)
                store.dispatch(addMessageNotiCount())
                if(store.getState().chat.currentChat && store.getState().chat.currentChat._id == message.chatId) {
                    store.dispatch(addMessage(message))
                }
            })
            socket.on("getMessageNoti", (noti)=>{
                store.dispatch(addMessageNoti(noti.chatId))
            })
            socket.on("getMatchNoti", (noti)=>{
                store.dispatch(updateNoti(noti))
                store.dispatch(updateUserNoti(noti))
                store.dispatch(addNewNotiCount(noti))

            })
            socket.on("getRemoveMatchNoti", (noti)=>{
                store.dispatch(updateNoti(noti))
                store.dispatch(updateUserNoti(noti))
                store.dispatch(addNewNotiCount(noti))

            })
            socket.on("getLikeNoti", (noti)=>{
                store.dispatch(updateNoti(noti))
                store.dispatch(updateUserNoti(noti))
                store.dispatch(addNewNotiCount(noti))
            })
            socket.on("getRejectNoti", (noti)=>{
                store.dispatch(updateNoti(noti))
                store.dispatch(updateUserNoti(noti))
                store.dispatch(addNewNotiCount(noti))

            })
            socket.on("disconnect", ()=>{
                console.log("disconnect")
                store.dispatch(updateSocketId(null))
            })
            
        }
        if(sendMessage.fulfilled.match(action)){
            if(!store.getState().chat.socketId){
                socket = io(chatUrl)
                socket.on("connect", ()=>{
                    store.dispatch(updateSocketId(socket.id))
                    store.dispatch(connectionEstablished(socket.id))
                    socket.emit("addOnlineUser", {
                        _id: action.payload.user?._id,
                        name: action.payload.user?.name,
                        profileImage: action.payload.user?.profileImage,
                    })
                })
                socket.emit("sendMessage", action.payload.message)
                socket.on("getOnlineUsers", (onlineUsers)=>{
                    let onlineUserNames = []
                    onlineUsers.map((user)=>{
                        onlineUserNames.push(user.name)
                    })
                    store.dispatch(updateOnlineUsers(onlineUsers))
                })
                socket.on("getMessage", (message)=>{
                    // store.dispatch(addMessageNoti(message.chatId))
                    store.dispatch(addMessageNotiCount())
                    if(store.getState().chat.currentChat && store.getState().chat.currentChat._id == message.chatId) {
                        store.dispatch(addMessage(message))
                        
                    }
                })
                socket.on("getMessageNoti", (message)=>{
                    store.dispatch(addMessageNoti(message.chatId))
                })
                socket.on("getMatchNoti", (noti)=>{
                    store.dispatch(updateNoti(noti))
                    store.dispatch(updateUserNoti(noti))
                    store.dispatch(addNewNotiCount(noti))

                })
                socket.on("getRemoveMatchNoti", (noti)=>{
                    store.dispatch(updateNoti(noti))
                    store.dispatch(updateUserNoti(noti))
                    store.dispatch(addNewNotiCount(noti))

                })
                socket.on("getLikeNoti", (noti)=>{
                    store.dispatch(updateNoti(noti))
                    store.dispatch(updateUserNoti(noti))
                    store.dispatch(addNewNotiCount(noti))



                })
                socket.on("getRejectNoti", (noti)=>{
                    store.dispatch(updateNoti(noti))
                    store.dispatch(updateUserNoti(noti))
                    store.dispatch(addNewNotiCount(noti))

                })
                socket.on("disconnect", ()=>{
                    console.log("disconnect")
                    store.dispatch(updateSocketId(null))
                })
                
            }
            socket.emit("sendMessage", action.payload.message)
        }
        if(saveLikedStrangers.fulfilled.match(action)){
            if(!store.getState().chat.socketId && store.getState().auth.user){
                socket = io(chatUrl)
                socket.on("connect", ()=>{
                    store.dispatch(updateSocketId(socket.id))
                    store.dispatch(connectionEstablished(socket.id))
                    socket.emit("addOnlineUser", {
                        _id: action.payload.user?._id,
                        name: action.payload.user?.name,
                        profileImage: action.payload.user?.profileImage,
                    })
                })
                socket.on("getOnlineUsers", (onlineUsers)=>{
                    let onlineUserNames = []
                    onlineUsers.map((user)=>{
                        onlineUserNames.push(user.name)
                    })
                    store.dispatch(updateOnlineUsers(onlineUsers))
                })
                socket.emit("sendLikeNoti", action.payload.noti)
                socket.on("getMessage", (message)=>{
                    console.log(message.text)
                    store.dispatch(addMessageNotiCount())
                    // store.dispatch(addMessageNoti(message.chatId))
                    if(store.getState().chat.currentChat && store.getState().chat.currentChat._id == message.chatId) {
                        store.dispatch(addMessage(message))
                    }
                })
                socket.on("getMessageNoti", (noti)=>{
                    store.dispatch(addMessageNoti(noti.chatId))
                })
                socket.on("getMatchNoti", (noti)=>{
                    store.dispatch(updateNoti(noti))
                    store.dispatch(updateUserNoti(noti))
                    store.dispatch(addNewNotiCount(noti))

                })
                socket.on("getRemoveMatchNoti", (noti)=>{
                    store.dispatch(updateNoti(noti))
                    store.dispatch(updateUserNoti(noti))
                    store.dispatch(addNewNotiCount(noti))

                })
                socket.on("getLikeNoti", (noti)=>{
                    store.dispatch(updateNoti(noti))
                    store.dispatch(updateUserNoti(noti))
                    store.dispatch(addNewNotiCount(noti))


                })
                socket.on("getRejectNoti", (noti)=>{
                    store.dispatch(updateNoti(noti))
                    store.dispatch(updateUserNoti(noti))
                    store.dispatch(addNewNotiCount(noti))

                })
                socket.on("disconnect", ()=>{
                    console.log("disconnect")

                    store.dispatch(updateSocketId(null))
                })
            }
            socket.emit("sendLikeNoti", action.payload.noti)
        }
        if(removeFan.fulfilled.match(action)){
            if(!store.getState().chat.socketId && store.getState().auth.user){
                socket = io(chatUrl)
                socket.on("connect", ()=>{
                    store.dispatch(updateSocketId(socket.id))
                    store.dispatch(connectionEstablished(socket.id))
                    socket.emit("addOnlineUser", {
                        _id: action.payload.user?._id,
                        name: action.payload.user?.name,
                        profileImage: action.payload.user?.profileImage,
                    })
                })
                socket.on("getOnlineUsers", (onlineUsers)=>{
                    let onlineUserNames = []
                    onlineUsers.map((user)=>{
                        onlineUserNames.push(user.name)
                    })
                    store.dispatch(updateOnlineUsers(onlineUsers))
                })
                socket.on("getMessage", (message)=>{
                    console.log(message.text)
                    // store.dispatch(addMessageNoti(message.chatId))
                    store.dispatch(addMessageNotiCount())
                    if(store.getState().chat.currentChat && store.getState().chat.currentChat._id == message.chatId) {
                        store.dispatch(addMessage(message))
                    }
                })
                socket.on("getMessageNoti", (noti)=>{
                    store.dispatch(addMessageNoti(noti.chatId))
                })
                socket.on("getMatchNoti", (noti)=>{
                    store.dispatch(updateNoti(noti))
                    store.dispatch(updateUserNoti(noti))
                    store.dispatch(addNewNotiCount(noti))

                })
                socket.on("getRemoveMatchNoti", (noti)=>{
                    store.dispatch(updateNoti(noti))
                    store.dispatch(updateUserNoti(noti))
                    store.dispatch(addNewNotiCount(noti))

                })
                socket.on("getLikeNoti", (noti)=>{
                    store.dispatch(updateNoti(noti))
                    store.dispatch(updateUserNoti(noti))
                    store.dispatch(addNewNotiCount(noti))


                })
                socket.on("getRejectNoti", (noti)=>{
                    store.dispatch(updateNoti(noti))
                    store.dispatch(updateUserNoti(noti))
                    store.dispatch(addNewNotiCount(noti))


                })
                socket.on("disconnect", ()=>{
                    console.log("disconnect")
                    store.dispatch(updateSocketId(null))
                })
            }
            socket.emit("removeFan", action.payload)
        }
        if(chatActions.logOutUserFromChat.match(action)){
            if(socket?.connected){
                socket.disconnect()
            }
        }
        next(action)
    }
    
}
export default chatMiddleware