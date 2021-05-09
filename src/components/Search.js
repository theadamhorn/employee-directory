import React from "react";
import "./Search.css"

function Search(props) {
  return (
    <form className="form m-2">
      <input
        value={props.searchInput}
        name="searchInput"
        onChange={props.handleInputChange}
        type="text"
        placeholder="Search"
      />
      <button className="shadow-sm m-1 searchBtn" onClick={props.handleFormSubmit}>Submit</button>
    </form>
  );
}

export default Search;
