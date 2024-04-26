import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../features/authSlice';
import { logoutUserfromHome, resetHome } from '../../features/homeSlice';
import { logOutUserFromChat } from '../../features/chatSlice';
import { Stack } from 'react-bootstrap';
import { closeAppOffCanvas, showFilterOffCanvas } from '../../features/offCanvasSlice';
import { logOutUserFromProfile } from '../../features/profileSlice';
import { resetRegister } from '../../features/registerSlice';

 const AppOffCanvas = ({  
    _appOffCanvasShow, 
    _handleAppOffCanvasClose,
}) => {
    const dispatch = useDispatch()
    const auth = useSelector(state=> state.auth)
    const handleLogoutUser = () => {
      // dispatch(resetRegister())
      // dispatch(resetHome())
        dispatch(logoutUser())
        localStorage.clear()
        // dispatch(logoutUserfromHome())
        // dispatch(logOutUserFromChat())
        // dispatch(logOutUserFromProfile())
    }
      return (
    <Offcanvas show={_appOffCanvasShow}  onHide={_handleAppOffCanvasClose} placement="start" className= "app-offcanvas">
    <Offcanvas.Header closeButton>
        <Offcanvas.Title>
            <span className='menu-logo-text'>AMO DATING</span>
            <div>Xin chào, {auth.user?.name},</div>
        </Offcanvas.Title>
    </Offcanvas.Header>
    <hr />
    <Offcanvas.Body>
      <Stack className="menu-container" direction='vertical'  gap={3}>
        <Link 
          onClick={()=>{
            dispatch(closeAppOffCanvas())
          }}
          className="menu-item"
          to = "/fans" 
          style={{textDecoration:"none", color:"inherit"}}
          >
          <Stack  direction='horizontal'
          >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-emoji-heart-eyes" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M11.315 10.014a.5.5 0 0 1 .548.736A4.5 4.5 0 0 1 7.965 13a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .548-.736h.005l.017.005.067.015.252.055c.215.046.515.108.857.169.693.124 1.522.242 2.152.242s1.46-.118 2.152-.242a27 27 0 0 0 1.109-.224l.067-.015.017-.004.005-.002zM4.756 4.566c.763-1.424 4.02-.12.952 3.434-4.496-1.596-2.35-4.298-.952-3.434m6.488 0c1.398-.864 3.544 1.838-.952 3.434-3.067-3.554.19-4.858.952-3.434"/>
          </svg>
          <span className="menu-item-text">Xem ai thích bạn</span>
          </Stack>
          <hr />
          </Link>
        <Link 
         onClick={()=>{
          dispatch(closeAppOffCanvas())
        }}
        to = "/liked-strangers" 
        className='menu-item'
        style={{textDecoration:"none", color:"inherit"}}
        >
          <Stack direction='horizontal'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-through-heart" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2.854 15.854A.5.5 0 0 1 2 15.5V14H.5a.5.5 0 0 1-.354-.854l1.5-1.5A.5.5 0 0 1 2 11.5h1.793l.53-.53c-.771-.802-1.328-1.58-1.704-2.32-.798-1.575-.775-2.996-.213-4.092C3.426 2.565 6.18 1.809 8 3.233c1.25-.98 2.944-.928 4.212-.152L13.292 2 12.147.854A.5.5 0 0 1 12.5 0h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.854.354L14 2.707l-1.006 1.006c.236.248.44.531.6.845.562 1.096.585 2.517-.213 4.092-.793 1.563-2.395 3.288-5.105 5.08L8 13.912l-.276-.182a22 22 0 0 1-2.685-2.062l-.539.54V14a.5.5 0 0 1-.146.354zm2.893-4.894A20.4 20.4 0 0 0 8 12.71c2.456-1.666 3.827-3.207 4.489-4.512.679-1.34.607-2.42.215-3.185-.817-1.595-3.087-2.054-4.346-.761L8 4.62l-.358-.368c-1.259-1.293-3.53-.834-4.346.761-.392.766-.464 1.845.215 3.185.323.636.815 1.33 1.519 2.065l1.866-1.867a.5.5 0 1 1 .708.708z"/>
        </svg>
          <span className="menu-item-text">Xem  bạn thích ai</span>
          </Stack>
          <hr />
          </Link>
          <Link 
         onClick={()=>{
          dispatch(closeAppOffCanvas())
        }}
        to = "/matches" 
        className='menu-item'
        style={{textDecoration:"none", color:"inherit"}}
        >
          <Stack direction='horizontal'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-chat-square-heart" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
            <path d="M8 3.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"/>
        </svg>
          <span className="menu-item-text">Match</span>
          </Stack>
          <hr />
          </Link>
          <Stack 
        className='menu-item cursor-pointer'
        style={{textDecoration:"none", color:"inherit"}}
        onClick={()=>{
          dispatch(closeAppOffCanvas())
          dispatch(showFilterOffCanvas())
        }}
        >
          <Stack direction='horizontal'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-funnel" viewBox="0 0 16 16">
              <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z"/>
          </svg>
          <span className="menu-item-text">Bộ lọc</span>
          </Stack>
          </Stack>
          <hr />
        <Link
         onClick={()=>{
          dispatch(closeAppOffCanvas())
        }}
        to  = "/instructions"
        className='menu-item'
        style={{textDecoration:"none", color:"inherit"}}
        >
          <Stack  direction='horizontal'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-question-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"/>
          </svg>
          <span className="menu-item-text">Hướng dẫn</span>
          </Stack>
          <hr />
        </Link>
          <Link 
        onClick={()=>{
          dispatch(closeAppOffCanvas())
        }}
        className='menu-item' 
        to = "/stats"
        style={{textDecoration:"none", color:"inherit"}}
        >
          <Stack  direction='horizontal'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-bar-chart" viewBox="0 0 16 16">
              <path d="M4 11H2v3h2zm5-4H7v7h2zm5-5v12h-2V2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1z"/>
          </svg>
          <span className="menu-item-text">Thống kê</span>
          </Stack>
          <hr />
          </Link>
        <Link 
        className='menu-item' 
        onClick={()=>{
          dispatch(closeAppOffCanvas())
          handleLogoutUser()}} 
        to = "/logout"
        style={{textDecoration:"none", color:"inherit"}}
        >
          <Stack direction='horizontal'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
            <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
          </svg>
          <span className="menu-item-text">Đăng xuất</span>
          </Stack>
          <hr />
          </Link>
      </Stack>
    </Offcanvas.Body>
</Offcanvas>
  )
}
export default AppOffCanvas;
