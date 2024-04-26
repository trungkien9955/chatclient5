import { Form, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {  getJobSearchResults } from "../../features/authSlice";
import JobSearchResults from "./JobSearchResults";

const JobSearch = () => {
    const dispatch = useDispatch()
    const auth = useSelector(state=>state.auth)
    const disabled = auth.tempJobs.length == 3
    return ( 
        <Stack className="job-search">
            <Form.Control 
            onChange={(e)=>{
              dispatch(getJobSearchResults(e.target.value))
            }}
            type="text" 
            placeholder={disabled? "Đã chọn tối đa..." : "Tìm nghề nghiệp..."} 
            className='mb-2'
            disabled = {disabled}
            />
            <JobSearchResults/>
        </Stack>
     );
}
export default JobSearch;