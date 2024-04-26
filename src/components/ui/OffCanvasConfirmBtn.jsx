import { Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
const OffCanvasConfirmBtn = ( {
    _name,
    _actionName,
    _handleConfirm,
    _data,
    _disabledStatus,
    _loadingStatus
}) => {
    return ( 
        <Button 
        variant="primary" 
        style = {{backgroundColor: "#bb86fc", border: "none"}}
        action-name = {_actionName}
        data  = {_data}
        onClick={_handleConfirm}
        disabled = {_disabledStatus}
        className='mt-3'
        >
          {!_loadingStatus &&_name}
          {_loadingStatus && <>
         <span className='me-2'>Đang xử lý</span>
         <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        </>
          }
        </Button>
     );
}
export default OffCanvasConfirmBtn;