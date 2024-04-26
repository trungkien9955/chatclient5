import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
function ModalTemplate({_modalShow, _handleModalShow, _handleModalClose, _modalTitle, _modalBody, _isCentered, _handleModalConfirm, _handleModalCancel}) {
  return (
    <>
      <Modal show={_modalShow} onHide={_handleModalClose} centered = {_isCentered} size='sm'>
        <Modal.Header closeButton>
          <Modal.Title>{_modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{_modalBody}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=> {
            _handleModalCancel()
            _handleModalClose()
            
          }}>
            Đóng
          </Button>
          <Button variant="primary" onClick={_handleModalConfirm}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalTemplate;