import React from 'react';
import { useParams } from 'react-router-dom';
import { SideBar } from '../../components';
import { useVideos } from '../../context';
import './SingleVideo.css';

export function SingleVideo() {
    const URL = "https://www.youtube.com/embed/";
    const { id } = useParams();
    const { videos } = useVideos();
    const video  = videos.find( item => item._id === id );
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
       <div className='video-title'>{video.title}</div>
       <div className='video-info'> 232434 views - Apr 25, 2022</div>
       </div>
    </div>
    </>
  )
}
