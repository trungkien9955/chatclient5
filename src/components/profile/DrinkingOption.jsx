import { useDispatch, useSelector } from "react-redux";
import {  updateTempDrinkingOptId } from "../../features/authSlice";
import { showOffCanvasActiveConfirmBtn, showOffCanvasDisabledConfirmBtn } from "../../features/offCanvasSlice";
import { useEffect } from "react";
import { Form } from "react-bootstrap";

const DrinkingOption = ({index, value, label, id}) => {
    const auth = useSelector(state=>state.auth)
    const dispatch = useDispatch()
    const checked = auth.tempDrinkingOptId == id
    useEffect(()=>{
        if(auth.iniDrinkingOptId == null && auth.tempDrinkingOptId){
            dispatch(showOffCanvasActiveConfirmBtn())
        }else if(auth.iniDrinkingOptId && auth.tempDrinkingOptId !== auth.iniDrinkingOptId){
            dispatch(showOffCanvasActiveConfirmBtn())
        }else{
            dispatch(showOffCanvasDisabledConfirmBtn())
        }
    }, [auth.tempDrinkingOptId])
    return ( 
        <Form.Check // prettier-ignore
                className='mb-3'
                key={index}
                type="radio"
                value={value}
                label={label}
                name = "drinking-option"
                checked = {checked}
                readOnly
                onChange={(e)=>{
                    if(e.target.checked){
                        dispatch(updateTempDrinkingOptId(e.target.value))
                    }
                  }}
              />
     );
}
 
export default DrinkingOption;