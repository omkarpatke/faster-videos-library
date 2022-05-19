import React from 'react';
import { SideBar } from '../../components/index';
import { usePlayListContext } from '../../context/PlayListContext';
import './PlayList.css';

export function PlayList() {
  const {playListState } = usePlayListContext();
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
    </div>
    </div>
  )
}
