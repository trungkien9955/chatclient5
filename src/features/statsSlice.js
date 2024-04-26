import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl, getRequest } from "../utils/services";
import CustomAxios from "../utils/CustomAxios";
const initialState = {
    totalUser: null,
    cityUserCount: null,
    fUserCount: null,
    mUserCount: null,
    topUsers: [],
    users: [],
    matchCount: null,
    status: "",
}

export const fetchStats = createAsyncThunk(
    "stats/fetchStats",
    async(input,thunkAPI)=>{
        try{
            let response = await CustomAxios.post(`/stats/get-stats`, input)
            response = response.data
                return response
        }catch(error){
            return thunkAPI.rejectWithValue("Lỗi ứng dụng.")
        }
    }
)
const statsSlice = createSlice({
    name: "stats",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchStats.pending, (state, action)=> {
            state.status = "pending"
        })
        .addCase(fetchStats.fulfilled, (state, action)=> {
            state.status = "success"
            state.totalUser = action.payload.totalUser
            state.fUserCount = action.payload.fUserCount
            state.mUserCount = action.payload.mUserCount
            state.matchCount = action.payload.matchCount
            state.cityUserCount = action.payload.cityUserCount
            state.totalUser = action.payload.totalUser
            state.topUsers = action.payload.topUsers
            state.users = action.payload.users
        })
        .addCase(fetchStats.rejected, (state, action)=> {
            state.status = "rejected"
        })
        .addDefaultCase((state, action) => {})
    }
})
export default statsSlice.reducer