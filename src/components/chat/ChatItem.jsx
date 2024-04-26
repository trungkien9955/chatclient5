import {  Stack } from "react-bootstrap";
import { imageUrl } from "../../utils/services";
import { Badge } from "@mui/material" 
import { useSelector } from "react-redux";
import useConvertTimeLanguage from "../../hooks/useConvertTimeLanguage";
import { intlFormatDistance } from "date-fns";
import { useFetchLastMessage } from "../../hooks/useFetchLastMessage";
import { useEffect } from "react";
const ChatItem = ({chat, user, isRead}) => {
        const recipient = chat.members.filter((member)=>member?._id!==user?._id)[0]
        const auth   = useSelector(state=>state.auth)
        const userFromAuth = auth.user
        const lastMessage = useFetchLastMessage(chat)
    return ( 
        <Stack 
        className="chat-item"
        direction = "horizontal"
        >
            <div className="chat-item-profile" >
                <img src={`${imageUrl}/profile_images/${recipient?.profileImage}`} alt="" style = {{width: "50px", height: "50px", borderRadius: "50%"}}/>
            </div>
            <Stack className="chat-item-content ms-2" direction="vertical">
                <div className="chat-item-name">{recipient.name}</div>
                <Stack direction="horizontal" className="chat-item-details">
                    <div className = {!isRead? "font-weight-bold chat-item-last-message": "chat-item-last-message"}>{lastMessage?.senderId === userFromAuth._id ? <span style = {{color: "#bb86fc"}}>Bạn: </span> : <span style = {{color: "#bb86fc"}}>{recipient.name}:</span>} {lastMessage?.text}</div>
                    <div className="ms-3">{lastMessage && useConvertTimeLanguage(intlFormatDistance(lastMessage?.createdAt, Date.now()))}</div>
                </Stack>
            </Stack>
            {
                !isRead && <div className="chat-item-circle float-right">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#bb86fc" className="bi bi-circle-fill" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="8"/>
                </svg>
            </div>
            }
        </Stack>
        
     );
}
export default ChatItem;