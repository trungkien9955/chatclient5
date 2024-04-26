import {  useEffect, useState } from "react"
import CustomAxios from "../utils/CustomAxios"

export const useFetchLastMessage = (chat) =>{
    const [lastMessage, setLastMassage] = useState(null)
    useEffect(()=>{
        const getLastMessage = async()=>{
            try{
                let response = await CustomAxios.get(`/chats/get-messages/${chat?._id}`)
              let messages = response?.data.messages
                console.log(messages)
                const lastMessage = messages[messages?.length - 1]
                setLastMassage(lastMessage)
            }catch(error){
                console.log("Error getting messages", error)
            }
        }
        getLastMessage()
    }, [])
    return lastMessage
}