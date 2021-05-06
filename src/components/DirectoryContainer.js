import React, { Component } from "react";
import DirectoryItem from "./DirectoryItem";
import Search from "./Search";
import { Table } from "react-bootstrap";
import API from "../utils/API";

class DirectoryContainer extends Component {
  state = {
    employeeList: [],
    searchInput: "",
    filteredList: []
  };

  componentDidMount() {
    API.getUsers()
      .then(data => this.setState({ employeeList: data.data.results }))
      .catch(err => console.log(err));
  }

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };


  handleFormSubmit = event => {
    event.preventDefault();

    // Will have to filter through employee list in state and set filtered list to searched results

    const results = this.state.employeeList.filter(employee => employee.name.includes(this.state.searchInput))

    this.setState({
      searchInput: "",
      filteredList: results
    });
  };


  render() {
    return (
      <div>
        <Search searchInput={this.state.searchInput}
          handleInputChange={this.handleInputChange}
          handleFormSubmit={this.handleFormSubmit} />

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Headshot</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {this.state.employeeList.map(employee => (
              <DirectoryItem
                image={employee.picture.thumbnail}
                firstName={employee.name.first}
                lastName={employee.name.last}
                phone={employee.phone}
                email={employee.email}
              />
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default DirectoryContainer;
