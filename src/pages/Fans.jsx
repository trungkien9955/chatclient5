import { Alert, Container, Stack } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import {Card} from "react-bootstrap"
import { imageUrl } from "../utils/services";
import PageModal from "../components/ui/PageModal";
import { useEffect, useState } from "react";
import { showModalForLikedStrangerRemoveConfirm, cancelModal, closeModal, confirmModal, resetModal, showPgMd, preparePgMdForRemovingFan, closePgMd, showPgMdBtn, hidePgMdBtn, showPgMdSuccessAlert, resetPgMd } from "../features/modalSlice";
import TextModal from "../components/ui/TextModal";
import { closeTextModal, showTextModalForLikedStrangerRemoveConfirm } from "../features/textModalSlice";
import { createChat, createMatch, removeFan, removeLikedStranger } from "../features/authSlice";
import {  getStrangerProfile, updateRemovedFanId } from "../features/homeSlice";
import AlertComponent from "../components/ui/Alert";
import CustomAxios from "../utils/CustomAxios";
const Fans = () => {
    const home = useSelector(state=>state.home)
    // const fans = home.fans
    const user = useSelector(state=>state.auth.user)
    const modal = useSelector(state=>state.modal)
    const textModal = useSelector(state=>state.textModal)
    const removedFanId = useSelector(state=>state.home.removedFanId)
    const dispatch = useDispatch()
    const [fans, setFans] = useState(null)
      //modal
  const [pgMdTitle, setPgMdTitle] = useState(null);
  const [pgMdBody, setPgMdBody] = useState(null);
  const handlePgMdClose = ()=> {
    dispatch(closePgMd())
    dispatch(resetPgMd())

  }

  const handleTextModalClose = ()=> {
    dispatch(closeTextModal())
  }
  const saveData =  async (e) =>{
    e.preventDefault()
    let actionName = e.target.getAttribute('action-name')
    if(actionName == "remove-fan"){
        dispatch(removeFan(removedFanId))
    }
  }
  const showPgMdForRemovingFan = ()=>{
    setPgMdTitle("Xác nhận")
    setPgMdBody("Xóa người dùng này khỏi danh sách?")
    dispatch(preparePgMdForRemovingFan())
    dispatch(showPgMd())
  }
  useEffect( ()=>{
    const fetchFans = async()=>{
        try{
            let response =  await CustomAxios.post("/users/fetch-fans", {userId: user?._id})
            if(response?.data?.fans){
                setFans(response?.data?.fans)
            }
        }catch(error){
            console.log(error)
        }
    } 
    fetchFans()
}, [user?.fans])
    return ( 
      <div className="fans-section">
          <Stack className="page-header">
            <div className="page-title">Xem ai đã gửi tim cho bạn</div>
            <div className="page-desc">Trang này sẽ hiển thị những ai đã gửi tim cho bạn.</div>
          </Stack>
        <Container  className="pt-1">
        <TextModal
            _modalShow = {textModal.modalShow}
            _handleModalClose = {handleTextModalClose}
            _modalTitle = {textModal.title}
            _modalBody = {textModal.body}
            _handleModalConfirm = {saveData}
            _modalActionName = {textModal.actionName}
            _data = {textModal.data}
        />
        <PageModal 
      _pgMdShow={modal.pgMd.pgMdShow} 
      _handlePgMdClose={handlePgMdClose} 
      _pgMdTitle={pgMdTitle} 
      _pgMdbody={pgMdBody} 
      _handleConfirm = {saveData} 
      _alertVariant = {modal.pgMd.alertVariant} 
      _alertText = {modal.pgMd.alertText} 
      _btnShow={modal.pgMd.btnShow} 
      _pgMdAction = {modal.pgMd.actionName} 
      />
            <Row>
              {
                fans?.length == 0 && <Stack className="custom-alert custom-alert-info">
                <div className="custom-alert-header">Hình như chưa có ai gửi tim cho bạn.</div>
                <div className="custom-alert-content"><span style={{fontWeight:"bold"}}>Lời khuyên:</span> Hãy cập nhật đầy đủ <Link>Profile</Link> của mình để người khác dễ dàng tìm thấy bạn hơn.</div>
                </Stack>
              }
                {
                   fans?.length > 0 && fans.map((stranger, index)=>{
                    return <Col xs= {6} key = {index}>
                      <Stack className="fan-card surface-1 p-1 my-1 box-shadow-black-right-bottom border-radius-sm">
                        <Stack className="fan-profile-image-container">
                        <img src={`${imageUrl}/profile_images/${stranger?.profileImage}`} style={{width: "100%"}} alt="" />
                        </Stack>
                        <Stack className="fan-info-container surface-2">
                          <div className="fan-name card-name px-1">{stranger.name}</div>
                          <div className="card-info px-1">
                            <div className="card-info-item">
                              <span className="card-info-item-name ">Hà Nội, </span>
                              <span className =  "card-info-item-content"> Giáo viên</span>
                            </div>
                          </div>
                          
                        </Stack>
                        <Stack className="fan-actions-container justify-content-center surface-3" direction="horizontal" gap = {3}>
                          <Link 
                                onClick={()=>{dispatch(getStrangerProfile(stranger._id))}}
                                to = {`/stranger-profile/?_id=${stranger._id}`}>
                                <Button 
                                style = {{ background: "none",border: "none", borderRadius: "50%"}} 
                                className="me-2" > 
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#00ffec" className="bi bi-search-heart-fill mx-1 action-icon page-action-icon" viewBox="0 0 16 16">
                                    <path d="M6.5 13a6.47 6.47 0 0 0 3.845-1.258h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1A6.47 6.47 0 0 0 13 6.5 6.5 6.5 0 0 0 6.5 0a6.5 6.5 0 1 0 0 13m0-8.518c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018"/>
                                </svg>
                               </Button>
                                </Link>

                                <Button 
                                onClick={(e)=>{
                                    e.preventDefault()
                                    dispatch(createMatch(stranger._id))
                                }}
                                style = {{ background: "none",border: "none", borderRadius: "50%"}}
                                > 
                                <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" fill="#ff3b94" className="bi bi-heart-fill mx-1 action-icon page-action-icon" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                                </svg>
                                </Button>
                                <Button 
                                  onClick={()=>{
                                    dispatch(updateRemovedFanId(stranger._id))
                                    showPgMdForRemovingFan()
                                  }}
                                  style = {{ background: "none",border: "none", borderRadius: "50%"}}
                                            > 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ff5252" className="bi bi-x-lg home-action-icon mx-1 " viewBox="0 0 16 16">
                                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                                    </svg>
                                </Button>
                        </Stack>
                      </Stack>
                    </Col>
                   }) 
                }
                
            </Row>
        </Container>
      </div>

     );
}
 
export default Fans;