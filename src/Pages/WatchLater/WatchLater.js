import React from 'react';
import './WatchLater.css';
import { SideBar } from '../../components/index';
import { useWatchlaterContext } from '../../context';
import { removeFromWatchLater } from '../../api-calls/api-calls';
import { Link } from 'react-router-dom';


export function WatchLater() {
  const { watchLaterState , watchLaterDispatch } = useWatchlaterContext();

    let watchLaterVideos;
    if(watchLaterState.payload === 'none' || watchLaterState.payload === undefined){
      watchLaterVideos = [];
    }else{
      watchLaterVideos = watchLaterState.payload.watchLaterVideos.data.watchlater;
    }

  const removeWatchLaterVideos = async(video) => {
    const response = await removeFromWatchLater(video);
    watchLaterDispatch({type:'REMOVE_WATCHLATER_VIDEO', payload:response});
  }

  return (
    <div className='page-container'>
    <SideBar />
    <div className="home-section">
    <h2>Watch Later Page</h2>
    <div className='history-videos'>
         {watchLaterVideos.map(video => (
           <div key={video._id} className='video'>
           <Link to={`/videos/${video._id}`}><img src={video.image} alt="videoImg" className='video-img like-video-img' /></Link>
           <div className="dislike-btn" title='Delete History' onClick={() => removeWatchLaterVideos(video)}>X</div>
           <div className='video-info-container'>
           <div className="video-title">{video.title}</div>
           <div className='video-info'>270k Views |  8 months ago  <span className='options'><i className="fa-solid fa-ellipsis-vertical"></i></span></div>
           </div>
         </div>
         ))}
      </div>

    </div>
    </div>
  )
}
