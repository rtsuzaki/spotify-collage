import store from './store.js';
import { setCurrentTracks, setCurrentTracksData } from './actions.js';

window.store = store;
window.setCurrentTracks = setCurrentTracks;
window.setCurrentTracksData = setCurrentTracksData;