import React, { Component } from "react";
import "./EmpInput.css";
import Loading from "../common/Loading";

import { withRouter } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";

const axios = require("axios");

class EmpInput extends Component {
  constructor() {
    super();
    this.state = {
      emp: {},

      loading: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  handleInputChange(event) {
    const na = event.target.name;
    const value = event.target.value;
    const { emp } = { ...this.state };
    const currentState = emp;
    currentState[na] = value;
    this.setState({ emp: currentState });
  }

  onChangeHandler = () => {
    this.setState({ loading: true });

    axios
      .post("http://localhost:5000/addemp", {
        //id: Id,
        employee_name: this.state.emp.employee_name,
        employee_code: this.state.emp.employee_code,
        employee_contact: this.state.emp.employee_contact,
        employee_email: this.state.emp.employee_email
      })
      .then(
        res => {
          if (res.data.name == "MongoError") {
            alert(
              "Duplicate Employee Code:    " + res.data.keyValue.employee_code
            );
            this.setState({ loading: false });
          } else {
            this.props.onClose();
          }
        }

        //alert("Deleted the item :   " + res.data);
      )
      .catch(e => {
        console.log(e);
      });
    //console.log(this.state.item);
  };
  render() {
    const { emp, loading } = this.state;
    if (loading) {
      return (
        <div className="loading-container">
          <Loading />
        </div>
      );
    }
    return (
      <div className="EmpInput">
        <h1 className="EmpInput-heading">ENTER NEW EMPLOYEE DETAILS</h1>
        <div className="EmpInput-container">
          <form>
            <div className="EmpInput-item">
              <label>
                Employee Code:{" "}
                <input
                  className="EmpInput-value"
                  name="employee_code"
                  //type="text"
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
            <div className="EmpInput-item">
              <label>
                Employee Name:{" "}
                <input
                  className="EmpInput-value"
                  name="employee_name"
                  //type="text"

                  onChange={this.handleInputChange}
                />
              </label>
            </div>
            <div className="EmpInput-item">
              <label>
                Employee Contact:{" "}
                <input
                  className="EmpInput-value"
                  name="employee_contact"
                  //type="text"

                  onChange={this.handleInputChange}
                />
              </label>
            </div>
            <div className="EmpInput-item">
              <label>
                Employee Email:{" "}
                <input
                  className="EmpInput-value"
                  name="employee_email"
                  //type="text"

                  onChange={this.handleInputChange}
                />
              </label>
            </div>

            <div className="EmpInput-button">
              <Button
                animated
                onClick={() => {
                  this.onChangeHandler();
                }}
              >
                <Button.Content visible>Submit</Button.Content>
                <Button.Content hidden>
                  <Icon
                    name="edit"
                    onClick={() => {
                      this.onChangeHandler();
                    }}
                  />
                </Button.Content>
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EmpInput;
