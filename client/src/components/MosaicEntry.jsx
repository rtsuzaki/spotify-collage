import React from 'react';

const MosaicEntry = (props) => {
  // Note that props.albumEntry is an array of tracks with same album
  return (
    <div>
      <img src={props.albumEntry[0].album.images[2].url} style={{ height: 50 }}/>
    </div>
  )
}

export default MosaicEntry;