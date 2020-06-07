import React, { Component } from "react";
import "./Order.css";
import { withRouter } from "react-router-dom";
import Loading from "../common/Loading";

const axios = require("axios");

class Orders extends React.Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }
  componentDidMount() {
    this.showitemsfromdb();
    this.setState({ loading: true });
  }
  showitemsfromdb = () => {
    axios
      .get("http://localhost:5000/current")
      .then(res => {
        console.log(res.data);
        this.setState({ items: res.data, loading: false });
      })
      .catch(e => {
        console.log("error happened", e);
      });
  };

  render() {
    const { items, loading } = this.state;
    if (loading) {
      return (
        <div className="loading-container">
          <Loading />
        </div>
      );
    }
    return (
      <div className="Order-container">
        <h1 className="Order-title">CURRENT ORDERS</h1>
        <table className="Order">
          <thead className="Order-head">
            <tr>
              <th>Item Name</th>

              <th>Shelf Number</th>
              <th>Stock Remaining</th>
              <th>Employee Code</th>
              <th>Employee Name</th>
              <th>Employee Contact</th>
              <th>Employee Email</th>
            </tr>
          </thead>
          <tbody className="Order-body">
            {items.map(item => (
              <tr
                key={item._id}
                //onClick={() => history.push(`/currency/${currency.id}`)}
              >
                <td>{item.name}</td>
                <td>{item.machine_no}</td>
                <td>{item.current_weight / item.per_unit_weight}</td>
                <td>
                  {item && item.employee ? item.employee.employee_code : 0}
                </td>
                <td>
                  {item && item.employee ? item.employee.employee_name : ""}
                </td>
                <td>
                  {item && item.employee
                    ? item.employee.employee_contact % 10000000000
                    : 0}
                </td>
                <td>
                  {item && item.employee ? item.employee.employee_email : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(Orders);
