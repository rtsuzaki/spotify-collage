import React from 'react';
import { connect } from "react-redux";
import TrackTableEntry from './TrackTableEntry.jsx';

const mapStateToProps = state => {
  return { currentTracks: state.currentTracks };
};

const ConnectedTrackTable = (props) => {
  return (
    <table id="trackTable"> 
      <thead>
        <tr>
          <th className="track-th">Current Tracks</th>
          {/* <th>Artists</th> */}
        </tr>
      </thead>
      <tbody>
        {props.currentTracks.map((track, index) => <TrackTableEntry key={index} track={track}/>)}
      </tbody>
    </table>
  )
}

const TrackTable = connect(mapStateToProps)(ConnectedTrackTable);

export default TrackTable;
