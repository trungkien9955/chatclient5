import {useEffect, useState} from "react"
import {baseUrl, getRequest} from "../utils/services"
import CustomAxios from "../utils/CustomAxios"
export const useFetchRecipientUser =  (chat, user) =>{
    const [recipientUser, setRecipientUser] = useState(null)
    const [error, setError] = useState(null)
    const recipientId = chat?.members.find((id) => id!==user?._id)

    useEffect(()=> {
        const getUser = async()=>{
            if(!recipientId) return null
            const response = await CustomAxios.get(`/users/find/${recipientId}`)
            if(response.error){
                return setError(error)
            }
            response = response.data
            setRecipientUser(response)
        }
        getUser()
    }, [recipientId])
    return {recipientUser}
}