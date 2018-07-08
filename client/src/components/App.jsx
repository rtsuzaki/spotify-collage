import React from "react";
import SpotifyWebApi from 'spotify-web-api-js';
import "../../styles/main.css";
import UserGreeting from './UserGreeting.jsx';
import AlbumArtMosaic from './AlbumArtMosaic.jsx';
import TrackTable from './TrackTable.jsx';
import DanceabilityChart from './DanceabilityChart.jsx';
import ChartsContainer from "./ChartsContainer";

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
      this.setState({currentlySelectedPlaylist: topTracks}, this.setAllCurrentBasedOnPlaylist(this.state.currentlySelectedPlaylist))
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
      spotifyApi.getMyTopTracks({limit:40})
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
    this.setCurrentTracksToCurrentPlaylist(playlist);
  }

  // setCurrentTracksToCurrentPlaylist() {
  //   const tracks = [];
  //   this.state.currentlySelectedPlaylist.items.forEach((track) => tracks.push(track))
  //   this.setState({currentTracks: tracks});
  // }

  setCurrentTracksToCurrentPlaylist(playlist) {
    const tracks = [];
    playlist.items.forEach((track) => tracks.push(track))
    this.setState({currentTracks: tracks});
  }

  render(){
    if (this.state.currentlySelectedPlaylist.items.length) {
      return (
        <div>
          <UserGreeting currentUser={this.state.currentUser}/>

          <div id="trackTableAndMosaicContainer">
            <TrackTable currentTracks={this.state.currentTracks}/>
            {/* {console.log('selected playlist', this.state.currentlySelectedPlaylist)} */}
            {
              this.state.currentlySelectedPlaylist.items !== [] &&
              <AlbumArtMosaic currentlySelectedPlaylist={this.state.currentlySelectedPlaylist}/>
            }
          </div>
          <ChartsContainer currentTracks={this.state.currentTracks}/>
          <a href='http://localhost:8888'> Login to Spotify </a>
  
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
      );
    } else {
      return (
        <a href='http://localhost:8888'> Login to Spotify </a>
      )
    }
  }
}

export default App;