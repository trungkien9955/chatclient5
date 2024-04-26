import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { Stack } from 'react-bootstrap';
import NotiItem from './NotiItem';
import { useEffect, useState } from 'react';
import CustomAxios from '../../utils/CustomAxios';

 const NotiOffCanvas = ({  
    _notiOffCanvasShow, 
    _handleNotiOffCanvasClose,
}) => {
    const user = useSelector(state=> state.auth.user)
    const homeNewNotiCount = useSelector(state=> state.home.newNotiCount)
    const [noti, setNoti] = useState(null)
    useEffect( ()=>{
        const fetchNoti = async()=>{
            try{
                let response =  await CustomAxios.post("/home/fetch-noti", {userId: user?._id})
                if(response?.data?.noti){
                    setNoti(response?.data?.noti)
                }
            }catch(error){
                console.log(error)
            }
        } 
        fetchNoti()
    }, [homeNewNotiCount])
      return (
    <Offcanvas show={_notiOffCanvasShow}  onHide={_handleNotiOffCanvasClose} placement="end" className= "noti-offcanvas">
    <Offcanvas.Header closeButton>
        <Offcanvas.Title>
            <div className='custom-offcanvas-title'>Thông báo</div>
        </Offcanvas.Title>
    </Offcanvas.Header>
    <hr />
    <Offcanvas.Body>
      <Stack className="noti-container" direction='vertical'  gap={1}>
            {
                noti && noti?.length > 0 ? <>
                    {
                        noti.map((notiItem, index)=>{
                            return <NotiItem key={index} _id = {notiItem?._id} isRead={notiItem?.isRead} img = {notiItem?.image} text = {notiItem?.text}  url = {notiItem?.senderId} createdAt = {notiItem?.createdAt} type = {notiItem?.type}
                            />
                        }
                        )
                    }
                </>
                : "Chưa có thông báo."
            }
      </Stack>
    </Offcanvas.Body>
</Offcanvas>
  )
}
export default NotiOffCanvas;
