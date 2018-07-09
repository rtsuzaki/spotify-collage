
export const setCurrentUser = user => ({type: "SET_CURRENT_USER", payload: user});
export const setCurrentlySelectedMedia = media => ({type: "SET_CURRENTLY_SELECTED_MEDIA", payload: media});
export const setTopTracks = tracks => ({type: "SET_TOP_TRACKS", payload: tracks});
export const setUserPlaylists = playlists => ({type: "SET_USER_PLAYLISTS", payload: playlists});
export const setCurrentTracksData = data => ({ type: "SET_CURRENT_TRACKS_DATA", payload: data });
export const setCurrentTracks = tracks => ({type: "SET_CURRENT_TRACKS", payload: tracks});
