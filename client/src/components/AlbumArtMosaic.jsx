import React from 'react';
import { connect } from "react-redux";
import MosaicEntry from './MosaicEntry.jsx';

const mapStateToProps = state => {
  return { currentlySelectedMedia: state.currentlySelectedMedia };
};

const ConnectedAlbumArtMosaic = (props) => {
  var albums = {};

  // Combining tracks with same album together to prevent duplicate images
  props.currentlySelectedMedia.items.forEach((entry) => {
      if (!albums[entry.album.id]) {
        albums[entry.album.id] = [entry];
      } else {
        albums[entry.album.id].push(entry);
      }
  });
  // if (props.currentlySelectedPlaylist.items) {
    return (
      <div id="mosaicContainer">
        {Object.keys(albums).map((albumId, index) => <MosaicEntry albumEntry={albums[albumId]} key={index}/>)}
      </div>
    )
  // }
}

const AlbumArtMosaic = connect(mapStateToProps)(ConnectedAlbumArtMosaic);

export default AlbumArtMosaic;
