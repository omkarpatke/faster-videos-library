
import React  from 'react';
import { Link } from 'react-router-dom';
import { SideBar } from '../../components/index';
import { usePlayListContext } from '../../context';
import { removePlayList } from '../../api-calls/api-calls';
import './PlayList.css';

export function PlayList() {
  const {playListState , playListDispatch } = usePlayListContext();
  let playlists;
  if(playListState.payload === undefined || playListState.payload === 'none'){
    playlists = [];
  }else{
    playlists = playListState.payload.playlist.data.playlists;
  }
  console.log(playlists);
  
  
  
 
  return (
    <div className='page-container'>
    <SideBar />
    <div className="home-section">
    <div className='play-lists'>
      {playlists.map( playlist => (
        <div key={playlist._id} className='playlist-card'>
         <span className="remove-playlist-btn" onClick={async() => {
           const response = await removePlayList(playlist._id);
           playListDispatch({type : 'REMOVE_PLAYLIST' , payload:response})
          }}
           >X</span>
         <Link to={`/playlist/${playlist._id}`}><h2 className="playlist-title">{playlist.title}</h2></Link>
          <div>Videos({playlist.videos.length})</div> 
        </div>
        
      ))}
    </div>
    </div>
    </div>
  )
}
