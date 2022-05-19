import axios from "axios";

const headers = {authorization: localStorage.getItem('token') };
// like video functions
const likeVideo = async(video) => {
    try {
        const response = await axios.post(`/api/user/likes`, { video }, { headers });
        return { likeVideos : response}
    }
    catch(err){
        console.error(err);
    }
}

const removeLikeVideo = async(video) => {
    try {
        const response = await axios({
            method: "delete",
            url: `/api/user/likes/${video._id}`,
            headers: headers ,
            data: {
              product: video
            },
          });
          return { likeVideos : response}
    } catch (err) {
        console.error(err);
    }
}

// history video functions
const addVideoInHistory = async(video) => {
    try {
        const response = await axios.post(`/api/user/history`, { video }, { headers });
        return { historyVideos : response}
    }
    catch(err){
        console.error(err);
    }
}

const removeHistoryVideo = async(video) => {
    try {
        const response = await axios({
            method: "delete",
            url: `/api/user/history/${video._id}`,
            headers: headers ,
            data: {
              product: video
            },
          });
          return { historyVideos : response}
    } catch (err) {
        console.error(err);
    }
}


const removeAllHistory = async() => {
    try {
        const response = await axios({
            method: "delete",
            url: `/api/user/history/all`,
            headers: headers
          });
          return { historyVideos : response}
    } catch (err) {
        console.error(err);
    }
}

const addToWatchLater = async(video) => {
    try {
        const response = await axios.post(`/api/user/watchlater`, { video }, { headers });
        return { watchLaterVideos : response}
    }
    catch(err){
        console.error(err);
    }
}

const removeFromWatchLater = async(video) => {
    try {
        const response = await axios({
            method: "delete",
            url: `/api/user/watchlater/${video._id}`,
            headers: headers ,
            data: {
              product: video
            },
          });
          return { watchLaterVideos : response}
    } catch (err) {
        console.error(err);
    }
}

// playlist functions
const createPlayList = async(playlistTitle) => {
    try {
        const response = await axios.post(`/api/user/playlists`, { playlist: {title: playlistTitle } }, { headers });
        return { playlist : response }
    }
    catch(err){
        console.error(err);
    }
}

const getPlayList = async() => {
    try {
        const response = await axios.get(`/api/user/playlists`, { headers });
        return { playlist : response }
    }
    catch(err){
        console.error(err);
    }
}

const addVideoToPlaylist = async(video , playlistId) => {
    try {
        const response = await axios.post(`/api/user/playlists/${playlistId}`, {video} , { headers });
        return { playlist : response }
    }
    catch(err){
        console.error(err);
    }
}

const removeVideoFromPlaylist = async(playlistId , videoId) => {
    try {
        const response = await axios.delete(`/api/user/playlists/${playlistId}/${videoId}`, { headers });
        return { playlist : response }
    }
    catch(err){
        console.error(err);
    }
}

const removePlayList = async(playlistId) => {
    try {
        const response = await axios.delete(`/api/user/playlists/${playlistId}`, { headers });
        return { playlist : response }
    }
    catch(err){
        console.error(err);
    }
}







export {removePlayList, removeVideoFromPlaylist , addVideoToPlaylist, likeVideo, removeLikeVideo, addVideoInHistory, removeHistoryVideo, removeAllHistory , addToWatchLater , removeFromWatchLater, createPlayList, getPlayList };