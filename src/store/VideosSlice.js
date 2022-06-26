import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


const videosSlice = createSlice({
    name:'videos',
    initialState:[],
    reducers:{
        getVideos(state , action){
            return [...state ,action.payload];
        },

    }
})

export const { getVideos } = videosSlice.actions;
export default videosSlice.reducer;

export const fetchVideoData = async() => {
    
       try{
        const response = await axios.get('/api/videos');
        console.log(response);
       }
       catch(err){
        console.log(err);
       }
    
}
