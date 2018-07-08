import React from 'react';
import TrackTableEntry from './TrackTableEntry.jsx';

const TrackTable = (props) => {
  return (
    <div >
      <tr>
        <th>Songs</th>
        <th>Artists</th>
      </tr>
      {props.currentTracks.map((track) => <TrackTableEntry track={track}/>)}
    </div>
  )
}

export default TrackTable;
