import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import PageModal from '../components/ui/PageModal';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { imageUrl } from '../utils/services';
import { getStranger, likeStranger } from '../features/homeSlice';
import { saveLikedStrangers } from '../features/authSlice';
import { Button, Stack } from "react-bootstrap";
import ErrorAlert from '../components/ui/ErrorAlert';
import { checkSocket, updateSocketId } from '../features/chatSlice';
import useConvertTimeLanguage from '../hooks/useConvertTimeLanguage';
import { differenceInYears, intlFormatDistance } from 'date-fns';
//material ui


const Home = () => {
  const navigate = useNavigate()
  const home = useSelector(state=>state.home)
  const filter = home.filter
  const user = useSelector(state=>state.auth.user)
  const modal = useSelector(state=>state.modal)
  const dispatch = useDispatch()
  const stranger = home.stranger
  //modal
const [pgMdTitle, setPgMdTitle] = useState(null);
const [pgMdBody, setPgMdBody] = useState(null);
const handlePgMdClose = ()=> {
  dispatch(closePgMd())
  dispatch(resetPgMd())
}
  const saveData =  async (e) =>{
    e.preventDefault()
    console.log("hello")
}
useEffect(()=>{
  if(filter.dCityId){
    dispatch(getStranger({userId: user?._id, filter: filter}))
  }
}, [filter])
    return ( 
        <div className='home-section' 
        >
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
              !filter?.dCityId && <Stack
                direction='horizontal'
                gap={2}
                className='border-pr-weak border-radius p-2 align-items-start'
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" className="bi bi-info-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
              </svg>
                <span>Bạn chưa chọn địa điểm hẹn hò. Vui lòng chọn địa điểm hẹn hò ở trang <span className="link-pr cursor-pointer" onClick={()=>{navigate("/profile")}}>Profile</span> để tiếp tục.</span>
              </Stack>
            }
            {
              stranger && <Stack className='home-stranger-card surface-1'>
              <Stack className="home-stranger-container">
                <div className='home-stranger-image-container'>
                  <div className="home-stranger-image-wrapper">
                  <img src = {`${imageUrl}/profile_images/${stranger?.profileImage}`} style={{width: "100%"}}></img>
                  </div>
                </div>
              </Stack>
              <Stack className='stranger-info-container p-2'>
                  <div ><span className='home-stranger-name'>{stranger?.name}, {differenceInYears( Date.now(), new Date(user?.dob))}</span></div>
                  <Stack direction='horizontal' gap={2}>
                    <div className='stranger-hometown'>{stranger?.datingCity[0]?.name}</div>
                    <div className='stranger-job'>{stranger?.jobs[0]?.name && ", "+stranger?.jobs[0]?.name}</div>
                    <div className='stranger-job'>{stranger?.lastSeen && ", Online "+useConvertTimeLanguage(intlFormatDistance(stranger?.lastSeen, Date.now()))}</div>
                  </Stack>
                  <Stack></Stack>
              </Stack>
              <Stack 
              className=' home-actions surface-3 p-2  justify-content-center'
              direction='horizontal'
              gap={4}
              >
                <Link 
                    to = {`/stranger-profile/?_id=${stranger._id}`}>
                        <Button 
                          className="me-2"  
                          style = {{ background: "none", border: "none", borderRadius: "50%"}}> 
                          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#005b96" className="bi bi-search home-action-icon" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                          </svg>
                        </Button>
                    </Link>
              <Button 
                onClick={()=>{
                    dispatch(saveLikedStrangers(stranger._id))
                          }}
                style = {{ background: "none",border: "none", borderRadius: "50%"}}
                          > 
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#be29ec" className="bi bi-heart-fill home-action-icon " viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                    </svg>
              </Button>
              <Button 
                onClick={()=>{
                  navigate("/")
                          }}
                style = {{ background: "none",border: "none", borderRadius: "50%"}}
                          > 
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#ff5252" className="bi bi-x-lg home-action-icon" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                  </svg>
              </Button>
          </Stack>
            </Stack>
            }
            {
              home.errMsg && <ErrorAlert text = {home.errMsg}/>
            }
        {/* </Stack> */}
      </div>
     );
}
export default Home;