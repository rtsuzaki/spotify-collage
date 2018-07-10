import React from "react";
import { connect } from "react-redux";
import SpotifyWebApi from 'spotify-web-api-js';
import UserGreeting from './UserGreeting.jsx';
import AlbumArtMosaic from './AlbumArtMosaic.jsx';
import TrackTable from './TrackTable.jsx';
import BarChart from './BarChart.jsx';
import PieChart from './PieChart.jsx';
// import RadarChart from './RadarChart.jsx';
import PlaylistDropdownMenu from './PlaylistDropdownMenu.jsx';
import { 
  setCurrentUser,
  closeDropdownMenu,
  setCurrentlySelectedPlaylist,
  setUserPlaylists,
  setTopTracks,
  setCurrentTracks,
  setCurrentTracksData,
  setFeatureCount,
  setKeysData,
} from '../redux/actions.js';

import "../../styles/main.css";

const spotifyApi = new SpotifyWebApi();

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    userPlaylists: state.userPlaylists,
    currentlySelectedPlaylist: state.currentlySelectedPlaylist,
    topTracks: state.topTracks,
    currentTracks: state.currentTracks,
    currentTracksData: state.currentTracksData,
    dropdownMenuOpen: state.dropdownMenuOpen,
    // danceability: state.danceability,
    // energy: state.energy,
    // acousticness: state.acousticness,
    // instrumentalness: state.instrumentalness,
    // valence: state.valence,
    // speechiness: state.speechiness,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: user => dispatch(setCurrentUser(user)),
    setUserPlaylists: playlists => dispatch(setUserPlaylists(playlists)),
    setCurrentlySelectedPlaylist: playlist => dispatch(setCurrentlySelectedPlaylist(playlist)),
    setTopTracks: tracks => dispatch(setTopTracks(tracks)),
    setCurrentTracks: tracks => dispatch(setCurrentTracks(tracks)),
    setCurrentTracksData: data => dispatch(setCurrentTracksData(data)),
    closeDropdownMenu: () => dispatch(closeDropdownMenu()),
    setFeatureCount: featureDataObj => dispatch(setFeatureCount(featureDataObj)),
    setKeysData: tracksData => dispatch(setKeysData(tracksData)),
  };
};

