import React , { useState }  from 'react';
import { SideBar, CategoryBar, Navbar } from '../../components/index';
import { useVideos , useToastContext, useUserAuth } from '../../context/index';
import './HomePage.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addVideoToHistory } from '../../store/historyVideoSlice';
import { addPlaylist , addVideoToPlaylist , removeVideoFromPlaylist } from '../../store/playlistsSlice';
import { addToWatchLater , removeFromWatchLater } from '../../store/watchLaterSlice';

export function HomePage() {
  const dispatch = useDispatch();
  const { filteredVideos , setFilteredVideos , setVideos } = useVideos();
  const [showModal , setShowModal ] = useState(false);
  const [playlistName , setPlaylistName ] = useState('');
  const { isLogIn } = useUserAuth();
  const notify = useToastContext();
  

  const reduxPlayLists = useSelector(state => state.playlists);

  


  const updatePlayList = async(e, playlistId , video) => {
    if(e.target.checked){
       dispatch(addVideoToPlaylist({playlistId , video})) ;
       notify('Added Video In Playlist' , {type :'success'});
    }else{
       dispatch(removeVideoFromPlaylist({playlistId , video}));
       notify('Removed Video From Playlist' , {type :'success'});       
    }
  }

  const createPlaylist = async() => {
    if(playlistName){
      dispatch(addPlaylist(playlistName));
    }else{
      notify('Please Enter Playlist Name!',{type:'warning'})
    }
    setPlaylistName('');
  }

  const closeModal = () => {
    setShowModal(false);
  }



  const addVideoToWatchLater = (item) => {
    if(isLogIn){
    dispatch(addToWatchLater(item));
    setVideos(prev => prev.map(prevVideo => prevVideo._id === item._id ? {...prevVideo , watchLater:true} : prevVideo))
    }else{
      notify('Please Login!',{ type:'warning' })
    }
  }

  const removeVideoFromWatchLater = (item) => {
    dispatch(removeFromWatchLater(item));
    setVideos(prev => prev.map(prevVideo => prevVideo._id === item._id ? {...prevVideo , watchLater:false} : prevVideo))
  }

  const toggleBtn = id => {
     setFilteredVideos( prev => prev.map(item => item._id === id ? {...item, toggle: item.toggle ? false : true} : {...item , toggle : false}))
  }

  const showPlaylistModal = (id) => {
    if(isLogIn){
      setShowModal(true);
      toggleBtn(id);
    }else{
      notify('Please Login!',{ type:'warning' });
      toggleBtn(id);
    }
  }



  return (
    <div className='page-container'>
      <Navbar searchBar={true} />
    <SideBar />
    <div className="home-section">
    <CategoryBar />
    <div className='homePage-container'>
    <div className='videos-container'>
     {filteredVideos.map((video) => (
       <div key={video._id} className='video'>
         <Link to={`/videos/${video._id}`} onClick={() => dispatch(addVideoToHistory(video))}><img src={video.image} alt="videoImg" className='video-img' /></Link>
         <div className='video-info-container'>
         <div className="video-title">{video.title}</div>
         <div className="video-owner">Video by : {video.creator}</div>
         <div className='video-info'>{video.views}k Views |  {video.upload}  <span className='options'><i className="fa-solid fa-ellipsis-vertical options-icon" onClick={() => toggleBtn(video._id)}></i></span></div>
         </div>
         <div className='video-model-btns' id={video.toggle ? 'visible' : 'hidden' }>
         {
           video.watchLater
           ?  <div className='video-model-btn' onClick={() => removeVideoFromWatchLater(video)}><i className="fa-solid fa-clock-rotate-left"></i> Remove From Watch Later</div>
           :  <div className='video-model-btn' onClick={() => addVideoToWatchLater(video)}><i className="fa-solid fa-clock"></i> Add To Watch Later</div>
         }
           <div className='video-model-btn' onClick={() => showPlaylistModal(video._id)}><i className="fa-solid fa-list-check"></i> Add To Playlist</div>

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
           <button className="close-btn dismiss-btn" onClick={closeModal}><i class="lni lni-close"></i></button>
           {reduxPlayLists.map(playlist => (
             <div className='playlist-container' key={playlist._id}>
               <input type="checkbox"
               onClick={(e) => updatePlayList(e, playlist._id, video)} />
               <div>{playlist.name}</div>
             </div>
           ))}
       </div>
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
