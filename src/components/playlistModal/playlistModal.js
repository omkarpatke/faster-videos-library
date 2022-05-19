import React from 'react';
import './playlist.css';

export default function PlaylistModal() {
  return (
      <>
       <div className="modal-content">
            <div className="modal">
                <input type="text" ><button  className="close-btn dismiss-btn">X</button></input>
             </div>
       </div>
      </>
  )
}
