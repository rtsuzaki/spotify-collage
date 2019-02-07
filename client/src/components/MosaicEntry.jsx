import React from 'react';

const MosaicEntry = (props) => {
  // Note that props.albumEntry is an array of tracks with same album
  if (props.numberOfAlbums === 1) {
    var imageQuality = 0;
    var imageHeight = 250;
  } else if (props.numberOfAlbums > 1 && props.numberOfAlbums <= 5) {
    var imageQuality = 0;
    var imageHeight = 200;
  } else if (props.numberOfAlbums > 5 && props.numberOfAlbums < 30 ) {
    var imageQuality = 1;
    var imageHeight = 100;
  } else {
    var imageQuality = 2;
    var imageHeight = 75;
  }

  return (

      <img className="albumArt" src={props.albumEntry[0].album.images[imageQuality].url} style={{ width: imageHeight }} onClick={()=>{props.switchAlbum(props.albumEntry[0].album)}}></img>

  )
}

export default MosaicEntry;
