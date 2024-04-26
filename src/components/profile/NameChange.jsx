import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { showOffCanvasActiveConfirmBtn, showOffCanvasDisabledConfirmBtn } from "../../features/offCanvasSlice";
import { updateTempName } from "../../features/authSlice";

const NameChangeInput = () => {
    const dispatch = useDispatch()
    const auth = useSelector(state=>state.auth)
    let tempName = auth.tempName
    let iniName = auth.iniName

    useEffect(()=>{
        if(tempName !== iniName){
            dispatch(showOffCanvasActiveConfirmBtn())
        }else{
            dispatch(showOffCanvasDisabledConfirmBtn())
        }
    },[tempName])
    return ( 
        <Form.Control 
        type="text" 
        name = "name"
        maxLength = "50"
        defaultValue = {tempName}
        onChange={(e)=>{
          dispatch(updateTempName(e.target.value));
        }}
    />
     );
}
export default NameChangeInput;