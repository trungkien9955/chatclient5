import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CustomAxios from '../../utils/CustomAxios';
const Noti = () => {
    const user = useSelector(state=>state.auth.user)
    const homeNewNotiCount = useSelector(state=>state.home.newNotiCount)
    const [newNotiCount, setNewNotiCount] = useState(null)
    useEffect( ()=>{
        const fetchNewNotiCount = async()=>{
            try{
                let response =  await CustomAxios.post("/home/fetch-new-noti-count", {userId: user?._id})
                    console.log(response.data.newNotiCount)
                    setNewNotiCount(response?.data?.newNotiCount)
            }catch(error){
                console.log(error)
            }
        } 
        fetchNewNotiCount()
    }, [ homeNewNotiCount])
    return ( 
            <Badge 
            badgeContent={newNotiCount}
            color = "error"
            max={99}
            >
                <NotificationsIcon fontSize="medium" />
            </Badge>
     );
}
 
export default Noti;