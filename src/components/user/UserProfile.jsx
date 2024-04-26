import { Badge } from "@mui/material";
import { imageUrl } from "../../utils/services";
import { useSelector } from "react-redux";

const UserProfile = ({userId, img}) => {
    const onlineUsers = useSelector(state=>state.chat.onlineUsers)
    const isOnline = onlineUsers.some((user)=>user._id === userId)
    return ( <>
        {
            isOnline ? 
        <Badge color="success" overlap="circular" badgeContent=" " >
            <img src = {`${imageUrl}/profile_images/${img}`} style={{width: "50px", height: "50px", borderRadius: "50%"}}></img> 
        </Badge>
    
    : 
   
        <Badge color="" overlap="circular" badgeContent=" " >
            <img src = {`${imageUrl}/profile_images/${img}`} style={{width: "50px", height: "50px", borderRadius: "50%"}}></img> 
        </Badge>
    
    
        }
    </>
     );
}
export default UserProfile;
