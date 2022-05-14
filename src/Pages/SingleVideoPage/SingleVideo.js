import React from 'react';
import { useParams } from 'react-router-dom';
import { addToWatchLater, likeVideo , removeFromWatchLater, removeLikeVideo } from '../../api-calls/api-calls';
import { SideBar } from '../../components';
import { useVideos, useWatchlaterContext } from '../../context';
import './SingleVideo.css';

export function SingleVideo() {
    const URL = "https://www.youtube.com/embed/";
    const { id } = useParams();
    const { videos , setVideos , videoDispatch } = useVideos();
    const { watchLaterDispatch } = useWatchlaterContext();
    const video  = videos.find( item => item._id === id );

    const addVideoToWatchLater = async(item) => {
      const response = await addToWatchLater(item);
      watchLaterDispatch({type: 'WATCHLATER_VIDEO' , payload : response});
      setVideos(prev => prev.map(prevVideo => prevVideo._id === item._id ? {...prevVideo , watchLater:true} : prevVideo))
    }

    const removeVideoFromWatchLater = async(item) => {
      const response = await removeFromWatchLater(item);
      watchLaterDispatch({type: 'REMOVE_WATCHLATER_VIDEO' , payload : response});
      setVideos(prev => prev.map(prevVideo => prevVideo._id === item._id ? {...prevVideo , watchLater:false} : prevVideo))
    }


    const addLikeVideos = async(item) => {
      const response = await likeVideo(item);
      videoDispatch({type: 'LIKE_VIDEO' , payload : response});
      setVideos(prev => prev.map(prevVideo => prevVideo._id === item._id ? {...prevVideo , isLiked:true} : prevVideo))
    }

    const removeLikeVideos = async(item) => {
      const response = await removeLikeVideo(item);
      videoDispatch({type: 'DISLIKE_VIDEO' , payload : response});
      setVideos(prev => prev.map(prevVideo => prevVideo._id === item._id ? {...prevVideo , isLiked:false} : prevVideo))
    }

    const addDisLikeVideos = (item) => {
      setVideos(prev => prev.map(prevVideo => prevVideo._id === item._id ? {...prevVideo , isDisliked:true} : prevVideo))
    }

    const removeDisLikeVideos = (item) => {
      setVideos(prev => prev.map(prevVideo => prevVideo._id === item._id ? {...prevVideo , isDisliked:false} : prevVideo))
    }


    
  return (
    <>
    <div className="single-video-page-container">
       <SideBar />
       <div className="video-card">
       <iframe className='embeded-video'
       width="560" 
       height="315" 
       src={`${URL}${video.video_id}`}
       title="YouTube video player" 
       frameborder="0" 
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
       </iframe>
       <div className='single-video-title'>{video.title}</div>
       <div className='video-info'> 232434 views - Apr 25, 2022 
       <span className='video-btns'>
         {video.isLiked 
         ? <span className='video-like-btn' onClick={() => removeLikeVideos(video)}><i className="fa-solid fa-thumbs-up"></i> Like</span>
         : <span className='video-like-btn' onClick={() => addLikeVideos(video)}><i className="fa-regular fa-thumbs-up"></i> Like</span>
         }
         {video.isDisliked 
         ? <span className='video-dis-like-btn' onClick={() => removeDisLikeVideos(video)}><i className="fa-solid fa-thumbs-down"></i> Dislike</span>
         : <span className='video-dis-like-btn' onClick={() => addDisLikeVideos(video)}><i className="fa-regular fa-thumbs-down"></i> Dislike</span>
         }
         {
           video.watchLater
           ? <span className='video-watch-later-btn' onClick={() => removeVideoFromWatchLater(video)}><i className="fa-solid fa-clock"></i> Remove From Watch Later</span>
           : <span className='video-watch-later-btn' onClick={() => addVideoToWatchLater(video)}><i className="fa-solid fa-clock"></i> Add To Watch Later</span>
         }
         <span className='video-play-list-btn'><i className="fa-solid fa-list-check"></i> Add To Play List</span>
         </span></div>
       </div>
    </div>
    </>
  )
}
