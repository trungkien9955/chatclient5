import { Container, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ChatItem from "../components/chat/ChatItem";
import { getMessages, updateCurrentChat, updateRecipient } from "../features/chatSlice";
import {  Link, useNavigate} from 'react-router-dom'
import { useFetchLastMessage } from "../hooks/useFetchLastMessage";
import useConvertTimeLanguage from "../hooks/useConvertTimeLanguage";
import { intlFormatDistance } from "date-fns";
import useCalculateTime from "../hooks/useCalculateTime";
import useFetchLastMessageTime from "../hooks/useFetchLastMessageTime";
import CustomAxios from "../utils/CustomAxios";
import AlertComponent from "../components/ui/Alert";
import { useEffect, useState } from "react";
import { getMesssageNoti, removeMessageNoti } from "../features/homeSlice";

const Chat = () => {
    const navigate = useNavigate
    const home = useSelector(state=>  state.home)
    const auth = useSelector(state=>state.auth)
    const chat = useSelector(state=>state.chat)
    const user = auth.user
    const [chats, setChats] = useState(null)
    const [messageNoti, setMessageNoti] = useState(null)
    const homeMessageNotiCount = useSelector(state=>state.home.messageNotiCount)
    const [err, setErr] = useState(null)
    const dispatch = useDispatch()
    useEffect( ()=>{
        const fetchChats = async()=>{
            try{
                let response =  await CustomAxios.post("/chats/fetch-chats", {userId: user?._id})
                if(response.data.chats){
                    setChats(response?.data?.chats)
                }
            }catch(error){
                setErr(error?.response?.data?.errMsg)
            }
        } 
        fetchChats()
    }, [user?.chats])
    useEffect( ()=>{
        const fetchMessageNoti = async()=>{
            try{
                let response =  await CustomAxios.post("/chats/fetch-message-noti", {userId: user?._id})
                if(response?.data?.messageNoti){
                    setMessageNoti(response?.data?.messageNoti)
                }
            }catch(error){
                setErr(error?.response?.data?.errMsg)
            }
        } 
        fetchMessageNoti()
    }, [homeMessageNotiCount])
    return ( 
        <div className="chat-section">
        <Stack className="page-header">
            <div className="page-title">Chat</div>
            <div className="page-desc">Chỉ 2 người match mới có thể chát với nhau.</div>
            <hr />
        </Stack>
          <Stack
          
          className="p-2"
          >
            {
                chats?.length == 0 ? <AlertComponent _alertText={"Chưa có hội thoại nào."} _alertVariant={"info"}/>
                : <Stack 
                className="chat-container px-2 py-4 "
                gap={3}
                >
                    {
                        chats?.map((chat, index)=> {
                            const recipient = chat?.members?.filter((member)=> member._id !== user?._id)[0]
                            const isRead  = !messageNoti.includes(chat?._id)
                            return <Link
                            className="chat-item-container border-pr-weak border-radius-sm"
                            key = {index}
                            to = "/chat-box"
                            onClick= {()=>{
                                if(!isRead){dispatch(removeMessageNoti(chat?._id))}
                                dispatch(updateCurrentChat(chat))
                                dispatch(updateRecipient(recipient))
                            }
                            }
                            >
                                <ChatItem chat = {chat} user = {user}    isRead = {isRead}/>
                            </Link>
                        })
                    }
                </Stack>
            }
            {
                !chats && err && <AlertComponent _alertText={err} _alertVariant={"warning"}/>
            }
        </Stack>
        </div>

     );
}
 
export default Chat;