import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import ModalConfirmBtn from './ModalConfirmBtn';

function PageModal ({
    _pgMdShow, 
    _handlePgMdClose, 
    _pgMdTitle, 
    _pgMdbody, 
    _handleConfirm, 
    _alertVariant, 
    _alertText, 
    _btnShow, 
    _pgMdAction,
}) {
  return (
      <Modal 
      show={_pgMdShow} 
      onHide={_handlePgMdClose} 
      centered
      dialogClassName='page-modal'
      size='sm'
      >
        <Modal.Header closeButton>
          <Modal.Title>{_pgMdTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{_pgMdbody}</Modal.Body>
        <Modal.Body>
        {
            _alertVariant && <Alert variant={_alertVariant}>{_alertText}</Alert>
        }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=> {
            _handlePgMdClose()
          }}>
            Hủy bỏ
          </Button>
          <ModalConfirmBtn 
          _actionName={_pgMdAction} 
          _handleConfirm={_handleConfirm}
          _disabledStatus={_btnShow}
          />
        </Modal.Footer>
      </Modal>
  );
}

export default PageModal;