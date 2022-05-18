import React from 'react';
import './Likes.css';
import { SideBar , CategoryBar } from '../../components/index';
import { useVideos } from '../../context';
import { Link } from 'react-router-dom';
import { removeLikeVideo } from '../../api-calls/api-calls';



export function Likes() {
  const { videoState, videoDispatch, setVideos } = useVideos();
  const likeVideos = videoState.payload.likeVideos.data.likes;
  

  const removeLikeVideos = async(item) => {
    const response = await removeLikeVideo(item);
    videoDispatch({type: 'DISLIKE_VIDEO' , payload : response});
    setVideos(prev => prev.map(prevVideo => prevVideo._id === item._id ? {...prevVideo , isLiked:false} : prevVideo))
  }


  return (
    <div className='page-container'>
    <SideBar />
    <div className="home-section">
    <CategoryBar />
    <div className='likes-page-container'>
      <h2>Likes Videos</h2>
      <div className='like-videos'>
         {likeVideos && likeVideos.map(video => (
           <div key={video._id} className='video'>
           <Link to={`/videos/${video._id}`}><img src={video.image} alt="videoImg" className='video-img like-video-img' /></Link>
           <div className="dislike-btn" title='UnLike' onClick={() => removeLikeVideos(video)}>X</div>
           <div className='video-info-container'>
           <div className="video-title">{video.title}</div>
           <div className='video-info'>270k Views |  8 months ago  <span className='options'><i className="fa-solid fa-ellipsis-vertical"></i></span></div>
           </div>
         </div>
         ))}
      </div>
    </div>
    </div>
    </div>
  )
}
