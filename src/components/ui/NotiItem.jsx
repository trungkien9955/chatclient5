import { Stack } from "react-bootstrap";
import { imageUrl } from "../../utils/services";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeNotiOffCanvas } from "../../features/offCanvasSlice";
import { intlFormatDistance } from "date-fns";
import useConvertTimeLanguage from "../../hooks/useConvertTimeLanguage";
import { updateNotiAsRead } from "../../features/homeSlice";

const NotiItem = ({_id, isRead, img, text, createdAt, type}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const time = useConvertTimeLanguage(intlFormatDistance(createdAt, Date.now()))
    const url = type == "like"? "/fans": type == "reject"? "/liked-strangers": type == "match"? "/matches": type == "remove-match"? "/matches": "/fans"
    return ( 
        <Stack 
            className={isRead ? "noti-item read hoverable cursor-pointer" : "noti-item not-read hoverable cursor-pointer"}
            direction = "vertical"
            onClick={()=>{
                dispatch(closeNotiOffCanvas())
                dispatch(updateNotiAsRead(_id))
                navigate(url)
            }}
            >
                <Stack
                direction = "horizontal"
                >
                <div className="noti-cirle-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill={isRead? "#1d1d1d": "#bb86fc"} className="bi bi-circle-fill" viewBox="0 0 16 16">
                        <circle cx="8" cy="8" r="8"/>
                    </svg>
                </div>
                <div className="noti-image-container ms-2">
                    <img src = {`${imageUrl}/profile_images/${img}`} alt="" />
                </div>
                <div className="noti-body-container ms-2">
                    {text}
                </div>
                </Stack>
                <div className="noti-time">
                {time}
                </div>
        </Stack>
     );
}
 
export default NotiItem;