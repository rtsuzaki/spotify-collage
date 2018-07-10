import React from 'react';

const TrackTableEntry = (props) => {
  return (
    <div className="trackEntry">
      <tr>
        <td className="track-td">
          {props.track.name.length < 25 ? props.track.name : props.track.name.slice(0,25)+'...'}
        </td>
      </tr>
      <tr>
        <td className="artist-td">{props.track.artists[0].name}</td>
      </tr>
    </div>
  )
}

export default TrackTableEntry;
