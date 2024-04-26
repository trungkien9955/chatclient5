import { Alert, Container, Stack } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import {Card} from "react-bootstrap"
import { imageUrl } from "../utils/services";
import PageModal from "../components/ui/PageModal";
import { useEffect, useState } from "react";
import { showModalForLikedStrangerRemoveConfirm, cancelModal, closeModal, confirmModal, resetModal } from "../features/modalSlice";
import TextModal from "../components/ui/TextModal";
import { closeTextModal, showTextModalForLikedStrangerRemoveConfirm, showTextModalForRemovingMatch } from "../features/textModalSlice";
import { createChat, createMatch, removeFan, removeLikedStranger, removeMatch } from "../features/authSlice";
import {  getStrangerProfile } from "../features/homeSlice";
import AlertComponent from "../components/ui/Alert";
import CustomAxios from "../utils/CustomAxios";
const Matches = () => {
    const navigate = useNavigate()
    const home = useSelector(state=>state.home)
    // const fans = home.fans
    const user = useSelector(state=>state.auth.user)
    const modal = useSelector(state=>state.modal)
    const textModal = useSelector(state=>state.textModal)
    const dispatch = useDispatch()
    const [matches, setMatches] = useState(null)
  const handleTextModalClose = ()=> {
    dispatch(closeTextModal())
  }

  const saveData =  async (e) =>{
    e.preventDefault()
    let actionName = e.target.getAttribute('action-name')
    let data = e.target.getAttribute('data')
    if(actionName == "remove-liked-stranger"){
        dispatch(removeLikedStranger(data))
    }
    if(actionName == "remove-match"){
      dispatch(removeMatch(data))
  }
  }
  useEffect( ()=>{
    const fetchMatches = async()=>{
        try{
            let response =  await CustomAxios.post("/users/fetch-matches", {userId: user?._id})
            if(response?.data?.matches){
                setMatches(response?.data?.matches)
            }
        }catch(error){
            console.log(error)
        }
    } 
    fetchMatches()
}, [user.matches])
    return ( 
      <div className="fans-section">
          <Stack className="page-header">
            <div className="page-title">Matches</div>
            <div className="page-desc">Trang này hiển thị những người đã match với bạn.</div>
          </Stack>
        <Container  className="pt-1">
        <TextModal
            _modalShow = {textModal.modalShow}
            _handleModalClose = {handleTextModalClose}
            _modalTitle = {textModal.title}
            _modalBody = {textModal.body}
            _handleModalConfirm = {saveData}
            _modalActionName = {textModal.actionName}
            _modalBtnShow={textModal.btnShow}
            _data = {textModal.data}
        />
            <Row>
              {
                matches?.length == 0 && <Stack className="custom-alert custom-alert-info">
                <div className="custom-alert-header">Hình như chưa có ai match với bạn.</div>
                <div className="custom-alert-content"><span style={{fontWeight:"bold"}}>Lời khuyên:</span> Hãy cập nhật đầy đủ <span className="link-pr cursor-pointer" onClick={()=>{navigate("/profile")}}>Profile</span> của mình để người khác dễ dàng tìm thấy bạn hơn.</div>
                </Stack>
              }
                {
                   matches?.length > 0 && matches?.map((stranger, index)=>{
                    return <Col xs= {6} key = {index}>
                      <Stack className="fan-card surface-1 p-1 my-1 box-shadow-black-right-bottom border-radius-sm">
                        <Stack className="fan-profile-image-container">
                        <img src={`${imageUrl}/profile_images/${stranger?.profileImage}`} style={{width: "100%"}} alt="" />
                        </Stack>
                        <Stack className="fan-info-container surface-2">
                          <div className="fan-name card-name px-1">{stranger.name}</div>
                          <div className="card-info px-1">
                            <div className="card-info-item">
                              <span className="card-info-item-name ">{stranger?.datingCity?.name} </span>
                            </div>
                          </div>
                          
                        </Stack>
                        <Stack className="fan-actions-container justify-content-center surface-3" direction="horizontal" gap = {3}>
                          <Link 
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
                                  onClick={()=>{
                                    dispatch(showTextModalForRemovingMatch({name: stranger?.name, strangerId: stranger?._id}))
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
 
export default Matches;