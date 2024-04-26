import { Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { showOffCanvasActiveConfirmBtn, showOffCanvasDisabledConfirmBtn } from "../../features/offCanvasSlice";
import JobContainer from "./JobContainer";

const TempJobs = () => {
    const dispatch = useDispatch()
    const auth = useSelector(state=>state.auth)
    const tempJobs = auth.tempJobs
    const iniJobs = auth.iniJobs
    const tempJobIdArray = [...auth.tempJobIdArray]
    const iniJobIdArray = [...auth.iniJobIdArray]
    useEffect(()=>{
        if(tempJobs?.length !==iniJobs?.length){
            dispatch(showOffCanvasActiveConfirmBtn())
        }else{
            if(tempJobIdArray?.sort((a,b)=>{return a-b}).every((element, index)=> element == iniJobIdArray?.sort((a,b)=>{return a-b})[index])) {
                dispatch(showOffCanvasDisabledConfirmBtn())
            }
        }
    }, [tempJobs])
    return ( 
        <Stack className="mt-2">
            <hr />
            <span className="mb-2">Đã chọn {tempJobIdArray?.length} (Tối đa 3):</span>
            {
                tempJobs && tempJobs?.length > 0 && <Stack 
                className="temp-jobs-container mt-1" 
                direction="horizontal" 
                gap={3}
                style = {{flexWrap: "wrap"}}
                >
                    {
                        tempJobs.map((tempJob, index)=>{
                            return <JobContainer key = {index} name  = {tempJob.name}  jobId = {tempJob._id}/>
                        })
                    }
                </Stack>
            }
            {
                tempJobs && tempJobs?.length ==3  && <span className="mt-2">Đã đạt tối đa. Bạn chỉ có thể chọn thêm khi xóa nghề nghiệp cũ.</span>
            }
        </Stack>
     );
}

export default TempJobs;