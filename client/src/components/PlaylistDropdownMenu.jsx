import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    currentlySelectedMedia: state.currentlySelectedMedia,
    userPlaylists: state.userPlaylists,
  }
}

const ConnectedPlaylistDropdownMenu = () => {
  return (
    <div className="dd-wrapper">
    <div className="dd-header" >
      <div className="dd-header-title"></div>
    </div>
    <ul className="dd-list">
      <li className="dd-list-item">test1</li>
      <li className="dd-list-item">test2</li>
      <li className="dd-list-item">test3</li>
    </ul>
  </div>
  )
  
}

const PlaylistDropdownMenu = connect(mapStateToProps)(ConnectedPlaylistDropdownMenu);

export default PlaylistDropdownMenu;