class ConnectedApp extends React.Component{
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' }
    };

    this.handleClickOutsideDropdownMenu = this.handleClickOutsideDropdownMenu.bind(this);
    this.switchPlaylist = this.switchPlaylist.bind(this);
    this.switchAlbum = this.switchAlbum.bind(this);
    this.getMyTopTracks = this.getMyTopTracks.bind(this);
  }

  componentDidMount() {
    this.getCurrentUser()
    .then((userId) => {
      return this.getUserPlaylists(userId)
    })
    .then((playlists) => {
      this.props.setCurrentlySelectedPlaylist(playlists.items[0]);
      // return this.getMyTopTracks();
      return spotifyApi.getPlaylistTracks(this.props.currentUser.id, playlists.items[0].id)
    })
    .then((playlistTracksObj) => {
      this.setCurrentTracksFromTracksList(playlistTracksObj.items);
      this.setCurrentTracksDataFromTracksList(playlistTracksObj.items, 'playlist');
    })
    .catch(function(error) {
      console.error(error);
    });
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  getCurrentUser() {
    return (
      spotifyApi.getMe()
      .then((me) => {
        this.props.setCurrentUser(me);
        return me;
      }, (err) => {
        console.log(err)
      })
    )
  }

  //Works for any user--give userId as input
  getUserPlaylists(userId) {
    return (
      spotifyApi.getUserPlaylists(userId)
      .then((playlists) => {
        this.props.setUserPlaylists(playlists.items);
        return playlists;
      }, (err) => {
        console.error(err);
      })
    )
  }
  
  //Only works for current user's tracks
  getMyTopTracks(timeRange) {
    return (
      spotifyApi.getMyTopTracks({limit:50, time_range: timeRange})
      .then((topTracks) => {
        console.log(topTracks)
        this.props.setCurrentTracks(topTracks.items);
        // this.props.setCurrentTracksData(topTracks.items);
        if (timeRange === 'short_term') {
          var playlistTitle = 'Recent Top Tracks';
        } else if (timeRange === 'medium_term') {
          var playlistTitle = 'Past Months Top Tracks';
        } else if (timeRange === 'long_term') {
          var playlistTitle = 'All Time Top Tracks';
        }
        this.props.setCurrentlySelectedPlaylist({name: playlistTitle});
        this.setCurrentTracksDataFromTracksList(topTracks.items,'album')
        
        return topTracks;
      }, (err) => {
        console.error(err);
      })
    )
  }

  getNowPlaying() {
    return (
      spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: { 
              name: response.item.name, 
              albumArt: response.item.album.images[0].url
            }
        });
        return response;
      }, (err) => {
        console.error(err);
      })
    )
  }

  setCurrentTracksFromTracksList(tracklist) {
    const tracks = [];
    tracklist.forEach((track) => tracks.push(track.track))
    this.props.setCurrentTracks(tracks);
  }

  setCurrentTracksDataFromTracksList(tracklist, mediaType) {
    if (mediaType === 'playlist') {
      var tracks = [];
      tracklist.forEach((track) => {
        tracks.push(track.track.id)
      });
    } else if (mediaType === 'album') {
      var tracks = [];
      tracklist.forEach((track) => {
        tracks.push(track.id)
      });
    }
    spotifyApi.getAudioFeaturesForTracks(tracks)
    .then((trackData) => {
      this.props.setCurrentTracksData(trackData.audio_features);
      this.props.setFeatureCount({feature: 'danceability', data: trackData.audio_features});
      this.props.setFeatureCount({feature: 'energy', data: trackData.audio_features});
      this.props.setFeatureCount({feature: 'acousticness', data: trackData.audio_features});
      this.props.setFeatureCount({feature: 'instrumentalness', data: trackData.audio_features});
      this.props.setFeatureCount({feature: 'valence', data: trackData.audio_features});
      this.props.setFeatureCount({feature: 'speechiness', data: trackData.audio_features});
      this.props.setKeysData(trackData.audio_features);
    })
  }

  switchPlaylist(userId, playlist) {
    this.props.setCurrentlySelectedPlaylist(playlist);
    spotifyApi.getPlaylistTracks(userId, playlist.id)
    .then((playlistTracksObj) => {
      console.log(playlistTracksObj)
      this.setCurrentTracksFromTracksList(playlistTracksObj.items);
      this.setCurrentTracksDataFromTracksList(playlistTracksObj.items, 'playlist');
    })
  }

  switchAlbum(album) {
    this.props.setCurrentlySelectedPlaylist(album);
    spotifyApi.getAlbum(album.id)
    .then((albumObj) => {
      console.log(albumObj)
      const albumImages = albumObj.images;
      const albumTracksWithoutAlbumInfo = albumObj.tracks.items;
      const albumTracksWithAlbumInfo = albumTracksWithoutAlbumInfo.map((track) => {
        track.album = {id: album.id, images: albumImages};
        return track
      })
      this.props.setCurrentTracks(albumTracksWithAlbumInfo);
      this.setCurrentTracksDataFromTracksList(albumTracksWithAlbumInfo,'album')
    })
  }


  handleClickOutsideDropdownMenu() {
    if (this.props.dropdownMenuOpen) {
      this.props.closeDropdownMenu();
    }
  }


  render(){
    if (!this.props.currentTracksData.length) {
      return (
        <a href='http://localhost:8888'> Login to Spotify </a>
      )
    } else {
      return (

        
        <div>
          
          <ul className="playlistNav-ul">
            <UserGreeting />
            <PlaylistDropdownMenu switchPlaylist={this.switchPlaylist}/>
            { this.state.loggedIn &&
              <div id="nowPlaying">
                <div>
                  <img id="nowPlaying" src={this.state.nowPlaying.albumArt} style={{ height: 50 }}/>
                </div>
                <button onClick={() => this.getNowPlaying()} id="nowPlaying-btn">
                Now Playing: { this.state.nowPlaying.name }
                </button>
              </div>
            }  
          </ul>
          
          <ul className="topNav-ul">
            <li className="topNav-li" onClick={()=>this.getMyTopTracks('short_term')}>Recent Top Tracks</li>
            <li className="topNav-li" onClick={()=>this.getMyTopTracks('medium_term')}>Past Months Top Tracks</li>
            <li className="topNav-li" onClick={()=>this.getMyTopTracks('long_term')}>All Time Top Tracks</li>
            <a id="login" className="playlistNav-li" href='http://localhost:8888'> Login to Spotify </a>
          </ul>

          <div id="trackTableAndMosaicContainer">
              <div id="tracksContainer">
                <TrackTable />
              </div>
              <div id="chartsContainer" >
                <BarChart dataType="danceability" color="tomato"/>
                <BarChart dataType="energy" color="orange"/>
                <BarChart dataType="acousticness" color="gold"/>
                <BarChart dataType="instrumentalness" color="cyan"/>
                <BarChart dataType="valence" color="navy"/>
                <BarChart dataType="speechiness" color="#00b906"/>
                <PieChart/>
              </div>
              <AlbumArtMosaic switchAlbum={this.switchAlbum}/>
          </div>  

         
        </div>
      );
    } 
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);

export default App;