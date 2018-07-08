import React from 'react';

const TrackTableEntry = (props) => {
  return (
      <tr>
        <td>
          {props.track.name.length < 25 ? props.track.name : props.track.name.slice(0,23)+'...'}
        </td>
        <td>{props.track.artists[0].name}</td>
      </tr>
  )
}

export default TrackTableEntry;
