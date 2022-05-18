import React  from 'react';
import { SideBar, CategoryBar } from '../../components/index';
import { useVideos } from '../../context/index';
import './HomePage.css';
import { Link } from 'react-router-dom';
import { addVideoInHistory } from '../../api-calls/api-calls';
import { useHistoryContext } from '../../context/HistoryContext';

export function HomePage() {
  const { historyVideosDispatch } = useHistoryContext();


  const addVideoToHistory = async(video) => {
    const response = await addVideoInHistory(video);
    historyVideosDispatch({type:'HISTORY_VIDEO', payload:response});
  }
  

  const { filteredVideos , setFilteredVideos } = useVideos();
  


  const toggleBtn = id => {
     setFilteredVideos( prev => prev.map(item => item._id === id ? {...item, toggle: !item.toggle} : item))
  }



  return (
    <div className='page-container'>
    <SideBar />
    <div className="home-section">
    <CategoryBar />
    <div className='homePage-container'>
    <div className='videos-container'>
     {filteredVideos.map((video) => (
       <div key={video._id} className='video'>
         <Link to={`/videos/${video._id}`} onClick={() => addVideoToHistory(video)}><img src={video.image} alt="videoImg" className='video-img' /></Link>
         <div className='video-info-container'>
         <div className="video-title">{video.title}</div>
         <div className="video-owner">Video by : {video.creator}</div>
         <div className='video-info'>270k Views |  8 months ago  <span className='options'><i className="fa-solid fa-ellipsis-vertical options-icon" onClick={() => toggleBtn(video._id)}></i></span></div>
         </div>
         <div className='video-model-btns' id={video.toggle ? 'visible' : 'hidden' }>
           <div className='video-model-btn'><i className="fa-solid fa-clock-rotate-left"></i> Add To Watch Later</div>
           <div className='video-model-btn'><i className="fa-solid fa-list-check"></i> Add To Playlist</div>

         </div>
       </div>
     ))}
     </div>
    </div>
    </div>
    </div>
  )
}
