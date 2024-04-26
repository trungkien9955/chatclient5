import { Button, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addEmoji, resetMessage, sendMessage, toggleEmojiPicker, updateNewMessage } from "../../features/chatSlice";
import { Form } from "react-bootstrap";
import ChatBoxMessages from "./ChatBoxMessages";
import EmojiPicker from "emoji-picker-react"
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

import {  useRef } from "react";
import UserProfile from "../user/UserProfile";
const ChatBox = () => {
    const chat = useSelector(state => state.chat)
    const auth = useSelector(state=> state.auth)
    const dispatch = useDispatch()
    const newMessage = chat.newMessage
    const ref = useRef(null)
    return ( 
        <Stack className="chat-box-section"
        style = {{ width: "100%", height: "100%"}}
        >
            <Stack 
                className="chatbox-header p-2 surface-3"
                direction="horizontal"
                gap={2}
                >
                    <div className="chat-box-recipient-profile">
                    <UserProfile userId ={chat.recipient?._id} img = {chat.recipient?.profileImage}/>
                    </div>
                    <div className="chat-box-recipient-name text-ell">
                        {chat.recipient?.name}
                    </div>
            </Stack>
                <ChatBoxMessages />
            <Stack className="chat-input-container px-4">
                <Stack className="emoji-picker-container">
                        <EmojiPicker
                        open= {chat.emojiPickerShow}
                        onEmojiClick = {(e)=>{
                            dispatch(addEmoji(e.emoji))
                        }}
                        width = "100%"
                        height="370px"
                        lazyLoadEmojis = "true"
                        skinTonesDisabled = "true"
                        searchDisabled = "true"
                        categories={['smileys_people']}
                        theme="dark"
                        className="emoji-wrapper"
                        />
                </Stack>
                <Stack className="chat-box-input" direction = "horizontal">
                    <Form.Control 
                    onChange = {(e)=>{
                        dispatch(updateNewMessage(e.target.value))
                    }}
                    value = {newMessage || ""}
                    />
                    <div 

                    className="emoji-icon-container p-2" 
                    style = {{color: "gold"}}
                    onClick={()=>{
                        dispatch(toggleEmojiPicker())
                    }}
                    >
                    <EmojiEmotionsIcon 
                    fontSize="large"/>
                    </div>
                    <Button
                    className="send-message-btn"
                    onClick = {(e)=>{
                        e.preventDefault()
                        dispatch(sendMessage({
                            text: chat.newMessage,
                            sender: auth.user,
                            recipient: chat.recipient,
                            chatId: chat.currentChat._id,
                            createdAt: Date.now()
                        }))
                        dispatch(resetMessage(null))
                    }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
                            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
                        </svg>
                    </Button>
                </Stack>
            </Stack>
        </Stack>
     );
}
export default ChatBox;