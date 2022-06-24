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
        },
        
        removeAllVideos(state){
            return [...state.filter(item => item._id === '1234')]; 
        }
    }
})

export const { addVideos , removeVideo, removeAllVideos } = likeVideosSlice.actions;
export default likeVideosSlice.reducer;