
import React , { useEffect , useState }  from 'react';
import { Link } from 'react-router-dom';
import { SideBar } from '../../components/index';
import { usePlayListContext } from '../../context';
import { getPlayList, removePlayList } from '../../api-calls/api-calls';

import './PlayList.css';

export function PlayList() {
  const {playListState , playListDispatch } = usePlayListContext();
  const [playlists , setPlayLists] = useState([]);

const data = async() => {
  const getData = await getPlayList();
  setPlayLists(getData.playlist.data.playlists);
  }

  useEffect(() => {
    data();
  },[playListState]);
  
  
  

 
  return (
    <div className='page-container'>
    <SideBar />
    <div className="home-section">

    <h2>Play List Page</h2>

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
