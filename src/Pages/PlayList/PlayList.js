
import React from 'react';
import { SideBar } from '../../components/index';


import React , { useEffect , useState }  from 'react';
import { Link } from 'react-router-dom';
import { SideBar } from '../../components/index';
import { usePlayListContext } from '../../context';
import { removePlayList } from '../../api-calls/api-calls';

import './PlayList.css';

export function PlayList() {
  const {playListState , playListDispatch } = usePlayListContext();
  const [playlists , setPlayLists] = useState([]);


  useEffect(() => {
  if(playListState.payload === undefined || playListState.payload === 'none'){
    setPlayLists([]);
  }else{
    setPlayLists(playListState.payload.playlist.data.playlists);
  }
},[playListState , playlists])
  
  
  

 
  return (
    <div className='page-container'>
    <SideBar />
    <div className="home-section">

    <div>Play List Page</div>

    <div className='play-lists'>
      {playlists && playlists.map( playlist => (
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
