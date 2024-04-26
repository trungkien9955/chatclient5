import { Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import HobbyContainer from "./HobbyContainer";
import { useEffect } from "react";
import { showOffCanvasActiveConfirmBtn, showOffCanvasDisabledConfirmBtn } from "../../features/offCanvasSlice";

const TempHobbies = () => {
    const dispatch = useDispatch()
    const auth = useSelector(state=>state.auth)
    const tempHobbies = auth.tempHobbies
    const initialHobbies = auth.initialHobbies
    const tempHobbyIdArray = [...auth.tempHobbyIdArray]
    const initialHobbyIdArray = [...auth.initialHobbyIdArray]
    useEffect(()=>{
        if(tempHobbies?.length !==initialHobbies?.length){
            dispatch(showOffCanvasActiveConfirmBtn())
            
        }else{
            if(tempHobbyIdArray?.sort((a,b)=>{return a-b}).every((element, index)=> element == initialHobbyIdArray?.sort((a,b)=>{return a-b})[index])) {
                dispatch(showOffCanvasDisabledConfirmBtn())
            }
        }
    }, [tempHobbies])
    return ( 
        <Stack className="mt-2">
            <hr />
            <span className="mb-2">Đã chọn {tempHobbyIdArray?.length} (Tối đa 20):</span>
            {
                tempHobbies && tempHobbies?.length > 0 && <Stack 
                className="temp-hobbies-container mt-1" 
                direction="horizontal" 
                gap={3}
                style = {{flexWrap: "wrap"}}
                >
                    {
                        tempHobbies.map((tempHobby, index)=>{
                            return <HobbyContainer key = {index} name  = {tempHobby.name} type = {tempHobby.type} hobbyId = {tempHobby._id}/>
                        })
                    }
                </Stack>
            }
        </Stack>
     );
}
 
export default TempHobbies;