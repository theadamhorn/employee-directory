import React from "react";

function DirectoryItem(props) {
  return (
    <tr>
      <td><img src={props.image} alt={"Photo of " + props.firstName + " " + props.lastName}></img></td>
      <td>{props.firstName}</td>
      <td>{props.lastName}</td>
      <td>{props.phone}</td>
      <td>{props.email}</td>
    </tr>
  );
}

export default DirectoryItem;
