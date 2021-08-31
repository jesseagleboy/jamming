import React from "react";
import "./TrackList.css";
import Track from "../Track/Track";

class TrackList extends React.Component {
  
  getTracks() {
    const tracks = this.props.searchResults;
    console.log(`This is tracks: ${JSON.stringify(tracks)}`);
    return tracks.map((track) => {
      return (
        <Track
          key={track.id}
          track={track}
          onAdd = {this.props.onAdd}
          onRemove = {this.props.onRemove}
          isRemoval = {this.props.isRemoval}
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
