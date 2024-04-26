import SmsIcon from '@mui/icons-material/Sms';
import { Badge } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {Link} from "react-router-dom";
import CustomAxios from '../../utils/CustomAxios';

const MessageNoti = () => {
    const user = useSelector(state=>state.auth.user)
    const homeMessageNotiCount = useSelector(state=>state.home.messageNotiCount)
    const [messageNoti, setMessageNoti] = useState(null)
    useEffect( ()=>{
        const fetchMessageNoti = async()=>{
            try{
                let response =  await CustomAxios.post("/users/fetch-message-noti", {userId: user?._id})
                    setMessageNoti(response?.data?.messageNoti)
            }catch(error){
                console.log(error)
            }
        } 
        fetchMessageNoti()
    }, [homeMessageNotiCount])
    return ( 
        <Link to = "/chats" className="link-light text-decoration-none">
                <Badge 
                badgeContent={messageNoti?.length}
                color = "error"
                >
                    <SmsIcon fontSize="medium" />
                </Badge>
        </Link>
     );
}
 
export default MessageNoti;