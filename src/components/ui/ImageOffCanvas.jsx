import Offcanvas from 'react-bootstrap/Offcanvas';
import OffCanvasConfirmBtn from './OffCanvasConfirmBtn';
import AlertComponent from './Alert';
import ImgOffConfBtn from './ImgOffConfBtn';

 const ImgOff = ({ 
    _imgOffTitle, 
    _imgOffBody, 
    _imgOffShow, 
    _handleImgOffClose,
    _imgOffDBtn,
    _handleImgOffConfBtn,
    _imgOffActionName,
    _imgOffAlertText,
    _imgOffAlertVariant,
    _imgOffAlertShow,
}) => {
      return (
    <Offcanvas show={_imgOffShow}  onHide={_handleImgOffClose} placement="end" className = "img-offcanvas">
    <Offcanvas.Header closeButton>
        <Offcanvas.Title>
            {_imgOffTitle}
        </Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
      {_imgOffBody}
      {_imgOffAlertShow && <AlertComponent _alertVariant={_imgOffAlertVariant} _alertText={_imgOffAlertText}/>}
    </Offcanvas.Body>
</Offcanvas>
  )
}
export default ImgOff;
