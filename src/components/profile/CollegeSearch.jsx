import { Form, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {  getCollegeSearchResults } from "../../features/authSlice";
import CollegeSearchResults from "./CollegeSearchResults";

const CollegeSearch = () => {
    const dispatch = useDispatch()
    const auth = useSelector(state=>state.auth)
    const disabled = auth.tempColl
    return ( 
        <Stack className="college-search offcanvas-search">
            <Form.Control 
            onChange={(e)=>{
              dispatch(getCollegeSearchResults(e.target.value))
            }}
            type="text" 
            placeholder={disabled? "Đã chọn tối đa..." : "Tìm trường..."} 
            className='mb-2'
            disabled = {disabled}
            />
            <CollegeSearchResults/>
        </Stack>
     );
}
export default CollegeSearch;