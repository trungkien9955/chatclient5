import { Badge } from "@mui/material";
import NextWeekIcon from '@mui/icons-material/NextWeek';
import { Stack } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {  removeFromTempJobIdArray, removeFromTempJobs } from "../../features/authSlice";
const JobContainer = ({name, jobId}) => {
    const dispatch = useDispatch()
    return ( 
        <Stack className="job-wrapper" direction = "horizontal" >
            <Badge 
              color="secondary" 
              className="hoverable"
              badgeContent={
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16" job-id = {jobId}
              onClick = {(e)=>{
                dispatch(removeFromTempJobs(e.target.getAttribute("job-id")))
                dispatch(removeFromTempJobIdArray(e.target.getAttribute("job-id")))
            }}
              >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              
            </svg>
            }  
              >
              <Stack className="job-container" direction = "horizontal" gap = {1}>
                <NextWeekIcon/>
              <span>{name}</span>
              </Stack>
              </Badge>
        </Stack>
     );
}
export default JobContainer;