import { useDispatch, useSelector } from "react-redux";
import {  updateTempSmokingOptId } from "../../features/authSlice";
import { showOffCanvasActiveConfirmBtn, showOffCanvasDisabledConfirmBtn } from "../../features/offCanvasSlice";
import { useEffect } from "react";
import { Form } from "react-bootstrap";

const SmokingOption = ({index, value, label, id}) => {
    const auth = useSelector(state=>state.auth)
    const dispatch = useDispatch()
    const checked = auth.tempSmokingOptId == id
    useEffect(()=>{
        if(auth.iniSmokingOptId == null && auth.tempSmokingOptId){
            dispatch(showOffCanvasActiveConfirmBtn())
        }else if(auth.iniSmokingOptId && auth.tempSmokingOptId !== auth.iniSmokingOptId){
            dispatch(showOffCanvasActiveConfirmBtn())
        }else{
            dispatch(showOffCanvasDisabledConfirmBtn())
        }
    }, [auth.tempSmokingOptId])
    return ( 
        <Form.Check // prettier-ignore
                className='mb-3'
                key={index}
                type="radio"
                value={value}
                label={label}
                name = "smoking-option"
                checked = {checked}
                readOnly
                onChange={(e)=>{
                    if(e.target.checked){
                        dispatch(updateTempSmokingOptId(e.target.value))
                    }
                  }}
              />
     );
}
 
export default SmokingOption;