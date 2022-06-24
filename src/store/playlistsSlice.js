import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";


const playlistsSlice = createSlice({
    name:'playlists',
    initialState:[],
    reducers:{
        addPlaylist(state , action){
            return [...state , {_id: uuid() , name: action.payload , videos:[]}];
        },

        removePlayList(state, action){
            return [...state.filter(item => item._id !== action.payload)]; 
        },

        addVideoToPlaylist(state , action){
            return [...state.map(item => item._id === action.payload.playlistId ? {...item , videos: [...item.videos , action.payload.video] } : item)];
        },

        removeVideoFromPlaylist(state , action){
            return [...state.map(item => item._id === action.payload.playListId ? {...item , videos: item.videos.filter(video => video._id !== action.payload.video._id) } : item)];
        },

        removeAllVideos(state){
            return [...state.filter(item => item._id === '1234')]; 
        }
    }
})

export const { addPlaylist , removePlayList, addVideoToPlaylist, removeVideoFromPlaylist , removeAllVideos} = playlistsSlice.actions;
export default playlistsSlice.reducer;