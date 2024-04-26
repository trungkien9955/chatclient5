import {Routes, Route, Navigate, useLocation} from "react-router-dom";
import "./App.css";
import "./Custom.css";

// import Chat from "./pages/Chat";
import Registerr from "./pages/Register";

import NavBar from "./components/NavBar";
import Profile from "./pages/Profile";

import "bootstrap/dist/css/bootstrap.min.css";
import {Container, Stack} from "react-bootstrap";
import CreateData from "./pages/CreateData";
// import Products from "./pages/Products";
// import {ToastContainer} from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"
// import Cart from "./pages/Cart";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import LikedStrangers from "./pages/LikedStrangers";
import Fans from "./pages/Fans";
import StrangerProfile from "./pages/StrangerProfile";
import Chat from "./pages/Chat";
import ChatBox from "./components/chat/ChatBox";
import AppOffCanvas from "./components/ui/AppOffCanvas";
import { closeAppOffCanvas, closeFilterOffCanvas, closeInfoOffCanvas, closeNotiOffCanvas } from "./features/offCanvasSlice";
import NotiOffCanvas from "./components/ui/NotiOffCanvas";
import InfoOffCanvas from "./components/ui/InfoOffCanvas";
import Overlay from "./components/ui/Overlay";
import Stats from "./pages/Stats";
import VerifyEmail from "./pages/VerifyEmail";
import {AnimatePresence} from 'framer-motion'
import LinearProgress from '@mui/material/LinearProgress';
import { removeLoader } from "./features/appSlice";
import Instructions from "./pages/Instructions";
import FilterOffCanvas from "./components/ui/FilterOffCanvas";
import { resetTempFilter } from "./features/homeSlice";
import { useEffect } from "react";
import { checkSocket, updateSocketId } from "./features/chatSlice";
import Login2 from "./pages/Login2";
import Matches from "./pages/Matches";
import SocketDisOverlay from "./components/ui/SocketDisOverlay";
import Register from "./pages/Register";

function App() {
  const location = useLocation()
  const auth = useSelector(state=>state.auth)
  const filter = useSelector(state=>state.home.filter)
  const offcanvas = useSelector(state=> state.offCanvas)
  const app = useSelector(state=> state.app)
  const socketId = useSelector(state=>state.chat.socketId)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(checkSocket())
  }, [])
  useEffect(()=>{
    window.addEventListener('pageshow', (event)=>{
      event.preventDefault()
      dispatch(updateSocketId(null))
    })
  }, [])
  // setTimeout(()=>{dispatch(removeLoader())},3000)
  return (
    < Stack id = "app">
    
      {
        app.status == "loading"  &&
        <Overlay />
      }
    
    {
        !socketId && auth.user &&
        <SocketDisOverlay />
      }
    <AppOffCanvas 
    _handleAppOffCanvasClose={ ()=>{
      dispatch(closeAppOffCanvas())
    }}
    _appOffCanvasShow = {offcanvas.appOffCanvasShow}
    />

    <NotiOffCanvas 
        _notiOffCanvasShow = {offcanvas.notiOffCanvasShow}
        _handleNotiOffCanvasClose={ ()=>{
          dispatch(closeNotiOffCanvas())
        }}
    />
    <FilterOffCanvas 
        _filterOffCanvasShow = {offcanvas.filterOffCanvasShow}
        _handleFilterOffCanvasClose={ ()=>{
          dispatch(closeFilterOffCanvas())
          dispatch(resetTempFilter(filter))
        }}
    />
       <InfoOffCanvas 
        _infoOffCanvasShow = {offcanvas.infoOffCanvasShow}
        _infoOffTitle={offcanvas.infoOffTitle}
        _infoOffBody={offcanvas.infoOffBody}
        _handleInfoOffCanvasClose={ ()=>{
          dispatch(closeInfoOffCanvas())
        }}
    />
    {/* {auth.user && <PrimarySearchAppBar/>} */}
    <div id="main-section">
      <AnimatePresence mode= "wait">
      <Routes location={location} key = {location.key}>
        <Route path = "/" element = {auth.user ? <Home/> : <Login2/>}></Route>
        <Route path = "/register" element = {auth.user ? <Home/> : <Register/>}></Route>
        <Route path = "/profile" element = {auth.user ? <Profile/> : <Login2/>}></Route>
        <Route path = "/create-data" element = {<CreateData/>}></Route>
        <Route path = "/liked-strangers" element = {<LikedStrangers/>}></Route>
        <Route path = "/fans" element = {auth.user ? <Fans/> : <Login2/>}></Route>
        <Route path = "/matches" element = {auth.user ? <Matches/> : <Login2/>}></Route>
        <Route path = "/stranger-profile" element = {auth.user ? <StrangerProfile/> : <Login2/>}></Route>
        <Route path = "/chats" element = {auth.user ? <Chat/> : <Login2/>}></Route>
        <Route path = "/chat-box" element = {auth.user ? <ChatBox/> : <Login2/>}></Route>
        <Route path = "/stats" element = {auth.user ? <Stats/> : <Login2/>}></Route>
        {/* <Route path = "/verify/:token" element = {<Verify/>}></Route> */}
        <Route path = "/verify-email" element = {<VerifyEmail/>}></Route>
        <Route path = "/instructions" element = {<Instructions/>}></Route>
        <Route path = "*" element = {<Navigate to = "/"/>}></Route>
      </Routes>
      </AnimatePresence>
    </div>
    <Stack className="progress-bar-container">
    {
      app.status == "loading" && 
      <LinearProgress color="secondary" />
    }
    </Stack>
    {
       auth.user && <NavBar/>
    }
    </Stack>

  )
}

export default App
