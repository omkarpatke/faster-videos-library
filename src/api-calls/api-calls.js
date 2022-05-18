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
export { likeVideo, removeLikeVideo, addVideoInHistory, removeHistoryVideo, removeAllHistory };