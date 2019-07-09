import React, { Component } from "react";

export default class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spread: false,
      editing: false
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.close = this.close.bind(this);
    this.spread = this.spread.bind(this);
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
  }

  handleOnChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  // Toggles to display more or less info of contact or go into editing mode
  spread() {
    this.setState({ spread: true });
  }
  close() {
    this.setState({ spread: false });
  }
  edit() {
    this.setState({ editing: true });
  }

  // Checks for any blank fields then sends info over to save contact function in app.jsx
  // Toggles different forms for editing or spreading to display contact info
  save() {
    if (
      this.refs.editedName.value != "" &&
      this.refs.editedPhone.value != "" &&
      this.refs.editedEmail.value != ""
    ) {
      this.props.saveContact(
        {
          name: this.refs.editedName.value,
          phone: this.refs.editedPhone.value,
          email: this.refs.editedEmail.value
        },
        this.props.index
      );
      this.setState({
        spread: false,
        editing: false
      });
    } else {
      alert("Something is blank!");
      return null;
    }
  }

  // Sends index to delete function in app.jsx to delete chosen contact
  remove() {
    this.props.deleteContact(this.props.index);
  }

  // html modes for different views of contacts for updating or displaying more info of contact
  spreadMode() {
    //Bootstrap used to quickly create interface to display data.
    return (
      <div>
        {this.state.editing ? (
          <div className="col-md-12">
            <p className="text font-weight-bold mb-1">
              Name:
              <input
                name="new-name"
                ref="editedName"
                type="text"
                className="form-control"
                defaultValue={this.props.details.name}
                onChange={this.handleOnChange}
              />
            </p>

            <p className="text font-weight-bold mb-1">
              Phone:
              <input
                name="new-phone"
                ref="editedPhone"
                type="text"
                className="form-control"
                defaultValue={this.props.details.phone}
                onChange={this.handleOnChange}
              />
            </p>
            <p className="text font-weight-bold mb-0">
              Email:
              <input
                name="new-email"
                ref="editedEmail"
                type="text"
                className="form-control"
                defaultValue={this.props.details.email}
                onChange={this.handleOnChange}
              />
            </p>
            <button
              type="button"
              name="save"
              onClick={this.save}
              className="btn btn-link btn mx-auto d-block"
            >
              <i className="far fa-check-circle" />
            </button>
          </div>
        ) : (
          <div className="col-md-12">
            <p className="text font-weight-bold mb-1">
              Name: {this.props.details.name}
            </p>

            <p className="text font-weight-bold mb-1">
              Phone: {this.props.details.phone}
            </p>
            <p className="text font-weight-bold mb-0">
              Email: {this.props.details.email}
            </p>
            <button
              type="button"
              onClick={this.remove}
              className="btn btn-link pl-0"
            >
              <i className="far fa-trash-alt" />
            </button>
            <button
              type="button"
              name="edit"
              onClick={this.edit}
              className="btn btn-link"
            >
              <i className="far fa-edit" />
            </button>
            <button
              type="button"
              name="save"
              onClick={this.close}
              className="btn btn-link btn"
            >
              <i className="far fa-check-circle" />
            </button>
          </div>
        )}
      </div>
    );
  }

  normalMode() {
    return (
      <div>
        <a
          href="#"
          className="stretched-link font-weight-bold text-dark"
          onClick={this.spread}
        >
          {this.props.details.name}
        </a>
      </div>
    );
  }

  render() {
    return (
      <li className="text-left list-group-item font-weight-bold">
        {this.state.spread ? this.spreadMode() : this.normalMode()}
      </li>
    );
  }
}
