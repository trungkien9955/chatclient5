import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
    status: "",
}


const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        callLoader(state, action){
            state.status = "loading"
        },
        removeLoader(state, action){
            state.status = ""
        }
    },
    extraReducers: ()=>{
        
    }
})
export const {callLoader, removeLoader} = appSlice.actions
export default appSlice.reducer