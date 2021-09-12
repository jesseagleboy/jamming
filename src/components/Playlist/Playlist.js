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
        <div className='list'>
          <TrackList searchResults={this.props.playlistTracks} isRemoval={true} onRemove={this.props.onRemove}/>
        </div>
        <button className="Playlist-button save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
        <button className="Playlist-button clear">CLEAR ALL</button>
      </div>
    );
  }
}

export default Playlist;
