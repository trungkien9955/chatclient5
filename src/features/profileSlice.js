import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { baseUrl, getRequest } from "../utils/services"
import CustomAxios from "../utils/CustomAxios"

const initialState = {
    user: {},
    userUploadedProfileImage: "",
    status: "",
    innitialGenderId: "",
    newGenderId: null,
    innitialDatingGoalIdArray: [],
    newDatingGoalIdArray: [],
}
export const getGenders = createAsyncThunk(
    "profile/getGenders",
    async()=>{
        try{
            const response =  await CustomAxios.get(`/profile/genders`)
            return response.data
        }catch(error){
            console(error) 
        }
    }
)
export const getDatingGoals = createAsyncThunk(
    "profile/getDatingGoals",
    async()=>{
        try{
            const datingGoals =  await CustomAxios.get(`/profile/dating-goals`)
            return datingGoals
        }catch(error){
            console(error)
        }
    }
)
const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        updateUserUploadedProfileImage(state, action) {
            state.userUploadedProfileImage = action.payload
        },
        updateInnitialGenderId(state, action){
            state.innitialGenderId = action.payload
        },
        updateNewGenderId(state, action){
            state.newGenderId = action.payload
        },
        updateInitialDatingGoalIdArray(state, action){
            state.innitialDatingGoalIdArray = action.payload
        },
        updateNewDatingGoalIdArray(state, action){
            state.newDatingGoalIdArray = action.payload
        },
        addDatingGoalId(state,  action){
            state.newDatingGoalIdArray = [...state.newDatingGoalIdArray, action.payload]
        },
        removeDatingGoalId(state,  action){
            state.newDatingGoalIdArray = state.newDatingGoalIdArray.filter((id)=> id!==action.payload)
        },
        logOutUserFromProfile(state, action){
            return initialState
        },
    }, 
    extraReducers: (builder)=> {
        builder
        //get genders
        .addCase(getGenders.pending, (state, action)=> {
            state.status = "loading"
        })
        .addCase(getGenders.fulfilled, (state, action)=> {
            state.status = "success"
            state.genders = action.payload
        })
        .addCase(getGenders.rejected, (state, action)=> {
            state.status = "failed"
        })
    }
})
export const {updateUserUploadedProfileImage, updateNewGenderId, updateInitialDatingGoalIdArray, updateInnitialGenderId, updateNewDatingGoalIdArray, logOutUserFromProfile, addDatingGoalId, removeDatingGoalId} = profileSlice.actions
export default profileSlice.reducer