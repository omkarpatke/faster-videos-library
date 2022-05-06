import React from 'react';
import { SideBar, CategoryBar } from '../../components/index';
import { useVideos } from '../../context/index';
import './HomePage.css';
import { Link } from 'react-router-dom';

export function HomePage() {
  const { videos } = useVideos();
  
  return (
    <div className='page-container'>
    <SideBar />
    <div className="home-section">
    <CategoryBar />
    <div className='homePage-container'>
    <div className='videos-container'>
     {videos.map((video) => (
       <div key={video._id} className='video'>
         <Link to={`/videos/${video._id}`}><img src={video.image} alt="videoImg" className='video-img' /></Link>
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
