import { useEffect } from "react";
import { Form, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { showOffCanvasActiveConfirmBtn, showOffCanvasDisabledConfirmBtn } from "../../features/offCanvasSlice";
import { updateTempBio } from "../../features/authSlice";

const BioInput = () => {
    const dispatch = useDispatch()
    const auth = useSelector(state=>state.auth)
    let tempBio = auth.tempBio
    let iniBio = auth.iniBio

    useEffect(()=>{
        if(tempBio !== iniBio){
            dispatch(showOffCanvasActiveConfirmBtn())
        }else{
            dispatch(showOffCanvasDisabledConfirmBtn())
        }
    },[tempBio])
    return ( 
        <Stack>
        <Form.Group className="mb-3" controlId="bio">
          <Form.Label>Giới thiệu về bạn</Form.Label>
          <Form.Control 
          as="textarea" 
          rows={3} 
          defaultValue = {tempBio}
          onChange={(e)=>{
            dispatch(updateTempBio(e.target.value));
          }}
          />
        </Form.Group>
      </Stack>
     );
}
export default BioInput;