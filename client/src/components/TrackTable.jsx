import React from 'react';
import TrackTableEntry from './TrackTableEntry.jsx';

const TrackTable = (props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Songs</th>
          <th>Artists</th>
        </tr>
      </thead>
      <tbody>
        {props.currentTracks.map((track, index) => <TrackTableEntry key={index} track={track}/>)}
      </tbody>
    </table>
  )
}

export default TrackTable;
