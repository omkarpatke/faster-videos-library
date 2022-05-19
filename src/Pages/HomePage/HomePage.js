import React , { useState }  from 'react';
import { SideBar, CategoryBar } from '../../components/index';
import { useVideos , useHistoryContext , useWatchlaterContext , usePlayListContext, useToastContext } from '../../context/index';
import './HomePage.css';
import { Link } from 'react-router-dom';
import { addVideoInHistory , addToWatchLater, removeFromWatchLater , createPlayList , addVideoToPlaylist , removeVideoFromPlaylist } from '../../api-calls/api-calls';

export function HomePage() {
  const { historyVideosDispatch } = useHistoryContext();
  const { watchLaterDispatch } = useWatchlaterContext();
  const { filteredVideos , setFilteredVideos , setVideos } = useVideos();
  const [showModal , setShowModal ] = useState(false);
  const [playlistName , setPlaylistName ] = useState('');
  const { playListState , playListDispatch } = usePlayListContext();
  const notify = useToastContext();
  let playlists;
    if(playListState.payload === undefined || playListState.payload === 'none'){
      playlists = [];
    }else{
      playlists = playListState.payload.playlist.data.playlists;
    }

  const updatePlayList = async(e, playlistId , videoData) => {
    if(e.target.checked){
       await addVideoToPlaylist(videoData , playlistId); 
    }else{
      await removeVideoFromPlaylist(playlistId , videoData._id);       
    }
  }

  const createPlaylist = async() => {
    if(playlistName){
      const response = await createPlayList(playlistName);
      playListDispatch({type : 'NEW_PLAYLIST', payload: response})
    }else{
      notify('Please Enter Playlist Name!',{type:'warning'})
    }
    setPlaylistName('');
  }

  const closeModal = () => {
    setShowModal(false);
  }

  const showPlaylistModal = (id) => {
    setShowModal(true);
    toggleBtn(id);

  }


  const addVideoToHistory = async(video) => {
    const response = await addVideoInHistory(video);
    historyVideosDispatch({type:'HISTORY_VIDEO', payload:response});
  }

  const addVideoToWatchLater = async(item) => {
    const response = await addToWatchLater(item);
    watchLaterDispatch({type: 'WATCHLATER_VIDEO' , payload : response});
    setVideos(prev => prev.map(prevVideo => prevVideo._id === item._id ? {...prevVideo , watchLater:true} : prevVideo))
  }

  const removeVideoFromWatchLater = async(item) => {
    const response = await removeFromWatchLater(item);
    watchLaterDispatch({type: 'REMOVE_WATCHLATER_VIDEO' , payload : response});
    setVideos(prev => prev.map(prevVideo => prevVideo._id === item._id ? {...prevVideo , watchLater:false} : prevVideo))
  }
  
  


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
         {
           video.watchLater
           ?  <div className='video-model-btn' onClick={() => removeVideoFromWatchLater(video)}><i className="fa-solid fa-clock-rotate-left"></i> Remove From Watch Later</div>
           :  <div className='video-model-btn' onClick={() => addVideoToWatchLater(video)}><i className="fa-solid fa-clock"></i> Add To Watch Later</div>
         }
           <div className='video-model-btn' onClick={() => showPlaylistModal(video._id)}><i className="fa-solid fa-list-check"></i> Add To Playlist</div>

         </div>
         <div className={showModal ? 'playlistModal' : 'hidden'}>
           <h2 className='modal-heading'>Create Playlist</h2>
           <div>
           <input 
           type="text" 
           placeholder='Playlist Name...' 
           className='modal-input' 
           value={playlistName} 
           onChange={(e) => setPlaylistName(e.target.value)} />

           <button className='playlist-btn' onClick={createPlaylist}>Create Playlist</button>
           </div>
           <button className="close-btn dismiss-btn" onClick={closeModal}>X</button>
           {playlists.map(playlist => (
             <div className='playlist-container' key={playlist._id}>
               <input type="checkbox"
               onChange={(e) => updatePlayList(e, playlist._id, video)} />
               <div>{playlist.title}</div>
             </div>
           ))}
       </div>
       </div>
     ))}
     </div>
     {/* modal section */} 
     
    </div>
    </div>
    
    </div>
  )
}
