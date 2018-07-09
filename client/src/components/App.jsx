import React from "react";
import { connect } from "react-redux";
import SpotifyWebApi from 'spotify-web-api-js';
import UserGreeting from './UserGreeting.jsx';
import AlbumArtMosaic from './AlbumArtMosaic.jsx';
import TrackTable from './TrackTable.jsx';
import BarChart from './BarChart.jsx';
import PieChart from './PieChart.jsx';
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
      this.setCurrentTracksDataFromTracksList(playlistTracksObj.items);
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
        this.props.setCurrentTracksData(topTracks.items);
        // this.props.setCurrentlySelectedPlaylist(topTracks.items);
        
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

  setCurrentTracksDataFromTracksList(tracklist) {
    const tracks = [];
    tracklist.forEach((track) => {
      tracks.push(track.track.id)
    });
    spotifyApi.getAudioFeaturesForTracks(tracks)
    .then((trackData) => {
      this.props.setCurrentTracksData(trackData.audio_features);
      this.props.setFeatureCount({feature: 'danceability', data: trackData.audio_features});
      this.props.setFeatureCount({feature: 'energy', data: trackData.audio_features});
      this.props.setFeatureCount({feature: 'acousticness', data: trackData.audio_features});
      this.props.setFeatureCount({feature: 'instrumentalness', data: trackData.audio_features});
      this.props.setFeatureCount({feature: 'valence', data: trackData.audio_features});
      this.props.setFeatureCount({feature: 'speechiness', data: trackData.audio_features});
    })
  }

  switchPlaylist(userId, playlist) {
    this.props.setCurrentlySelectedPlaylist(playlist);
    spotifyApi.getPlaylistTracks(userId, playlist.id)
    .then((playlistTracksObj) => {
      console.log(playlistTracksObj)
      this.setCurrentTracksFromTracksList(playlistTracksObj.items);
      this.setCurrentTracksDataFromTracksList(playlistTracksObj.items);
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
      this.props.setCurrentTracksData(albumTracksWithAlbumInfo);
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
          <div className="flexRow">
          <button onClick={()=>this.props.setFeatureCount({feature: 'danceability', data: this.props.currentTracksData})}>CLICK ME</button>
          <a id="login" href='http://localhost:8888'> Login to Spotify </a>
          </div>
          
          <ul className="topNav-ul">
            <UserGreeting />
            <PlaylistDropdownMenu switchPlaylist={this.switchPlaylist}/>
            <li className="topNav-li" onClick={()=>this.getMyTopTracks('short_term')}>Recent Top Tracks</li>
            <li className="topNav-li" onClick={()=>this.getMyTopTracks('medium_term')}>Past Few Months Top Tracks</li>
            <li className="topNav-li" onClick={()=>this.getMyTopTracks('long_term')}>All Time Top Tracks</li>
            
          </ul>
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
              <AlbumArtMosaic switchAlbum={this.switchAlbum}/>
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