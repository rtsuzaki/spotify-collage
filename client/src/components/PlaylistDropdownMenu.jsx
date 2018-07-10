import React from 'react';
import { connect } from 'react-redux';
import DropdownMenuItem from './DropdownMenuItem.jsx';
import { toggleDropdownMenu, closeDropdownMenu } from '../redux/actions.js'

const mapStateToProps = (state) => {
  return {
    currentlySelectedPlaylist: state.currentlySelectedPlaylist,
    currentUser: state.currentUser,
    userPlaylists: state.userPlaylists,
    dropdownMenuOpen: state.dropdownMenuOpen,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleDropdownMenu: () => dispatch(toggleDropdownMenu()),
    closeDropdownMenu: () => dispatch(closeDropdownMenu()),
  };
};

const ConnectedPlaylistDropdownMenu = (props) => {
  return (
    <div id="playlistNav-li">
      <div id="currentSelectionText">
        <span className="playlist-title">
          Currently Selected: 
        </span>
      </div>
      <div className="playlistNav-li"  onClick={props.toggleDropdownMenu}>
        <div className="playlist-title">
          {props.currentlySelectedPlaylist.name}
        </div>
      </div>
      {props.dropdownMenuOpen &&
      <div className="backdrop" onClick={props.closeDropdownMenu}>
        <ul className="modal">
          {props.userPlaylists.map((playlist) => (<DropdownMenuItem key={playlist.id} playlist={playlist} userId={props.currentUser.id} switchPlaylist={props.switchPlaylist}/>))}
        </ul>
      </div>
      }
   </div>

  )
}

const PlaylistDropdownMenu = connect(mapStateToProps, mapDispatchToProps)(ConnectedPlaylistDropdownMenu);

export default PlaylistDropdownMenu;
