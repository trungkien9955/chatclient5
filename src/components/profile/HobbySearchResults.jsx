import { Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToTempHobbies, addToTempHobbyIdArray, removeFromTempHobbies } from "../../features/authSlice";

const HobbySearchResults = () => {
    const auth = useSelector(state=>state.auth)
    const hobbyResults = auth.hobbySearchResults
    const initialHobbyIdArray = auth.initialHobbyIdArray
    const tempHobbyIdArray = auth.tempHobbyIdArray

    const dispatch = useDispatch()
    return ( 
        <Stack className="hobby-search-results-wrapper">
            {
                    <Stack 
                    className="hobby-search-results-container" 
                    direction="horizontal"
                    gap = {2}
                    style = {{flexWrap: "wrap"}}
                    >
                        {
                            hobbyResults && hobbyResults.length > 0 && hobbyResults.map((hobby, index)=> {
                                let existed = initialHobbyIdArray.includes(hobby._id) || tempHobbyIdArray.includes(hobby._id)
                                if(existed){
                                    return <span 
                                    key = {index}
                                    className="hobby-result hobby-existed"
                                    style = {{cursor: "not-allowed"}}
                                >
                                    {hobby.name}
                                </span>
                                }else{
                                    return <span 
                                    onClick={()=>{
                                        dispatch(addToTempHobbyIdArray(hobby._id))
                                        dispatch(addToTempHobbies(hobby))

                                        
                                    }}
                                    key = {index}
                                    className="hobby-result hoverable-inverse"
                                >
                                    {hobby.name}
                                </span>
                                }
                                
                            })
                        }
                    </Stack>
            }
        </Stack>
     );
}
 
export default HobbySearchResults;