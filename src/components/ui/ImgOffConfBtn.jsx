import Button from 'react-bootstrap/Button';
const ImgOffConfBtn = ( {
    _actionName,
    _handleConfirm,
    _disabledStatus,
}) => {
    return ( 
        <Button 
        variant="primary" 
        style = {{backgroundColor: "#bb86fc", border: "none"}}
        action-name = {_actionName}
        onClick={_handleConfirm}
        disabled = {_disabledStatus}
        className='mt-3'
        >
            Lưu
        </Button>
     );
}
export default ImgOffConfBtn;