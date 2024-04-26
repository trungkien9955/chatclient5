import { Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { closeEmojiPicker, getMessages, updateMessages } from "../../features/chatSlice";
import Message from "./Message";
import CustomAxios from "../../utils/CustomAxios";

const ChatBoxMessages = () => {
    const user = useSelector(state=>state.auth.user)
    const ref = useRef(null)
    const dispatch = useDispatch()
    const bgImg = useSelector(state=>state.chat.chatBgImg)
    const currentChatId = useSelector(state=>state.chat.currentChat?._id)
    const messages =  useSelector(state=>state.chat.messages)
    const [errMsg, setErrMsg] = useState(null)
 useEffect(()=>{
        const fetchMessages = async()=>{
            try{
                const response = await CustomAxios.get(`/chats/get-messages/${currentChatId}`)
                console.log(response?.data?.messages)
                dispatch(updateMessages(response?.data?.messages))
            }catch(error){
                setErrMsg(error?.response?.data?.errMsg)
            }
        }
        fetchMessages()
    }, [])
useEffect(()=>{
    if(messages?.length){ 
        ref.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest"
        })
    }
    }, [messages?.length])

    return ( 
        <Stack className="messages-container"
        style={{backgroundImage: `url(${bgImg})`}}
        onClick={()=>{
            dispatch(closeEmojiPicker())
        }}
        >
        <Stack className="chat-box-messages p-2 " ref= {ref} >
        {
            messages.length>0 && messages.map((message, index)=> {
                    return <Message key={index} message = {message} user = {user} createdAt = {message?.createdAt}/>
                })
        }
    </Stack>
    </Stack>
     );
}
export default ChatBoxMessages;