import { Container, Stack } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import {Link} from "react-router-dom"

import { useDispatch, useSelector } from "react-redux";
import {Card} from "react-bootstrap"
import { imageUrl } from "../utils/services";
import PageModal from "../components/ui/PageModal";
import { useEffect, useState } from "react";
import { showModalForLikedStrangerRemoveConfirm, cancelModal, closeModal, confirmModal, resetModal } from "../features/modalSlice";
import TextModal from "../components/ui/TextModal";
import { closeTextModal, showTextModalForLikedStrangerRemoveConfirm } from "../features/textModalSlice";
import { removeLikedStranger } from "../features/authSlice";
import CustomAxios from "../utils/CustomAxios";
import InfoModal from "../components/ui/InfoModal";
const LikedStrangers = () => {
    const user = useSelector(state=>state.auth.user)
    const modal = useSelector(state=>state.modal)
    const textModal = useSelector(state=>state.textModal)
    const dispatch = useDispatch()
    const [likedStrangers, setLikeStrangers] = useState(null)
  const handlePageModalShow = ()=> {
    setPageModalShow(true)
  }
  const handlePageModalConfirm  = (e)=> {
    e.preventDefault()
    dispatch(confirmModal())
  }
  const handlePageModalClose = ()=> {
    setPageModalShow(false)
    dispatch(closeModal())
  }
  const handleTextModalClose = ()=> {
    dispatch(closeTextModal())
  }
  const handleInfMdClose = ()=> {
    dispatch(closeInfMd())
  }
  const handlePageModalCancel = ()=> {
    dispatch(cancelModal())
  }
  const saveData =  async (e) =>{
    e.preventDefault()
    let actionName = e.target.getAttribute('action-name')
    let data = e.target.getAttribute('data')
    if(actionName == "remove-liked-stranger"){
        dispatch(removeLikedStranger(data))
    }
}
useEffect( ()=>{
  const fetchLikedStrangers = async()=>{
      try{
          let response =  await CustomAxios.post("/users/fetch-liked-strangers", {userId: user?._id})
          if(response?.data?.likedStrangers){
              setLikeStrangers(response?.data?.likedStrangers)
          }
      }catch(error){
          console.log(error)
      }
  } 
  fetchLikedStrangers()
}, [user?.likedStrangers])
    return ( 
        <Container>
        <TextModal
            _modalShow = {textModal.modalShow}
            _handleModalClose = {handleTextModalClose}
            _modalTitle = {textModal.title}
            _modalBody = {textModal.body}
            _handleModalConfirm = {saveData}
            _modalActionName = {textModal.actionName}
            _data = {textModal.data}
            _msg = {textModal.txtModalMsg}
            _successMsgShow={textModal.txtMoSuccessMsgShow}
            _errMsgShow={textModal.txtMoErrMsgShow}
            _modalBtnShow = {textModal.btnShow}
        />
        <InfoModal
        _infMdShow={modal.infMdShow}
        _infMdTitle={modal.infMdTitle}
        _infMdBody={modal.infMdBody}
        _handleInfMdClose={handleInfMdClose}
         />
            {
                likedStrangers?.length == 0 && <Stack className="custom-alert custom-alert-info">
                <div className="custom-alert-header">Bạn chưa thích người dùng nào.</div>
                </Stack>
              }
            {likedStrangers?.length > 0 && <Row>
                {
                    likedStrangers?.map((stranger, index)=>{
                    return <Col xs= {6} key = {index}>
                    <Stack className="crush-card surface-1 p-1 my-1 box-shadow-black-right-bottom border-radius-sm">
                      <Stack className="crush-profile-image-container">
                      <img src={`${imageUrl}/profile_images/${stranger?.profileImage}`} style={{width: "100%"}} alt="" />
                      </Stack>
                      <Stack className="crush-info-container surface-2">
                        <div className="crush-name card-name px-1">{stranger.name}</div>
                        <div className="card-info px-1">
                          <div className="card-info-item">
                            <span className="card-info-item-name ">Hà Nội, </span>
                            <span className =  "card-info-item-content"> Giáo viên</span>
                          </div>
                        </div>
                      </Stack>
                      <Stack className="crush-actions-container justify-content-center surface-3" direction="horizontal" gap = {3}>
                        <Link 
                              to = {`/stranger-profile/?_id=${stranger._id}`}>
                              <Button 
                              style = {{ background: "none",border: "none", borderRadius: "50%"}} 
                              className="me-2" > 
                              <svg xmlns="http://www.w3.org/2000/svg" fill="#00ffec" className="bi bi-search-heart-fill mx-1 action-icon page-action-icon" viewBox="0 0 16 16">
                                  <path d="M6.5 13a6.47 6.47 0 0 0 3.845-1.258h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1A6.47 6.47 0 0 0 13 6.5 6.5 6.5 0 0 0 6.5 0a6.5 6.5 0 1 0 0 13m0-8.518c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018"/>
                              </svg>
                             </Button>
                              </Link>
                              <Button 
                                onClick={()=>{
                                    dispatch(showTextModalForLikedStrangerRemoveConfirm({name: stranger?.name, strangerId: stranger._id}))
                                }}
                                variant="danger" 
                                > 
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heartbreak-fill m-1" viewBox="0 0 16 16">
                                    <path d="M8.931.586 7 3l1.5 4-2 3L8 15C22.534 5.396 13.757-2.21 8.931.586M7.358.77 5.5 3 7 7l-1.5 3 1.815 4.537C-6.533 4.96 2.685-2.467 7.358.77"/>
                                </svg>
                                Hủy</Button>
                      </Stack>
                    </Stack>
                  </Col>
                   }) 
                }
            </Row>
            
              }
        </Container>
     );
}
 
export default LikedStrangers;