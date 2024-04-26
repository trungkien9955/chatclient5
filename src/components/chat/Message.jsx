import { intlFormatDistance } from "date-fns";
import useConvertTimeLanguage from "../../hooks/useConvertTimeLanguage";
import { Stack } from "react-bootstrap";

const Message = ({...props}) => {
    const time = useConvertTimeLanguage(intlFormatDistance(props.createdAt, Date.now()))
    return ( 
        <div  
            > 
            <Stack className={props.message.senderId == props.user._id ? "float-end message" : "float-start message"}
            >
                <div >
                    <div className={props.message.senderId == props.user._id ? "user-message float-end" : "recipient-message float-start"}>
                    {props.message.text}
                    </div>
                </div>
                <div><div className={props.message.senderId == props.user._id ? "message-date float-end" : "message-date float-start"}>
                        {time}
                    </div>
                    </div>
            </Stack>
        </div>
     );
}
 
export default Message;