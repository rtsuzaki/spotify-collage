export const setCurrentUser = user => ({type: "SET_CURRENT_USER", payload: user});
export const setCurrentlySelectedPlaylist = playlist => ({type: "SET_CURRENTLY_SELECTED_PLAYLIST", payload: playlist});
export const setTopTracks = tracks => ({type: "SET_TOP_TRACKS", payload: tracks});
export const setUserPlaylists = playlists => ({type: "SET_USER_PLAYLISTS", payload: playlists});
export const setCurrentTracksData = data => ({ type: "SET_CURRENT_TRACKS_DATA", payload: data });
export const setCurrentTracks = tracks => ({type: "SET_CURRENT_TRACKS", payload: tracks});
export const toggleDropdownMenu = () => ({type: "TOGGLE_DROPDOWN_MENU", payload: null});
export const closeDropdownMenu = () => ({type: "CLOSE_DROPDOWN_MENU", payload: null});
export const setFeatureCount = featureDataObj => ({type: "SET_FEATURE_COUNT", payload: featureDataObj});
export const setKeysData = tracksData => ({type: "SET_KEYS_DATA", payload: tracksData});


