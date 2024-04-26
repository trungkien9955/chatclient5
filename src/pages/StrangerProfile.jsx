import { Container, FloatingLabel, Form, Stack } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { imageUrl } from "../utils/services";
import PageModal from "../components/ui/PageModal";
import { useEffect, useState } from "react";
import { cancelModal, closeModal, confirmModal } from "../features/modalSlice";
import TextModal from "../components/ui/TextModal";
import { closeTextModal } from "../features/textModalSlice";
import {  useSearchParams } from "react-router-dom";
import CustomAxios from "../utils/CustomAxios";
import NoBadgeJobContainer from "../components/profile/NoBadgeJobContainer";
import NoBadgeHobbyContainer from "../components/profile/NoBadgeHobbyContainer";
const StrangerProfile = () => {
    const modal = useSelector(state=>state.modal)
    const [stranger, setStranger] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [status, setStatus] = useState("")
    const [errMsg, setErrMsg] = useState("")
    const textModal = useSelector(state=>state.textModal)
    const dispatch = useDispatch()
    const strangerId = searchParams.get("_id")
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
    let data = e.target.getAttribute('data')
}
useEffect(()=>{
  const getStranger = async()=>{
    setStatus("loading")
    try{
      let response = await CustomAxios.post('/profile/get-stranger-profile2', {strangerId})
      if(response.data){
        setStranger(response.data.stranger)
      }
    }catch(error){
      setStatus("failed")
      setErrMsg("Không thể hiển thị thông tin người dùng này")
    }
  }
  getStranger()
}, [strangerId])
    return ( <div className="stranger-profile-section">
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
        {
         stranger?.profileImage?  <Container><img src={`${imageUrl}/profile_images/${stranger?.profileImage}`} alt="" style={{width: "100%"}}/></Container>
         :
         <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" fill="currentColor" className="bi bi-person-bounding-box faded" viewBox="0 0 16 16">
                 <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5"/>
                 <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
        </svg>
       }
       <Container>
          <Stack style={{paddingBottom: "60px"}}>
            <h5>Ảnh bộ sưu tập</h5>
            {
                stranger?.galImages.length >0 && <Row className='g-2'>
                {
                  stranger?.galImages && 
                  stranger?.galImages.map((galImage, index)=> {
                      return         <Col xs = {4} key={index}>
                      <div className='gal-container'>
                        <img src = {`${imageUrl}/gal_images/${galImage}`} style={{width: "100%"}}></img>

                      </div>
                    </Col>
                    })
                }
              </Row>
            }
          <h5>Thông tin cơ bản</h5>
          <FloatingLabel
            controlId="floatingInput"
            label="Tên"
            className="mt-2"
              >
                <Form.Control 
                type="text" 
                value = {stranger?.name ? stranger?.name : ""}
                readOnly
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Giới thiệu"
          className="mt-2"
        >
            <Form.Control 
            type="text" 
            value = {stranger?.bio? stranger?.bio : ""}
            maxLength={350}
            readOnly
            />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Địa điểm hẹn hò"
          className="mt-2"
        >
            <Form.Control 
            type="text" 
            value={stranger?.datingCity ? stranger?.datingCity?.name : "" }
            readOnly
            />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Quê quán"
          className="mt-2"
        >
            <Form.Control 
            type="text" 
            value={stranger?.homeCity ? stranger?.homeCity?.name : ""}
            readOnly
            />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Giới tính"
          className="mt-2"
        >
            <Form.Control 
            type="text" 
            value={stranger?.gender ? stranger?.gender?.name : ""}
            readOnly
            />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Chiều cao"
          className="mt-2"
        >
            <Form.Control 
            type="text" 
            value={stranger?.height ? `${stranger?.height} cm` : ""}
            readOnly
            />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Cân nặng"
          className="mt-2"
        >
            <Form.Control 
            type="text" 
            value={stranger?.weight ? `${stranger?.weight} kg`: "" }
            readOnly
            />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Mục tiêu hẹn hò"
          className="mt-2"
        >
            <Form.Control 
            type="text" 
            value= {stranger?.datingGoals?.length > 0 ? stranger?.datingGoals?.map((datingGoal)=>{
              return datingGoal.name
            }) : "Chưa có mục tiêu hẹn hò"}
            readOnly
            />
        </FloatingLabel>
        <Stack 
          className="profile-item mt-2">
            <h4>Nghề nghiệp</h4>
            {
              stranger?.jobs?.length > 0? <Stack 
              className="jobs-container cursor-pointer" 
              direction = "horizontal" 
              gap = {3}
              style={{flexWrap:"wrap"}}
              >
                  {
                    stranger.jobs.map((job, index)=>{
                      return <NoBadgeJobContainer key = {index} name = {job.name} />
                    })
                  }
              </Stack>
              : <span
              className='px-2 py-3 border-radius-sm'
              style= {{ border: "1px solid #bb86fc"}}
              >Chưa có thông tin nghề nghiệp.</span>
            }
            <hr />
        </Stack>
        <Stack className="profile-item mt-2">
          <h4>Học vấn</h4>
          <FloatingLabel
          controlId="floatingInput"
          label="Trình độ"
          className="mt-2"
        >
            <Form.Control 
            type="text" 
            value= {stranger?.eduOption? stranger?.eduOption.name: "Chưa chọn trình độ học vấn"}
            readOnly
            />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Trường CĐ, ĐH"
          className="mt-2"
        >
            <Form.Control 
            type="text" 
            value= {stranger?.college? stranger?.college.name: "Chưa chọn trường CĐ/ĐH đã/đang học."}
            readOnly
            />
        </FloatingLabel>
          <hr />
        </Stack>
        <Stack 
          className="profile-item mt-2">
            <h4>Sở thích và hoạt động</h4>
            {
              stranger?.hobbies?.length > 0? <Stack 
              className="hobbies-container" 
              direction = "horizontal" 
              gap = {3}
              style={{flexWrap:"wrap"}}
              >
                  {
                    stranger?.hobbies.map((hobby, index)=>{
                      return <NoBadgeHobbyContainer key = {index} name = {hobby.name} type = {hobby.type} />
                    })
                  }
              </Stack>
              : <span
              className='px-2 py-3 border-radius-sm'
              style= {{border: "1px solid #bb86fc"}}
              >Chưa chọn sở thích và hoạt động .</span>
            }
            <hr />
        </Stack>
        <Stack className="profile-item mt-2">
          <h4>Lối sống</h4>
          <FloatingLabel
          controlId="floatingInput"
          label="Con cái"
          className="mt-2"
        >
            <Form.Control 
            type="text" 
            value= {stranger?.kidOption? stranger?.kidOption.name: "Chưa chọn tình trạng con cái"}
            readOnly
            />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Hút thuốc"
          className="mt-2"
        >
            <Form.Control 
            type="text" 
            value= {stranger?.smokingOption? stranger?.smokingOption.name: "Chưa chọn quen hút thuốc"}
            readOnly
            />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Uống rượu bia"
          className="mt-2"
        >
            <Form.Control 
            type="text" 
            value= {stranger?.drinkingOption? stranger?.drinkingOption.name: "Chưa chọn thói quen uống rượu bia"}
            readOnly
            />
        </FloatingLabel>
        <hr />
        </Stack>
        </Stack>
       </Container>
    </div>
      
     );
}
 
export default StrangerProfile;