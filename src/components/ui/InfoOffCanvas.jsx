import Offcanvas from 'react-bootstrap/Offcanvas';


 const InfoOffCanvas = ({  
    _infoOffCanvasShow, 
    _infoOffTitle,
    _infoOffBody,
    _handleInfoOffCanvasClose,
}) => {
      return (
    <Offcanvas show={_infoOffCanvasShow}  onHide={_handleInfoOffCanvasClose} placement="end" className= "noti-offcanvas">
    <Offcanvas.Header closeButton>
        <Offcanvas.Title>
            <div className='custom-offcanvas-title'>{_infoOffTitle}</div>
        </Offcanvas.Title>
    </Offcanvas.Header>
    <hr />
    <Offcanvas.Body>
        {_infoOffBody}
    </Offcanvas.Body>
</Offcanvas>
  )
}
export default InfoOffCanvas;
