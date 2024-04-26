import { Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { showOffCanvasActiveConfirmBtn, showOffCanvasDisabledConfirmBtn } from "../../features/offCanvasSlice";
import CollegeContainer from "./CollegeContainer";

const TempCollege = () => {
    const dispatch = useDispatch()
    const auth = useSelector(state=>state.auth)
    const tempColl = auth.tempColl
    const iniColl = auth.iniColl
    useEffect(()=>{
        if(!iniColl && tempColl){
            dispatch(showOffCanvasActiveConfirmBtn())
        }else if(iniColl && tempColl && iniColl._id !== tempColl._id){
            dispatch(showOffCanvasActiveConfirmBtn())
        }else if(iniColl && !tempColl){
            dispatch(showOffCanvasActiveConfirmBtn())
        } else{
            dispatch(showOffCanvasDisabledConfirmBtn())
        }
    }, [tempColl])
    return ( 
        <Stack className="mt-2">
            <hr />
            <span className="mb-2">Đã chọn {tempColl? "1": ""} (Tối đa 1):</span>
            {
                tempColl && <Stack 
                className="temp-coll-container mt-1" 
                direction="vertical" 
                gap={3}
                >
                            <CollegeContainer  name  = {tempColl.name}  collId = {tempColl._id}/>
                </Stack>
            }
            {
               tempColl  && <span className="mt-2">Đã đạt tối đa. Bạn chỉ có thể chọn trường mới khi xóa trường đã chọn.</span>
            }
        </Stack>
     );
}

export default TempCollege;