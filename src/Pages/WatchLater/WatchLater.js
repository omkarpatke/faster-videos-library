import React from 'react';
import './WatchLater.css';
import { Navbar, SideBar } from '../../components/index';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWatchLater , removeAllVideos  } from '../../store/watchLaterSlice';
import { useVideos } from '../../context';
;


export function WatchLater() {
  const dispatch = useDispatch();
  const watchLaterVideos = useSelector(state => state.watchLaterVideos);
  const { setVideos } = useVideos();

  const removeWatchLaterVideos = (video) => {
    dispatch(removeFromWatchLater(video));
    setVideos(prev => prev.map(prevVideo => prevVideo._id === video._id ? {...prevVideo , watchLater:false} : prevVideo))
  }

  return (
    <div className='page-container'>
      <Navbar searchBar={false} />
    <SideBar />
    <div className="home-section">
    <h2>Watch Later Page  <span onClick={() => dispatch(removeAllVideos())} className='delete-btn'>Delete All</span></h2>
    <div className='history-videos'>
         {watchLaterVideos.length > 0 ?
          watchLaterVideos.map(video => (
           <div key={video._id} className='video'>
           <Link to={`/videos/${video._id}`}><img src={video.image} alt="videoImg" className='video-img like-video-img' /></Link>
           <div className="dislike-btn" title='Delete History' onClick={() => removeWatchLaterVideos(video)}>X</div>
           <div className='video-info-container'>
           <div className="video-title">{video.title}</div>
           <div className='video-info'>270k Views |  8 months ago</div>
           </div>
         </div>
         ))
        : <h1>No WatchLater Videos</h1>}
      </div>

    </div>
    </div>
  )
}
