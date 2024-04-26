import { Form, Stack } from "react-bootstrap";
import HobbySearchResults from "./HobbySearchResults";
import { useDispatch, useSelector } from "react-redux";
import { getHobbySearchResults } from "../../features/authSlice";

const HobbySearch = () => {
    const dispatch = useDispatch()
    const auth = useSelector(state=>state.auth)
    const disabled = auth.tempHobbies.length == 20
    return ( 
        <Stack className="hobby-search">
            <Form.Control 
            onChange={(e)=>{
              dispatch(getHobbySearchResults(e.target.value))
            }}
            type="text" 
            placeholder={disabled? "Đã chọn tối đa" : "Tìm sở thích..."} 
            className='mb-2'
            disabled = {disabled}
            />
            <HobbySearchResults/>
        </Stack>
     );
}
export default HobbySearch;