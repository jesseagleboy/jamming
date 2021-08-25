import React from "react";
import './Playlist.css';
import TrackList from "../TrackList/TrackList";
class Playlist extends React.Component {
  render() {
    return (
      <div class="Playlist">
        <input value="New Playlist" />
        <TrackList />
        <button class="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    );
  }
}

export default Playlist;
