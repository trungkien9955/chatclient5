import Offcanvas from 'react-bootstrap/Offcanvas';
import OffCanvasConfirmBtn from './OffCanvasConfirmBtn';
import AlertComponent from './Alert';

 const PageOffCanvas = ({ 
    _offCanvasTitle, 
    _offCanvasBody, 
    _offCanvasPlacement, 
    _offCanvasShow, 
    _handleOffCanvasClose,
    _handleOffCanvasConfirm,
    _confirmBtnName,
    _disabledConfirmBtn,
    _offCanvasLoadingStatus,
    _offCanvasActionName,
    _offCanvasData,
    _offCanvasAlertVariant,
    _offCanvasAlertText,
    _offCanvasShowAlert,
}) => {
      return (
    <Offcanvas show={_offCanvasShow}  onHide={_handleOffCanvasClose} placement={_offCanvasPlacement} className = "page-offcanvas">
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
          _data = {_offCanvasData}
          _disabledStatus = {_disabledConfirmBtn}
          _loadingStatus={_offCanvasLoadingStatus}
      />
      {_offCanvasShowAlert && <AlertComponent _alertVariant={_offCanvasAlertVariant} _alertText={_offCanvasAlertText}/>}
    </Offcanvas.Body>
</Offcanvas>
  )
}
export default PageOffCanvas;
