import React, { Component } from "react";
import "./Employee.css";
import { withRouter } from "react-router-dom";
import Loading from "../common/Loading";
import { Button, Icon } from "semantic-ui-react";
import EmpInput from "./EmpInput";
import Popup from "reactjs-popup";

const axios = require("axios");

class Employee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      open: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ open: true });
  }
  closeModal() {
    this.setState({ open: false });
    this.showempfromdb();
  }
  componentDidMount() {
    this.showempfromdb();
    this.setState({ loading: true });
  }
  showempfromdb = () => {
    axios
      .get("http://localhost:5000/emp")
      .then(res => {
        console.log(res.data);
        this.setState({ employees: res.data, loading: false });
      })
      .catch(e => {
        console.log("error happened", e);
      });
  };

  render() {
    const { employees, loading } = this.state;
    if (loading) {
      return (
        <div className="loading-container">
          <Loading />
        </div>
      );
    }

    return (
      <div className="Employee-container">
        <h1 className="Employee-title">EMPLOYEE LIST</h1>
        <table className="Employee">
          <thead className="Employee-head">
            <tr>
              <th>Employee Name</th>
              <th>Employee Code</th>
              <th>Employee Contact</th>
              <th>Employee Email</th>
            </tr>
          </thead>
          <tbody className="Employee-body">
            {employees.map(emp => (
              <tr
                key={emp._id}
                //onClick={() => history.push(`/currency/${currency.id}`)}
              >
                <td>{emp.employee_code}</td>
                <td>{emp.employee_name}</td>

                <td>{emp.employee_contact % 10000000000}</td>
                <td>{emp.employee_email}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginLeft: 545, marginTop: 20 }}>
          <Button color="black" animated onClick={this.openModal}>
            <Button.Content visible>Add New Employee</Button.Content>
            <Button.Content hidden>
              <Icon name="add user" />
            </Button.Content>
          </Button>
          <Popup
            open={this.state.open}
            closeOnDocumentClick
            onClose={this.closeModal}
          >
            <div className="modal">
              <div>
                <EmpInput onClose={this.closeModal} />
              </div>
            </div>
          </Popup>
        </div>
      </div>
    );
  }
}

export default withRouter(Employee);
