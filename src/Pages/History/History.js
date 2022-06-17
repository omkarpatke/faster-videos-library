import React from 'react';
import './History.css';
import { SideBar } from '../../components/index';
import { Link } from 'react-router-dom';
import { removeHistoryVideo , removeAllHistory  } from '../../api-calls/api-calls';
import { useHistoryContext } from '../../context/HistoryContext';

export function History() {
    const { historyVideosState , historyVideosDispatch } = useHistoryContext();
    let historyVideos;
    if(historyVideosState.payload === 'none' || historyVideosState.payload === undefined){
      historyVideos = [];
    }else{
      historyVideos = historyVideosState.payload.historyVideos.data.history;
    }

  const removeHistoryVideos = async(video) => {
    const response = await removeHistoryVideo(video);
    historyVideosDispatch({type:'REMOVE_HISTORY_VIDEO', payload:response});
  }

  const deleteAllHistory = async() => {
    const response = await removeAllHistory();
    historyVideosDispatch({type:'REMOVE_HISTORY_VIDEO', payload:response});
  }

  return (
    <div className='page-container'>
    <SideBar />
    <div className="home-section">
    <div className='history-page-container'>
      <h2 className='heading'>History Videos <span onClick={deleteAllHistory} className='delete-btn'>Delete All</span></h2>
      <div className='history-videos'>
         {historyVideos.map(video => (
           <div key={video._id} className='video'>
           <Link to={`/videos/${video._id}`}><img src={video.image} alt="videoImg" className='video-img like-video-img' /></Link>
           <div className="dislike-btn" title='Delete History' onClick={() => removeHistoryVideos(video)}>X</div>
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
