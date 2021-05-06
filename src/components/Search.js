import React from "react";

function Search(props) {
  return (
    <form className="form">
      <input
        value={props.searchInput}
        name="searchInput"
        onChange={props.handleInputChange}
        type="text"
        placeholder="Search"
      />
      <button onClick={props.handleFormSubmit}>Submit</button>
    </form>
  );
}

export default Search;
