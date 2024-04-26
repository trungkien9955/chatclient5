import { useEffect, useState } from "react"
import { baseUrl, postRequest } from "../utils/services"
import { intlFormatDistance } from "date-fns"
import useConvertTimeLanguage from "./useConvertTimeLanguage"
import CustomAxios from "../utils/CustomAxios"

const useFetchLastMessageTime = (chatId)=>{
    const [lastMessageTime, setLastMessageTime] = useState()
    useEffect(()=>{
        const getLastMessageTime = async()=>{
            try{
                let response = await CustomAxios.post(`/chats/get-last-message-time`, {chatId: chatId})
                if(response){
                    response= response.data
                    setLastMessageTime(response)
                }
            }catch(error){
                console.log(error)
            }
        }
        getLastMessageTime()
    }, [])
    return lastMessageTime
}
export default useFetchLastMessageTime