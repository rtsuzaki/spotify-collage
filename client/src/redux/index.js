import store from './store.js';
import { setCurrentUser, setCurrentlySelectedMedia, setUserPlaylists, setTopTracks, setCurrentTracks, setCurrentTracksData } from './actions.js';

window.store = store;
window.setCurrentUser = setCurrentUser;
window.setCurrentlySelectedMedia = setCurrentlySelectedMedia;
window.setUserPlaylists = setUserPlaylists;
window.setTopTracks = setTopTracks;
window.setCurrentTracks = setCurrentTracks;
window.setCurrentTracksData = setCurrentTracksData;