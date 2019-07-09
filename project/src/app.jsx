import React, { Component } from "react";
import Contacts from "./components/Contacts";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      email: "",
      contactList: []
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeContact = this.removeContact.bind(this);
    this.saveContact = this.saveContact.bind(this);
    this.eachContact = this.eachContact.bind(this);
  }

  handleOnChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  // Submission of initial contact to list when button is clicked. 
  // Checks for any values in input fields then proceeds to create new array and replace array in state.
  // Also alphabetizes array
  handleSubmit(event) {
    event.preventDefault();
    let arr = this.state.contactList.slice();
    if (
      this.state.name != "" &&
      this.state.phone != "" &&
      this.state.email != ""
    ) {
      arr.push({
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email || "N/A"
      });
      this.setState({
        contactList: arr.sort((a, b) => a.name.localeCompare(b.name))
      });
    } else {
      alert("Missing Name, Phone or Email!");
      return null;
    }
  }

  // Function to display array into proper model with buttons to update or remove contacts from list
  eachContact(details, i) {
    return (
      <Contacts
        key={details.name + details.phone + i}
        index={i}
        details={details}
        saveContact={this.saveContact}
        deleteContact={this.removeContact}
      />
    );
  }

  // Takes uopdated values from editing forms and updates state to new array, also alphabetizes the new array.
  saveContact(editedInfo, i) {
    let arr = this.state.contactList.slice();
    arr[i] = editedInfo;
    this.setState({
      contactList: arr.sort((a, b) => a.name.localeCompare(b.name))
    });
  }

  // removes chosen contacts from list, updates array in state 
  removeContact(i) {
    let arr = this.state.contactList.slice();
    arr.splice(i, 1);
    this.setState({ contactList: arr });
  }

  render() {
    //Bootstrap used to quickly create interface to display data.
    return (
      <div className="container">
        <h1 className="text-white">Contact List Application</h1>
        <hr className="bg-white" />
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-header text-muted font-weight-bold">
                Enter Information
              </div>
              <div className="card-body">
                <form>
                  <p className="text font-weight-bold mb-0">
                    Enter Name:
                    <input
                      name="name"
                      type="text"
                      className="form-control"
                      defaultValue={this.state.name}
                      onChange={this.handleOnChange}
                    />
                  </p>
                  <p className="text font-weight-bold mb-0">
                    Enter Phone Number:
                    <input
                      name="phone"
                      type="text"
                      className="form-control"
                      defaultValue={this.state.phone}
                      onChange={this.handleOnChange}
                    />
                  </p>
                  <p className="text font-weight-bold mb-0">
                    Enter Email Address:
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      defaultValue={this.state.email}
                      onChange={this.handleOnChange}
                    />
                  </p>
                </form>
              </div>
              <div className="card-footer text-center">
                <button
                  type="button"
                  name="submit"
                  onClick={this.handleSubmit}
                  className="btn btn-primary btn-block"
                >
                  Add Contact
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card">
              <div className="card-header text-muted font-weight-bold">
                View Contacts
              </div>
              <ul className="list-group">
                {this.state.contactList.length ? (
                  this.state.contactList.map(this.eachContact)
                ) : (
                  <li className="list-group-item list-group-item-primary font-weight-bold">
                    <span>No entries!</span>
                    <br />
                    <a className="font-weight-normal">
                      Add a contact on the left!
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
