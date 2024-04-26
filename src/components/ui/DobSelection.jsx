import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import { vi } from 'date-fns/locale/vi';
import { Stack } from "react-bootstrap";
import { useState } from "react";
import { updateTempDob } from "../../features/authSlice";
import { showOffCanvasActiveConfirmBtn } from "../../features/offCanvasSlice";
import { useDispatch, useSelector } from "react-redux";
registerLocale('vi', vi)
const DobSelection = () => {
    const dispatch = useDispatch()
    const iniDob = useSelector(state=>state.auth.iniDob)
    const [startDate, setStartDate] = useState(Date.parse(iniDob));
    return ( 
        <Stack  className="mb-3">
        <DatePicker 
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        locale="vi"
        dateFormat="dd/MM/yyyy"
        className="border-radius-sm p-1"
        selected={startDate} 
        onChange={(date) => {
          setStartDate(date)
          dispatch(updateTempDob(date.toISOString()))
            dispatch(showOffCanvasActiveConfirmBtn())
        }} 
        />
    </Stack>
     );
}
 
export default DobSelection;