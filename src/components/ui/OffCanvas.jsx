import Offcanvas from 'react-bootstrap/Offcanvas';

 const OffCanvas = ({ offCanvasTitle, offCanvasBody, offCanvasPlacement, offCanvasShow, handleOffCanvasClose}) => {
      return (
    <Offcanvas show={offCanvasShow}  onHide={handleOffCanvasClose} placement={offCanvasPlacement}>
    <Offcanvas.Header closeButton>
        <Offcanvas.Title>
            {offCanvasTitle}
        </Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
      {offCanvasBody}
    </Offcanvas.Body>
</Offcanvas>
  )
}
export default OffCanvas;
