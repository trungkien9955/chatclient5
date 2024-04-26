import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    items: [],
    status: null,
}
export const productsFetch = createAsyncThunk(
    "products/productsFetch",
    async()=>{
        try{
            const response = await axios.get("http://127.0.0.1:5000/api/users")
            return response?.data
        }catch(error){
            return rejectWithValue("Đã xảy ra lỗi.")
        }
    }
)
const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(productsFetch.pending, (state, action)=> {
            state.status = "pending"
        })
        .addCase(productsFetch.fulfilled, (state, action)=> {
            state.status = "success"
            state.items = action.payload
        })
        .addCase(productsFetch.rejected, (state, action)=> {
            state.status = "rejected"
        })
        .addDefaultCase((state, action) => {})
    }
})
export default productsSlice.reducer