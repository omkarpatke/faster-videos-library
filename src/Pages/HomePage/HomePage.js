import React from 'react';
import { SideBar, CategoryBar } from '../../components/index';
import { useVideos } from '../../context/index';
import './HomePage.css';

export function HomePage() {
  const { videos } = useVideos();
  console.log(videos)
  return (
    <div className='page-container'>
    <SideBar />
    <div className="home-section">
    <CategoryBar />
    <div className='homePage-container'>
    <div className='videos-container'>
     {videos.map((video) => (
       <div key={video._id} className='video'>
         <img src={video.image} alt="videoImg" className='video-img' />
         <div className='video-info-container'>
         <div className="video-title">{video.title}</div>
         <div className="video-owner">Video by : {video.creator}</div>
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
