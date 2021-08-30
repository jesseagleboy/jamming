import React from "react";
import './SearchBar.css';

class SearchBar extends React.Component {
  
  onClick(e) {
    this.props.onSearch(e.target.value);
  }
  
  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" />
        <button className="SearchButton" onClick={this.onClick}>SEARCH</button>
      </div>
    );
  }
}

export default SearchBar;
