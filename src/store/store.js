import { configureStore } from "@reduxjs/toolkit";
import videosReducer from './VideosSlice';
import likeVideoReducer from './likeVideosSlice';
import watchLaterReducer from './watchLaterSlice';
import historyReducer from './historyVideoSlice';
import playlistsReducer from './playlistsSlice';



const store = configureStore({
    reducer:{
        videoData: videosReducer,
        likeVideos : likeVideoReducer,
        watchLaterVideos : watchLaterReducer,
        historyVideos : historyReducer,
        playlists : playlistsReducer,
    }
})

export { store };