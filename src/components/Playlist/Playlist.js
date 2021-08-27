import React from "react";
import './Playlist.css';
import TrackList from "../TrackList/TrackList";
class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.updatePlayListName = this.updatePlayListName.bind(this);
  }
  updatePlayListName(e) {
    console.log(this.props.playlistName);
    this.props.updateName(e.target.value);
  }
  render() {
    return (
      <div className="Playlist">
        <input onChange={this.updatePlayListName} defaultValue={this.props.playlistName} />
        <TrackList searchResults={this.props.playlistTracks} isRemoval={true} onRemove={this.props.onRemove}/>
        <button className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    );
  }
}

export default Playlist;
