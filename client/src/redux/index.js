import store from './store.js';
import { 
  setCurrentUser,
  setUserPlaylists,
  setCurrentlySelectedPlaylist,
  setTopTracks,
  setCurrentTracks,
  setCurrentTracksData,
  toggleDropdownMenu,
  closeDropdownMenu,
  setFeatureCount,
} from './actions.js';

window.store = store;
window.setCurrentUser = setCurrentUser;
window.setUserPlaylists = setUserPlaylists;
window.setCurrentlySelectedPlaylist = setCurrentlySelectedPlaylist;
window.setTopTracks = setTopTracks;
window.setCurrentTracks = setCurrentTracks;
window.setCurrentTracksData = setCurrentTracksData;
window.toggleDropdownMenu = toggleDropdownMenu;
window.closeDropdownMenu = closeDropdownMenu;
window.setFeatureCount = setFeatureCount;
