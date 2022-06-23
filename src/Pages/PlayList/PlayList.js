
import React from 'react';
import { Link } from 'react-router-dom';
import { SideBar } from '../../components/index';
import './PlayList.css';
import { useDispatch, useSelector } from 'react-redux';
import { removePlayList } from '../../store/playlistsSlice';

export function PlayList() {
  const dispatch = useDispatch();
  const reduxPlaylist = useSelector(state => state.playlists);

  return (
    <div className='page-container'>
    <SideBar />
    <div className="home-section">

    <h2>Play List Page</h2>

    <div className='play-lists'>
      {reduxPlaylist && reduxPlaylist.map( playlist => (
        <div key={playlist._id} className='playlist-card'>
         <span className="remove-playlist-btn" onClick={() => dispatch(removePlayList(playlist._id))}
           >X</span>
         <Link to={`/playlist/${playlist._id}`}><h2 className="playlist-title">{playlist.name}</h2></Link>
          <div>Videos({playlist.videos.length})</div> 
        </div>
      ))}
    </div>

    </div>
    </div>
  )
}
