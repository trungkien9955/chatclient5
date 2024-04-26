import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

function InfoModal ({
    _infMdShow,  
    _handleInfMdClose, 
    _infMdTitle, 
    _infMdBody, 
}) {
  return (
    
      <Modal 
      size='sm'
      show={_infMdShow} 
      centered = {true}
      dialogClassName="info-modal"
      onHide={_handleInfMdClose} 
      >
        <Modal.Header closeButton>
          <Modal.Title>{_infMdTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{_infMdBody}</Modal.Body>
        <Modal.Footer>
        <Button
        variant='primary'
        style={{backgroundColor:"#bb86fc", border: "none"}}
        onClick={_handleInfMdClose}
        >OK</Button>
        </Modal.Footer>
      </Modal>
    
  );
}
export default InfoModal;