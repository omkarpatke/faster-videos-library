import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { SideBar } from '../../components'
import { usePlayListContext } from '../../context';
import { removeVideoFromPlaylist } from '../../api-calls/api-calls';

export  function PlayListVideos() {
    const {playListState , playListDispatch } = usePlayListContext();
    const { playListVideosId } = useParams();
  let playlists;
  if(playListState.payload === undefined || playListState.payload === 'none'){
    playlists = [];
  }else{
    playlists = playListState.payload.playlist.data.playlists;
  }
  let videos;
  if(playlists){
    videos = playlists.find(item => item._id === playListVideosId).videos
  }else{
    videos = [];
  }
  return (
    <div className='page-container'>
    <SideBar />
    <div className="home-section">
    <div className='play-lists'>
    {videos && videos.map(video => (
        <div key={video._id} className='video'>
        <Link to={`/videos/${video._id}`}><img src={video.image} alt="videoImg" className='video-img like-video-img' /></Link>
        <div className="dislike-btn" title='Delete Video' onClick={async() => {
           const response = await removeVideoFromPlaylist( playListVideosId, video._id);
           playListDispatch({type : 'REMOVE_DATA_FROM_PLAYLIST' , payload:response})
        }}>X</div>
        <div className='video-info-container'>
        <div className="video-title">{video.title}</div>
        <div className='video-info'>270k Views |  8 months ago  <span className='options'><i className="fa-solid fa-ellipsis-vertical"></i></span></div>
        </div>
      </div>
    ))}  
    </div>
    </div>
    </div>
  )
}
