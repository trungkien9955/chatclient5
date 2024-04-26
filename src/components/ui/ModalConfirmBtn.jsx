import Button from 'react-bootstrap/Button';
const ModalConfirmBtn = ( {
    _actionName,
    _handleConfirm,
    _btnShow
}) => {
    return ( 
        <Button 
        action-name = {_actionName} 
        onClick = {_handleConfirm}
        disabled= {_btnShow}
        style={{backgroundColor: "#bb86fc", border: "none"}}
        >
        Xác nhận
      </Button>
     );
}
export default ModalConfirmBtn;