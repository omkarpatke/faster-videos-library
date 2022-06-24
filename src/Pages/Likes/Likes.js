import React from 'react';
import './Likes.css';
import { Navbar, SideBar } from '../../components/index';
import { useVideos } from '../../context';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeVideo, removeAllVideos } from '../../store/likeVideosSlice';



export function Likes() {
  const { setVideos } = useVideos();
  const likeVideos = useSelector(state => state.likeVideos);
  const dispatch = useDispatch();

  const removeLikeVideos = async(item) => {
    dispatch(removeVideo(item));
    setVideos(prev => prev.map(prevVideo => prevVideo._id === item._id ? {...prevVideo , isLiked:false} : prevVideo))
  }


  return (
    <div className='page-container'>
    <Navbar searchBar={false} />
    <SideBar />
    <div className="home-section">
      <h2>Likes Videos  <span onClick={() => dispatch(removeAllVideos())} className='delete-btn'>Delete All</span></h2>
    <div className='likes-page-container'>
      <div className='like-videos'>
         {likeVideos.length > 0 
         ? likeVideos.map(video => (
           <div key={video._id} className='video'>
           <Link to={`/videos/${video._id}`}><img src={video.image} alt="videoImg" className='video-img like-video-img' /></Link>
           <div className="dislike-btn" title='UnLike' onClick={() => removeLikeVideos(video)}>X</div>
           <div className='video-info-container'>
           <div className="video-title">{video.title}</div>
           <div className='video-info'>270k Views |  8 months ago</div>
           </div>
         </div>
         ))
        : <h1>No Like Videos</h1>
        }
      </div>
    </div>
    </div>
    </div>
  )
}
