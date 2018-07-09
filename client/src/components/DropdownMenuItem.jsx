import React from 'react';

const DropdownMenuItem = (props) => {
  return (
    <li 
      onClick={()=>{
        props.switchPlaylist(props.userId, props.playlist);
      }}
    >{props.playlist.name}</li>
  )
}


export default DropdownMenuItem;
