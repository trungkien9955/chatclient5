import { Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToTempJobIdArray, addToTempJobs } from "../../features/authSlice";

const JobSearchResults = () => {
    const auth = useSelector(state=>state.auth)
    const jobResults = auth.jobSearchResults
    const iniJobIdArray = auth.iniJobIdArray
    const tempJobIdArray = auth.tempJobIdArray
    const dispatch = useDispatch()
    return ( 
        <Stack className="job-search-results-wrapper">
            {
                    <Stack 
                    className="job-search-results-container" 
                    direction="horizontal"
                    gap = {2}
                    style = {{flexWrap: "wrap"}}
                    >
                        {
                            jobResults && jobResults.length > 0 && jobResults.map((job, index)=> {
                                let existed = iniJobIdArray.includes(job._id) || tempJobIdArray.includes(job._id)
                                if(existed){
                                    return <span 
                                    key = {index}
                                    className="job-result job-existed"
                                    style = {{cursor: "not-allowed"}}
                                >
                                    {job.name}
                                </span>
                                }else{
                                    return <span 
                                    onClick={()=>{
                                        dispatch(addToTempJobIdArray(job._id))
                                        dispatch(addToTempJobs(job))   
                                    }}
                                    key = {index}
                                    className="job-result hoverable-inverse"
                                >
                                    {job.name}
                                </span>
                                }
                                
                            })
                        }
                    </Stack>
            }
        </Stack>
     );
}
 
export default JobSearchResults;