import React from "react";
import SpotifyWebApi from 'spotify-web-api-js';
import UserGreeting from './UserGreeting.jsx';
import AlbumArtMosaic from './AlbumArtMosaic.jsx';
import TrackTable from './TrackTable.jsx';
import BarChart from './BarChart';
import PieChart from './PieChart';
import "../../styles/main.css";

const spotifyApi = new SpotifyWebApi();

class App extends React.Component{
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      currentlySelectedPlaylist: {items:[]},
      currentTracks: [],
      currentTracksData: [],
      currentUser: {},
      topTracks: {},
      playlists: {},
      nowPlaying: { name: 'Not Checked', albumArt: '' }
    };
  }

  componentDidMount() {
    this.getCurrentUser()
    .then((userId)=> {
      this.getUserPlaylists(userId);
    })
    .then(()=> {
      return this.getMyTopTracks();
    })
    .then((topTracks) => {
      this.setState({currentlySelectedPlaylist: topTracks}, () => {this.setAllCurrentBasedOnPlaylist(this.state.currentlySelectedPlaylist)})
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
        this.setState({currentUser: me});
        return me;
      }, (err) => {
        console.log(err)
      })
    )
  }

  //Works for any user--give userId as input
  getUserPlaylists(userId) {
    return (
      spotifyApi.getUserPlaylists(userId)  // note that we don't pass a user id
      .then((myPlaylist) => {
        this.setState({playlists: myPlaylist})
        return myPlaylist;
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
         this.setState({topTracks: topTracks})
         return topTracks;
      }, (err) => {
        console.error(err);
      })
    )
  }

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: { 
              name: response.item.name, 
              albumArt: response.item.album.images[0].url
            }
        });
      })
  }

  setAllCurrentBasedOnPlaylist(playlist) {
    this.setCurrentTracksToCurrentPlaylist(playlist, this.setCurrentTracksData);
  }

  // setCurrentTracksToCurrentPlaylist() {
  //   const tracks = [];
  //   this.state.currentlySelectedPlaylist.items.forEach((track) => tracks.push(track))
  //   this.setState({currentTracks: tracks});
  // }

  setCurrentTracksData() {
    const tracks = [];
    this.state.currentTracks.forEach((track) => {
      tracks.push(track.id)
    });
    spotifyApi.getAudioFeaturesForTracks(tracks)
    .then((trackData) => {
      this.setState({currentTracksData: trackData.audio_features});
    })
  }

  setCurrentTracksToCurrentPlaylist(playlist, callback) {
    const tracks = [];
    playlist.items.forEach((track) => tracks.push(track))
    this.setState({currentTracks: tracks}, callback);
  }

  render(){
    if (this.state.currentTracksData.length) {
      return (
        <div>
          <UserGreeting currentUser={this.state.currentUser}/>
          <a href='http://localhost:8888'> Login to Spotify </a>
          <div id="trackTableAndMosaicContainer">
            <div className="vertical-align-container">
              <TrackTable currentTracks={this.state.currentTracks}/>
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
            {/* {this.state.currentlySelectedPlaylist.items !== [] && */}
            <div id="mosaicAndChartContainer">
              <AlbumArtMosaic currentlySelectedPlaylist={this.state.currentlySelectedPlaylist}/>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <BarChart currentTracksData={this.state.currentTracksData} dataType="danceability"/>
                <BarChart currentTracksData={this.state.currentTracksData} dataType="energy"/>
                <BarChart currentTracksData={this.state.currentTracksData} dataType="acousticness"/>
                <BarChart currentTracksData={this.state.currentTracksData} dataType="instrumentalness"/>
                <BarChart currentTracksData={this.state.currentTracksData} dataType="valence"/>
                <BarChart currentTracksData={this.state.currentTracksData} dataType="speechiness"/>
                <PieChart currentTracksData={this.state.currentTracksData}/>
              </div>
            </div>
          </div>  
        </div>
      );
    } else {
      return (
        <a href='http://localhost:8888'> Login to Spotify </a>
      )
    }
  }
}

export default App;