import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import React from "react";
import searchResults from "./searchResults";
import playlistTracks from "./playlistTracks";
import Spotify from "../../util/Spotify";
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: searchResults.results,
      playlistName: "A Cool Playlist",
      playlistTracks: playlistTracks.tracks,
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlayListName = this.updatePlayListName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

  }

  addTrack(track) {
    const playlistTracks = this.state.playlistTracks;
    for (let item in playlistTracks) {
      if (track.id === playlistTracks[item].id) {
        console.log(item);
        return true;
      }
    }

    playlistTracks.push(track);
    this.setTrack();
  }

  removeTrack(track) {
    const playlistTracks = this.state.playlistTracks;
    for (let item in playlistTracks) {
      if (track.id === playlistTracks[item].id) {
        playlistTracks.splice(item, 1);
        this.setTrack();
      }
    }
  }

  setTrack() {
    this.setState({ playlistTracks: playlistTracks.tracks });
  }

  updatePlayListName(newName) {
    this.setState({playlistName: newName});
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => {
      return track;
    });

    console.log(`This was clicked. ${JSON.stringify(trackURIs)}`);
  }

  search(term) {
    console.log(term);
  }


  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          {Spotify.getAccessToken()}
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              updateName={this.updatePlayListName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
