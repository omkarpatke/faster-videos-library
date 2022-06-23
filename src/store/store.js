import { configureStore } from "@reduxjs/toolkit";
import likeVideoReducer from './likeVideosSlice';
import watchLaterReducer from './watchLaterSlice';
import historyReducer from './historyVideoSlice';
import playlistsReducer from './playlistsSlice';


const store = configureStore({
    reducer:{
        likeVideos : likeVideoReducer,
        watchLaterVideos : watchLaterReducer,
        historyVideos : historyReducer,
        playlists : playlistsReducer,
    }
})

export { store };