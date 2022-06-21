import { createSlice } from "@reduxjs/toolkit";

const watchLaterSlice = createSlice({
    name:'watchLaterVideos',
    initialState:[],
    reducers:{
        addToWatchLater(state , action){
            return [...state , action.payload];
        },

        removeFromWatchLater(state, action){
            return [...state.filter(item => item._id !== action.payload._id)]; 
        }  
    }
})

export const { addToWatchLater , removeFromWatchLater } = watchLaterSlice.actions;
export default watchLaterSlice.reducer;