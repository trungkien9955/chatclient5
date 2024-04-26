import { useContext, useEffect, useState } from "react"
import { ChatContext } from "../context/ChatContext"
import { baseUrl, getRequest } from "../utils/services"
import CustomAxios from "../utils/CustomAxios"

export const useFetchLatestMessage = (chat) =>{
    const {newMessage, notifications} = useContext(ChatContext)
    const [latestMessage, setLatestMessage] = useState(null)
    useEffect(()=>{
        const getMessages = async()=>{
            let response = await CustomAxios.get(`/messages/${chat?._id}`)
            if(response.error){
                return console.log("Error getting messages", error)
            }
            response = response.data
            const lastMessage = response[response?.length - 1]
            setLatestMessage(lastMessage)
        }
        getMessages()
    }, [newMessage, notifications])
    return {latestMessage}
}