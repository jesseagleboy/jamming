import React from "react";
import "./Track.css";

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.addAction = this.addAction.bind(this);
  }
  addTrack() {
    console.log(this.props.track);
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    console.log(this.props.track);
    this.props.onRemove(this.props.track);
  }

  addAction() {
    return this.props.isRemoval ? this.removeTrack : this.addTrack;
  }
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        <button className="Track-action" onClick={this.addAction()}>{this.props.isRemoval ? '-' : '+'}</button>
      </div>
    );
  }
}

export default Track;
