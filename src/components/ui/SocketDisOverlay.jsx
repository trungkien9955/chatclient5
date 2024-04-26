import { Button } from "react-bootstrap";

const SocketDisOverlay = () => {
    const reloadApp = ()=>{
        window.location.reload()
    }
    return ( 
        <div className= "socket-dis-overlay">
            <Button
            variant = "primary"
            style = {{backgroundColor: "#bb86fc", border: "none"}}
            className = "reload-btn"
            onClick={reloadApp}
            >Bấm vào đây để tải lại trang.</Button>
        </div>
     );
}
export default SocketDisOverlay;