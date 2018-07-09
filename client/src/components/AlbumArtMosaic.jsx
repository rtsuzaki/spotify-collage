import React from 'react';
import { connect } from "react-redux";
import MosaicEntry from './MosaicEntry.jsx';

const mapStateToProps = state => {
  return { 
    currentTracks: state.currentTracks,
    currentUser: state.currentUser,
  };
};

const ConnectedAlbumArtMosaic = (props) => {
  var albums = {};
  
  // Combining tracks with same album together to prevent duplicate images
  props.currentTracks.forEach((entry) => {
    if(entry.hasOwnProperty('album')) {
      if (!albums[entry.album.id]) {
        albums[entry.album.id] = [entry];
      } else {
        albums[entry.album.id].push(entry);
      }
    }
      
  });
  // if (props.currentlySelectedPlaylist.items) {
  return (
    <div id="mosaicContainer">
      {Object.keys(albums).map((albumId, index) => <MosaicEntry albumEntry={albums[albumId]} numberOfAlbums={Object.keys(albums).length} key={index} userId={props.currentUser.id} switchAlbum={props.switchAlbum}/>)}
    </div>
  )
  // }
}

const AlbumArtMosaic = connect(mapStateToProps)(ConnectedAlbumArtMosaic);

export default AlbumArtMosaic;
