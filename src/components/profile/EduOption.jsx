import { useDispatch, useSelector } from "react-redux";
import {  updateTempEduOptId } from "../../features/authSlice";
import { showOffCanvasActiveConfirmBtn, showOffCanvasDisabledConfirmBtn } from "../../features/offCanvasSlice";
import { useEffect } from "react";
import { Form } from "react-bootstrap";

const EduOption = ({value, label, id}) => {
    const auth = useSelector(state=>state.auth)
    const dispatch = useDispatch()
    const checked = auth.tempEduOptId == id
    useEffect(()=>{
        if(auth.iniEduOptId == null && auth.tempEduOptId){
            dispatch(showOffCanvasActiveConfirmBtn())
        }else if(auth.iniEduOptId && auth.tempEduOptId !== auth.iniEduOptId){
            dispatch(showOffCanvasActiveConfirmBtn())
        }else{
            dispatch(showOffCanvasDisabledConfirmBtn())
        }
    }, [auth.tempEduOptId])
    return ( 
        <Form.Check // prettier-ignore
                className='mb-3'
                type="radio"
                value={value}
                label={label}
                name = "edu-option"
                checked = {checked}
                readOnly
                onChange={(e)=>{
                    if(e.target.checked){
                        dispatch(updateTempEduOptId(e.target.value))
                    }
                  }}
              />
     );
}
 
export default EduOption;