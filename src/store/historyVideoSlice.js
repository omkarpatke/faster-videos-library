import { createSlice } from "@reduxjs/toolkit";

const historyVideosSlice = createSlice({
    name:'historyVideos',
    initialState:[],
    reducers:{
        addVideoToHistory(state , action){
            return [...state , action.payload];
        },

        removeVideoFromHistory(state, action){
            return [...state.filter(item => item._id !== action.payload._id)]; 
        },

        removeAllVideosFromHistory(state){
            return [...state.filter(item => item._id === '1234')]; 
        }
    }
})

export const { addVideoToHistory , removeVideoFromHistory , removeAllVideosFromHistory } = historyVideosSlice.actions;
export default historyVideosSlice.reducer;