import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { closeTextModal } from '../../features/textModalSlice';
const TextModalConfirmBtn = ( {
    _actionName,
    _handleConfirm,
    _data,
    _btnShow
}) => {
    const dispatch  = useDispatch()
    return ( 
        <Button 
        variant="primary" 
        style={{backgroundColor: "#bb86fc", border: "none"}}
        action-name = {_actionName} 
        data = {_data} 
        disabled = {!_btnShow}  
        className={_btnShow ? "": "faded cursor-not-allowed"}
        onClick = {_handleConfirm}
        >
        Xác nhận
      </Button>
     );
}
export default TextModalConfirmBtn;