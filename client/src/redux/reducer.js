const initialState = {
  currentUser: {},
  topTracks: [],
  currentlySelectedPlaylist: {},
  userPlaylists: [],
  currentTracks: [],
  currentTracksData: [],
  dropdownMenuOpen: false,
  danceability: {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    total: 0,
    numberOfTracks: 0,
  },
  energy: {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    total: 0,
    numberOfTracks: 0,
  },
  acousticness: {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    total: 0,
    numberOfTracks: 0,
  },
  instrumentalness: {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    total: 0,
    numberOfTracks: 0,
  },
  valence: {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    total: 0,
    numberOfTracks: 0,
  },
  speechiness: {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    total: 0,
    numberOfTracks: 0,
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {...state, currentUser: action.payload};
    case "SET_TOP_TRACKS":
      return {...state, topTracks: action.payload};
    case "SET_CURRENTLY_SELECTED_PLAYLIST":
      return {...state, currentlySelectedPlaylist: action.payload};
    case "SET_USER_PLAYLISTS":
      return {...state, userPlaylists: action.payload};
    case "SET_CURRENT_TRACKS":
      return {...state, currentTracks: action.payload};
    case "SET_CURRENT_TRACKS_DATA":
      return {...state, currentTracksData: action.payload};
    case "SET_FEATURE_COUNT":
      let feature = action.payload.feature;
      let featureData = action.payload.data;
      var chartCount = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: [],
        10: [],
        total: 0,
        numberOfTracks: 0,
      };
      featureData.forEach((track) => {
        const trackData = Math.round(track[feature]*10);
        // console.log('TRACK DATA', trackData)
        (chartCount[trackData]).push(track[feature]*10);
        // console.log('chartCount', chartCount[trackData])
        chartCount.total += track[feature]*100;
        chartCount.numberOfTracks += 1;
      })
      return {...state, [feature]: chartCount};
    case "TOGGLE_DROPDOWN_MENU":
      return {...state, dropdownMenuOpen: !state.dropdownMenuOpen};
    case "CLOSE_DROPDOWN_MENU":
      return {...state, dropdownMenuOpen: false};
    default:
      return state;
  }
};
export default rootReducer;