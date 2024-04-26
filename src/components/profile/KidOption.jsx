import { useDispatch, useSelector } from "react-redux";
import { updateTempKidOptId } from "../../features/authSlice";
import { showOffCanvasActiveConfirmBtn, showOffCanvasDisabledConfirmBtn } from "../../features/offCanvasSlice";
import { useEffect } from "react";
import { Form } from "react-bootstrap";

const KidOption = ({index, value, label, id}) => {
    const auth = useSelector(state=>state.auth)
    const dispatch = useDispatch()
    const checked = auth.tempKidOptId == id
    useEffect(()=>{
        if(auth.iniKidOptId == null && auth.tempKidOptId){
            dispatch(showOffCanvasActiveConfirmBtn())
        }else if(auth.iniKidOptId && auth.tempKidOptId !== auth.iniKidOptId){
            dispatch(showOffCanvasActiveConfirmBtn())
        }else{
            dispatch(showOffCanvasDisabledConfirmBtn())
        }
    }, [auth.tempKidOptId])
    return ( 
        <Form.Check // prettier-ignore
                className='mb-3'
                key={index}
                type="radio"
                value={value}
                label={label}
                name = "kid-option"
                checked = {checked}
                readOnly
                onChange={(e)=>{
                    if(e.target.checked){
                        dispatch(updateTempKidOptId(e.target.value))
                    }else{
                        dispatch(updateTempKidOptId(null))
                    }
                  }}
              />
     );
}
 
export default KidOption;