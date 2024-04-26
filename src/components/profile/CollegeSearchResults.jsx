import { Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { resetCollegeSearchResults, updateTempColl, updateTempCollId } from "../../features/authSlice";

const CollegeSearchResults = () => {
    const auth = useSelector(state=>state.auth)
    const collegeResults = auth.collegeSearchResults
    const iniCollId = auth.iniCollId
    const tempCollId = auth.tempCollId
    const dispatch = useDispatch()

    return ( 
        <Stack className="college-search-results-wrapper">
            {
                    <Stack 
                    className="college-search-results-container" 
                    direction="vertical"
                    gap = {2}
                    style = {{ maxHeight: "80vh", overflow: "scroll"}}
                    >
                        {
                            collegeResults && collegeResults.length > 0 && collegeResults.map((coll, index)=> {
                                let existed = iniCollId == coll._id || tempCollId == coll._id
                                if(existed){
                                    return <span 
                                    key = {index}
                                    className="college-result college-existed"
                                    style = {{cursor: "not-allowed"}}
                                >
                                    {coll.name}
                                </span>
                                }else{
                                    return <span 
                                    onClick={()=>{
                                        dispatch(updateTempCollId(coll._id))
                                        dispatch(updateTempColl(coll))
                                        dispatch(resetCollegeSearchResults([]))
                                    }}
                                    key = {index}
                                    className="coll-result hoverable-inverse cursor-pointer p-2"
                                >
                                    {coll.name}
                                </span>
                                }
                                
                            })
                        }
                    </Stack>
            }
        </Stack>
     );
}
 
export default CollegeSearchResults;