import React, { useState , useEffect }  from 'react';
import './Likes.css';
import { SideBar } from '../../components/index';
import { useVideos } from '../../context';
import { Link } from 'react-router-dom';
import { removeLikeVideo , getLikeVideo } from '../../api-calls/api-calls';



export function Likes() {
  const { videoState, videoDispatch , setVideos} = useVideos();
  const [likeVideo , setLikeVideo ] = useState([]);

  const getLikeVideos = async() => {
    const response = await getLikeVideo();
    setLikeVideo(response.likeVideos.data.likes)
  }

useEffect(() => {
  getLikeVideos();
},[videoState])
  
 

  const removeLikeVideos = async(item) => {
    const response = await removeLikeVideo(item);
    videoDispatch({type: 'DISLIKE_VIDEO' , payload : response});
    setVideos(prev => prev.map(prevVideo => prevVideo._id === item._id ? {...prevVideo , isLiked:false} : prevVideo))
  }


  return (
    <div className='page-container'>
    <SideBar />
    <div className="home-section">
      <h2>Likes Videos</h2>
    <div className='likes-page-container'>
      <div className='like-videos'>
         {likeVideo && likeVideo.map(video => (
           <div key={video._id} className='video'>
           <Link to={`/videos/${video._id}`}><img src={video.image} alt="videoImg" className='video-img like-video-img' /></Link>
           <div className="dislike-btn" title='UnLike' onClick={() => removeLikeVideos(video)}>X</div>
           <div className='video-info-container'>
           <div className="video-title">{video.title}</div>
           <div className='video-info'>270k Views |  8 months ago</div>
           </div>
         </div>
         ))}
      </div>
    </div>
    </div>
    </div>
  )
}
