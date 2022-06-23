import { createSlice } from "@reduxjs/toolkit";

const likeVideosSlice = createSlice({
    name:'likeVideos',
    initialState:[],
    reducers:{
        addVideos(state , action){
            return [...state , action.payload];
        },

        removeVideo(state, action){
            return [...state.filter(item => item._id !== action.payload._id)]; 
        }  
    }
})

export const { addVideos , removeVideo } = likeVideosSlice.actions;
export default likeVideosSlice.reducer;