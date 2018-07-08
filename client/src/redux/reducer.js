const initialState = {
  currentTracks: [],
  currentTracksData: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_TRACKS":
      return {...state, currentTracks: action.payload};
    case "SET_CURRENT_TRACKS_DATA":
      return {...state, currentTracksData: action.payload};
    default:
      return state;
  }
};
export default rootReducer;