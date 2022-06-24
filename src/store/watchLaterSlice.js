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
        },
        
        removeAllVideos(state){
            return [...state.filter(item => item._id === '1234')]; 
        }
    }
})

export const { addToWatchLater , removeFromWatchLater, removeAllVideos } = watchLaterSlice.actions;
export default watchLaterSlice.reducer;