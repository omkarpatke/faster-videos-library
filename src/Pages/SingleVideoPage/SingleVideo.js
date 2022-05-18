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
       <div className='single-video-title'>{video.title}</div>
       <div className='video-info'> 232434 views - Apr 25, 2022 
       <span className='video-btns'>
         <span className='video-like-btn'><i class="fa-solid fa-thumbs-up"></i> Like</span>
         <span className='video-dis-like-btn'><i class="fa-solid fa-thumbs-down"></i> Dislike</span>
         <span className='video-watch-later-btn'><i class="fa-solid fa-clock"></i> Add To Watch Later</span>
         <span className='video-play-list-btn'><i class="fa-solid fa-list-check"></i> Add To Play List</span>
         </span></div>
       </div>
    </div>
    </>
  )
}
