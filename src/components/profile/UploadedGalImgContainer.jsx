import { useEffect } from "react";
import { Col, Stack, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const UploadedGalImgContainer = () => {
    const tempGalImages = useSelector(state=>state.auth.tempGalImages)
    useEffect(()=>{
        console.log(tempGalImages)
    }, [tempGalImages])
    return ( 
        <Stack>
            <Row>
            {
                tempGalImages.length > 0 && tempGalImages.map((image)=>{
                    return <Col xs = {4}>
                    <img 
                    src = {image}  
                    className="mt-1" 
                    style = {{width: "100%", maxHeight: "240px",borderRadius:"5%"}}>
                  </img>
                    </Col>
                })
            }
        </Row>
       </Stack>
     );
}
export default UploadedGalImgContainer;