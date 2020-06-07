import React, { Component } from "react";
import "./Input.css";
import Loading from "../common/Loading";

import { withRouter } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";

const axios = require("axios");

class Input extends Component {
  constructor() {
    super();
    this.state = {
      item: {},
      employee_code: 0,
      loading: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  handleInputChange(event) {
    const na = event.target.name;
    const value = event.target.value;
    const { item } = { ...this.state };
    const currentState = item;
    currentState[na] = value;
    this.setState({ item: currentState });
  }

  onChangeHandler = () => {
    this.setState({ loading: true });

    axios
      .post("http://localhost:5000/add", {
        //id: Id,
        name: this.state.item.name,
        machine_no: this.state.item.machine_no,
        employee_code: this.state.item.employee_code,
        per_unit_weight: this.state.item.per_unit_weight,
        units_to_order: this.state.item.units_to_order
      })
      .then(res => {
        console.log(res);
        if (res.data == "No") {
          alert("Employee does not exist");
          this.setState({ loading: false });
        } else if (res.data.name == "MongoError") {
          alert("Duplicate Shelf Number");
          this.setState({ loading: false });
        } else {
          this.props.onClose();
        }

        //alert("Deleted the item :   " + res.data);
      })
      .catch(e => {
        console.log("Error in adding", e);
      });
    //console.log(this.state.item);
  };
  render() {
    const { item, loading } = this.state;
    if (loading) {
      return (
        <div className="loading-container">
          <Loading />
        </div>
      );
    }
    return (
      <div className="Input">
        <h1 className="Input-heading">ENTER NEW SHELF DETAIL</h1>
        <div className="Input-container">
          <form>
            <div className="Input-item">
              <label>
                Item:{" "}
                <input
                  className="Input-value"
                  name="name"
                  //type="text"
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
            <div className="Input-item">
              <label>
                Shelf No:{" "}
                <input
                  className="Input-value"
                  name="machine_no"
                  //type="text"

                  onChange={this.handleInputChange}
                />
              </label>
            </div>
            <div className="Input-item">
              <label>
                Unit Weight:{" "}
                <input
                  className="Input-value"
                  name="per_unit_weight"
                  //type="text"

                  onChange={this.handleInputChange}
                />
              </label>
            </div>
            <div className="Input-item">
              <label>
                Units to Order:{" "}
                <input
                  className="Input-value"
                  name="units_to_order"
                  //type="text"

                  onChange={this.handleInputChange}
                />
              </label>
            </div>
            <div className="Input-item">
              <label>
                Employee Code:{" "}
                <input
                  className="Input-value"
                  name="employee_code"
                  //type="text"

                  onChange={this.handleInputChange}
                />
              </label>
            </div>

            <div className="Input-button">
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

export default Input;
