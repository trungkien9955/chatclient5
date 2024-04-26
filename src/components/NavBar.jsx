import {Container, Nav, Navbar, Stack} from "react-bootstrap";
import SmsIcon from '@mui/icons-material/Sms';
import {Link} from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
// import Notification from "./chat/Notification";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/authSlice";
import { logoutUserfromHome } from "../features/homeSlice";
import { logOutUserFromChat } from "../features/chatSlice";
import MessageNoti from "./chat/MessageNoti";
import { showAppOffCanvas, showNotiOffCanvas } from "../features/offCanvasSlice";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { imageUrl } from "../utils/services";
import Noti from "./home/Noti";
import { logOutUserFromProfile } from "../features/profileSlice";
const NavBar = () => {
    const dispatch = useDispatch()
    // const {user, logoutUser} = useContext(AuthContext)
    const noti = useSelector(state=> state.auth.user.noti)
    const chat = useSelector(state=> state.chat)
    const home = useSelector(state=> state.home)
    const user = useSelector(state=>state.auth.user)
    const handleLogoutUser = () => {
        dispatch(logoutUser())
        // dispatch(logoutUserfromHome())
        // dispatch(logOutUserFromChat())
        // dispatch(logOutUserFromProfile())
    }
   
    return ( 
        <Stack className= "my-nav-bar" direction="horizontal" style={{justifyContent: "space-between"}}>
            <Stack direction="horizontal" gap={1}>
                <div 
                onClick={()=>{
                    dispatch(showAppOffCanvas())
                }}
                className="menu-icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#be29ec" className="bi bi-list menu-icon navbar-item" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                </svg>
                </div>
                <Link className="link-light text-decoration-none" to = "/">
                
                   <div className = "logo-container navbar-item"style={{color: "#be29ec", fontSize: "28px", alignItems: "center", fontWeight: "900"}}><span className="logo-text">AMO DATING</span>
                   <div className="house-icon-container" style = {{transform: "translateY(10)"}}>
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#efbbff" className="bi bi-house-heart-fill" viewBox="0 0 16 16" style = {{stroke: "#660066", strokeWidth: "0.5px"}}>
                    <path d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.707L8 2.207 1.354 8.853a.5.5 0 1 1-.708-.707z"/>
                    <path d="m14 9.293-6-6-6 6V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5zm-6-.811c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.691 0-5.018"/>
                </svg>
                   </div>
                   </div>
                </Link>
            </Stack>
            <Stack 
            direction="horizontal">
                <Stack 
                    direction="horizontal" gap = {3}>
                    <div className="noti-container"
                        onClick={()=>{
                            dispatch(showNotiOffCanvas())
                        }}
                    >
                        <Noti />
                    </div>
                    {
                        <>
                        {
                            <MessageNoti />
                        }
                        </>
                    }
                    <Link to = "/profile">
                    <div className="home-profile-container">
                        {
                            user?.profileImage ? <img className = "home-profile-img" src = {`${imageUrl}/profile_images/${user?.profileImage}`} style = {{width: "40px", height: "40px"}}></img>
                            : <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#cfd8dc" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                          </svg>
                        }
                    </div>
                    </Link>
                </Stack>
            </Stack>
        </Stack>
    );
}
 
export default NavBar;