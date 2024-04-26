import Offcanvas from 'react-bootstrap/Offcanvas';
import OffCanvasConfirmBtn from './OffCanvasConfirmBtn';
import AlertComponent from './Alert';

 const BottomOffCanvas = ({ 
    _offCanvasTitle, 
    _offCanvasBody, 
    _offCanvasShow, 
    _handleOffCanvasClose,
    _handleOffCanvasConfirm,
    _confirmBtnName,
    _disabledConfirmBtn,
    _offCanvasActionName,
    _offCanvasAlertVariant,
    _offCanvasAlertText,
    _offCanvasShowAlert,
}) => {
      return (
    <Offcanvas show={_offCanvasShow}  onHide={_handleOffCanvasClose} placement="end" className = "bottom-offcanvas">
    <Offcanvas.Header closeButton>
        <Offcanvas.Title>
            {_offCanvasTitle}
        </Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
      {_offCanvasBody}
      <OffCanvasConfirmBtn
          _name = {_confirmBtnName}
          _actionName = {_offCanvasActionName}
          _handleConfirm = {_handleOffCanvasConfirm}
          _disabledStatus = {_disabledConfirmBtn}
      />
      {_offCanvasShowAlert && <AlertComponent _alertVariant={_offCanvasAlertVariant} _alertText={_offCanvasAlertText}/>}
    </Offcanvas.Body>
</Offcanvas>
  )
}
export default BottomOffCanvas;
