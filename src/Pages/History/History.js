import React from 'react';
import './History.css';
import { SideBar } from '../../components/index';
import { Link } from 'react-router-dom';
import { removeAllVideosFromHistory , removeVideoFromHistory } from '../../store/historyVideoSlice';
import { useDispatch , useSelector } from 'react-redux';


export function History() {
  const dispatch = useDispatch();
  const historyVideos = useSelector(state => state.historyVideos);
    
  return (
    <div className='page-container'>
    <SideBar />
    <div className="home-section">
    <div className='history-page-container'>
      <h2 className='heading'>History Videos <span onClick={() => dispatch(removeAllVideosFromHistory())} className='delete-btn'>Delete All</span></h2>
      <div className='history-videos'>
         {historyVideos.map(video => (
           <div key={video._id} className='video'>
           <Link to={`/videos/${video._id}`}><img src={video.image} alt="videoImg" className='video-img like-video-img' /></Link>
           <div className="dislike-btn" title='Delete History' onClick={() => dispatch(removeVideoFromHistory(video))}>X</div>
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
