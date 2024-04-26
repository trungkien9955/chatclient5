const offCanvasReducer = (state, action) => {
    switch (action.type) {
        case "SHOW_OFFCANVAS":
            return {
                ...state, offCanvasShow: true, offCanvasTitle: action.payload.offCanvasTitle, offCanvasBody: action.payload.offCanvasBody
            }
        case "CLOSE_OFFCANVAS":
            return {
                ...state, offCanvasShow: false
            }
        case "UPDATE_OFFCANVASBODY": 
            return {
                ...state, offCanvasBody: action.payload
            }
        default:
            
                return state
            
    }
}
 
export default offCanvasReducer;