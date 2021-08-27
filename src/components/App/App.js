import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import React from "react";
import searchResults from "./searchResults";
import playlistTracks from "./playlistTracks";
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: searchResults.results,
      playlistName: "A Cool Playlist",
      playlistTracks: playlistTracks.tracks,
    };
  }
  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
