import React from "react";
import { connect } from "react-redux";
import SpotifyWebApi from 'spotify-web-api-js';
import UserGreeting from './UserGreeting.jsx';
import AlbumArtMosaic from './AlbumArtMosaic.jsx';
import TrackTable from './TrackTable.jsx';
import BarChart from './BarChart.jsx';
import PieChart from './PieChart.jsx';
import PlaylistDropdownMenu from './PlaylistDropdownMenu.jsx'
import { setCurrentUser, setCurrentlySelectedMedia, setUserPlaylists, setTopTracks, setCurrentTracks, setCurrentTracksData } from '../redux/actions.js';

import "../../styles/main.css";

const spotifyApi = new SpotifyWebApi();

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    userPlaylists: state.userPlaylists,
    currentlySelectedMedia: state.currentlySelectedMedia,
    topTracks: state.topTracks,
    currentTracks: state.currentTracks,
    currentTracksData: state.currentTracksData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: user => dispatch(setCurrentUser(user)),
    setUserPlaylists: playlists => dispatch(setUserPlaylists(playlists)),
    setCurrentlySelectedMedia: media => dispatch(setCurrentlySelectedMedia(media)),
    setTopTracks: tracks => dispatch(setTopTracks(tracks)),
    setCurrentTracks: tracks => dispatch(setCurrentTracks(tracks)),
    setCurrentTracksData: data => dispatch(setCurrentTracksData(data)),
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
  }

  componentDidMount() {
    this.getCurrentUser()
    .then((userId) => {
      console.log('userid', userId)
      return this.getUserPlaylists(userId)
    })
    .then((playlists) => {
      
      return this.getMyTopTracks();
    })
    .then((topTracks) => {
      this.props.setCurrentlySelectedMedia(topTracks);
      this.setCurrentTracksFromPlaylist(topTracks);
      this.getCurrentTracksData();
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
        this.props.setUserPlaylists(playlists);
        console.log('getUserplaylist', playlists)
        return playlists;
      }, (err) => {
        console.error(err);
      })
    )
  }
  
  //Only works for current user's tracks
  getMyTopTracks() {
    return (
      spotifyApi.getMyTopTracks({limit:50})
      .then((topTracks) => {
        //  this.setState({topTracks: topTracks})
        this.props.setTopTracks(topTracks);
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

  getCurrentTracksData() {
    const tracks = [];
    this.props.currentTracks.forEach((track) => {
      tracks.push(track.id)
    });
    spotifyApi.getAudioFeaturesForTracks(tracks)
    .then((trackData) => {
      this.props.setCurrentTracksData(trackData.audio_features);
    })
  }

  // setCurrentlySelectedPlaylist() {

  // }

  // setAllCurrentBasedOnPlaylist(playlist) {
  //   this.setCurrentTracksToCurrentPlaylist(playlist);
  //   this.getCurrentTracksData()
  // }

  setCurrentTracksFromPlaylist(playlist) {
    const tracks = [];
    playlist.items.forEach((track) => tracks.push(track))
    this.props.setCurrentTracks(tracks);
  }

  render(){
    if (!this.props.currentTracksData.length) {
      return (
        <a href='http://localhost:8888'> Login to Spotify </a>
      )
    } else {
      return (
        <div>
          <UserGreeting />
          <PlaylistDropdownMenu />
          <a href='http://localhost:8888'> Login to Spotify </a>
          <div id="trackTableAndMosaicContainer">
            <div className="vertical-align-container">
              <TrackTable />
              { this.state.loggedIn &&
                <div>
                  <div>
                    Now Playing: { this.state.nowPlaying.name }
                  </div>
                  <div>
                    <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }}/>
                  </div>
                  <button onClick={() => this.getNowPlaying()}>
                    Check Now Playing
                  </button>
                </div>
              }
            </div>
            <div id="mosaicAndChartContainer">
              <AlbumArtMosaic />
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <BarChart dataType="danceability"/>
                <BarChart dataType="energy"/>
                <BarChart dataType="acousticness"/>
                <BarChart dataType="instrumentalness"/>
                <BarChart dataType="valence"/>
                <BarChart dataType="speechiness"/>
                <PieChart/>
              </div>
            </div>
          </div>  
        </div>
      );
    } 
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);

export default App;