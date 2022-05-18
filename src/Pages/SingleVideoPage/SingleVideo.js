import React , { useState } from 'react';
import { useParams } from 'react-router-dom';
import { addToWatchLater, addVideoToPlaylist, createPlayList,  likeVideo , removeFromWatchLater, removeLikeVideo, removeVideoFromPlaylist } from '../../api-calls/api-calls';
import { SideBar } from '../../components';
import { useToastContext, useVideos, useWatchlaterContext } from '../../context';
import { usePlayListContext } from '../../context/PlayListContext';
import './SingleVideo.css';

export function SingleVideo() {
    const [showModal , setShowModal ] = useState(false);
    const [playlistName , setPlaylistName ] = useState('');
    const URL = "https://www.youtube.com/embed/";
    const { videoId } = useParams();
    const { videos , setVideos , videoDispatch } = useVideos();
    const { watchLaterDispatch } = useWatchlaterContext();
    const video  = videos.find( item => item._id === videoId );
    const notify = useToastContext();
    const {playListState , playListDispatch } = usePlayListContext();
    let playlists;
    if(playListState.payload === undefined || playListState.payload === 'none'){
      playlists = [];
    }else{
      playlists = playListState.payload.playlist.data.playlists;
    }

    const closeModal = () => {
      setShowModal(false);
    }

    const showPlaylistModal = () => {
      setShowModal(true);
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


    const addLikeVideos = async(item) => {
      const response = await likeVideo(item);
      videoDispatch({type: 'LIKE_VIDEO' , payload : response});
      setVideos(prev => prev.map(prevVideo => prevVideo._id === item._id ? {...prevVideo , isLiked:true} : prevVideo))
    }

    const removeLikeVideos = async(item) => {
      const response = await removeLikeVideo(item);
      videoDispatch({type: 'DISLIKE_VIDEO' , payload : response});
      setVideos(prev => prev.map(prevVideo => prevVideo._id === item._id ? {...prevVideo , isLiked:false} : prevVideo))
    }

    const addDisLikeVideos = (item) => {
      setVideos(prev => prev.map(prevVideo => prevVideo._id === item._id ? {...prevVideo , isDisliked:true} : prevVideo))
    }

    const removeDisLikeVideos = (item) => {
      setVideos(prev => prev.map(prevVideo => prevVideo._id === item._id ? {...prevVideo , isDisliked:false} : prevVideo))
    }

    const updatePlayList = async(e, playlistId , videoData) => {
      if(e.target.checked){
         await addVideoToPlaylist(videoData , playlistId); 
      }else{
        await removeVideoFromPlaylist(playlistId , videoData._id);       
      }
    }
    
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
         {video.isLiked 
         ? <span className='video-like-btn' onClick={() => removeLikeVideos(video)}><i className="fa-solid fa-thumbs-up"></i> Like</span>
         : <span className='video-like-btn' onClick={() => addLikeVideos(video)}><i className="fa-regular fa-thumbs-up"></i> Like</span>
         }
         {video.isDisliked 
         ? <span className='video-dis-like-btn' onClick={() => removeDisLikeVideos(video)}><i className="fa-solid fa-thumbs-down"></i> Dislike</span>
         : <span className='video-dis-like-btn' onClick={() => addDisLikeVideos(video)}><i className="fa-regular fa-thumbs-down"></i> Dislike</span>
         }
         {
           video.watchLater
           ? <span className='video-watch-later-btn' onClick={() => removeVideoFromWatchLater(video)}><i className="fa-solid fa-clock"></i> Remove From Watch Later</span>
           : <span className='video-watch-later-btn' onClick={() => addVideoToWatchLater(video)}><i className="fa-solid fa-clock"></i> Add To Watch Later</span>
         }
         <span className='video-play-list-btn' onClick={() => showPlaylistModal()}><i className="fa-solid fa-list-check"></i> Add To Play List</span>
         </span> 
         </div> 
 
         {/* modal section */} 
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
    </div>
    </>
  )
}
