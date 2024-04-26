import Modal from 'react-bootstrap/Modal';
import TextModalConfirmBtn from './TexModalConfirmBtn';

function TextModal ({
    _modalShow, 
    _handleModalClose, 
    _modalTitle, 
    _modalBody, 
    _handleModalConfirm, 
    _modalActionName,
    _data,
    _msg,
    _successMsgShow,
    _errMsgShow,
    _modalBtnShow,
}) {
  return (
    
      <Modal 
      size='sm'
      show={_modalShow} 
      centered = {true}
      dialogClassName="text-modal modal-90w"
      onHide={_handleModalClose} 
      >
        <Modal.Header closeButton>
          <Modal.Title>{_modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{_modalBody}</Modal.Body>
        <Modal.Footer>
          <TextModalConfirmBtn 
          _actionName={_modalActionName} 
          _handleConfirm={_handleModalConfirm}
          _data={_data}
          _btnShow = {_modalBtnShow}
          />
        </Modal.Footer>
        <Modal.Footer>
         { _successMsgShow && <span className='color-bs-success'>{_msg}</span>}
          {_errMsgShow && <span className='color-bs-danger'>{_msg}</span>}
        </Modal.Footer>
      </Modal>
    
  );
}

export default TextModal;