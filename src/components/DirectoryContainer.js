import React, { Component } from "react";
import DirectoryItem from "./DirectoryItem";
import Search from "./Search";
import Jumbotron from "./Jumbotron";
import { Table } from "react-bootstrap";
import API from "../utils/API";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort } from '@fortawesome/free-solid-svg-icons'
import "./DirectoryContainer.css"

class DirectoryContainer extends Component {
  state = {
    employeeList: [],
    searchInput: "",
    filteredList: [],
    sortAscFirst: false,
    sortAscLast: false
  };

  componentDidMount() {
    API.getUsers()
      .then(data => this.setState({ employeeList: data.data.results, filteredList: data.data.results }))
      .catch(err => console.log(err));
  }

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;

    // Updating the input's state
    this.setState({
      [name]: value.toLowerCase()
    });
  };


  handleFormSubmit = event => {
    event.preventDefault();

    // filter through employee list in state and set filtered list to searched results

    const filteredResults = this.state.employeeList.filter((employee) => employee.name.first.toLowerCase().includes(this.state.searchInput)
      || employee.name.last.toLowerCase().includes(this.state.searchInput)
      || employee.email.toLowerCase().includes(this.state.searchInput));

    this.setState({
      searchInput: "",
      filteredList: filteredResults
    });
  };

  firstNameSort = () => {
    const employees = this.state.filteredList

    if (this.state.sortAscFirst) {
      this.setState({
        filteredList: employees.reverse(),
        sortAscFirst: false
      })
      return;
    }

    employees.sort(function (a, b) {
      var nameA = a.name.first.toUpperCase(); // ignore upper and lowercase
      var nameB = b.name.first.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });

    this.setState({
      filteredList: employees,
      sortAscFirst: true
    })
  };

  lastNameSort = () => {
    const employees = this.state.filteredList

    if (this.state.sortAscFirst) {
      this.setState({
        filteredList: employees.reverse(),
        sortAscFirst: false
      })
      return;
    }

    employees.sort(function (a, b) {
      var nameA = a.name.last.toUpperCase(); // ignore upper and lowercase
      var nameB = b.name.last.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });

    this.setState({
      filteredList: employees,
      sortAscFirst: true
    })
  }

  render() {
    return (
      <div>
        <Jumbotron />

        <Search searchInput={this.state.searchInput}
          handleInputChange={this.handleInputChange}
          handleFormSubmit={this.handleFormSubmit} />

        <button className="mx-2 mb-2 shadow-sm clearBtn" onClick={() => this.setState({ filteredList: this.state.employeeList })}>Clear Search</button>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Headshot</th>
              <th>First Name <FontAwesomeIcon icon={faSort} onClick={this.firstNameSort} /></th>
              <th>Last Name <FontAwesomeIcon icon={faSort} onClick={this.lastNameSort} /></th>
              <th>Phone Number</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {this.state.filteredList.map((employee) => (
              <DirectoryItem
                image={employee.picture.medium}
                firstName={employee.name.first}
                lastName={employee.name.last}
                phone={employee.phone}
                email={employee.email}
              />
            ))}
          </tbody>
        </Table>
      </div >
    );
  }
}

export default DirectoryContainer;
