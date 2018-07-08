import React from 'react';
import MosaicEntry from './MosaicEntry.jsx';

const AlbumArtMosaic = (props) => {
  var albums = {};

  // Combining tracks with same album together
  props.currentlySelectedPlaylist.items.forEach((entry) => {
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

export default AlbumArtMosaic;
