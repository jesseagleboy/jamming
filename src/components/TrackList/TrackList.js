import React from "react";
import "./TrackList.css";
import Track from "../Track/Track";

class TrackList extends React.Component {
  
  getTracks() {
    const tracks = this.props.searchResults;

    return tracks.map((track) => {
      return (
        <Track
          key={track.id}
          name={track.name}
          artist={track.artist}
          album={track.album}
        />
      );
    });
  }
  render() {
    return (
      <div className="TrackList">
        { this.getTracks() }
      </div>
    );
  }
}

export default TrackList;
