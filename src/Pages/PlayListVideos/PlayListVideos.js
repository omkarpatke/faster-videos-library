import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Navbar, SideBar } from '../../components'
import { useDispatch, useSelector } from 'react-redux';
import { removeVideoFromPlaylist } from '../../store/playlistsSlice';

export  function PlayListVideos() {
    const { playListVideosId } = useParams();
    const dispatch = useDispatch();
    const playListVideos = useSelector(state => state.playlists.find(item => item._id === playListVideosId).videos);
    

  return (
    <div className='page-container'>
      <Navbar searchBar={false} />
    <SideBar />
    <div className="home-section">
    <div className='play-lists'>
    {playListVideos && playListVideos.map(video => (
        <div key={video._id} className='video'>
        <Link to={`/videos/${video._id}`}><img src={video.image} alt="videoImg" className='video-img like-video-img' /></Link>
        <div className="dislike-btn" title='Delete Video' onClick={() => dispatch(removeVideoFromPlaylist({ playListId:playListVideosId , video}))}>X</div>
        <div className='video-info-container'>
        <div className="video-title">{video.title}</div>
        <div className='video-info'>270k Views |  8 months ago </div>
        </div>
      </div>
    ))}  
    </div>
    </div>
    </div>
  )
}
