import { Col, Stack, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const UploadedImgContainer = () => {
    const tempImg = useSelector(state=>state.auth.tempProfImg)
    // useEffect(()=>{
       
    // }, [tempImg])
    return ( 
        <Stack>
        <Row>
  <Col sm = "6">
              <img 
              src = {tempImg && tempImg}  
              className="mt-2" 
              style = {{width: "100%", maxHeight: "360px",borderRadius:"5%"}}>
            </img>
              </Col>
        </Row>
       </Stack>
     );
}
 
export default UploadedImgContainer;