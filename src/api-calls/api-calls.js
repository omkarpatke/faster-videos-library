import axios from "axios";

const headers = {authorization: localStorage.getItem('token') };

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

export { likeVideo, removeLikeVideo };