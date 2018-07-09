const initialState = {
  currentUser: {},
  topTracks: {},
  currentlySelectedMedia: {},
  userPlaylists: {},
  currentTracks: [],
  currentTracksData: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {...state, currentUser: action.payload};
    case "SET_TOP_TRACKS":
      return {...state, topTracks: action.payload};
    case "SET_CURRENTLY_SELECTED_MEDIA":
      return {...state, currentlySelectedMedia: action.payload};
    case "SET_USER_PLAYLISTS":
      return {...state, userPlaylists: action.payload};
    case "SET_CURRENT_TRACKS":
      return {...state, currentTracks: action.payload};
    case "SET_CURRENT_TRACKS_DATA":
      return {...state, currentTracksData: action.payload};
    default:
      return state;
  }
};
export default rootReducer;