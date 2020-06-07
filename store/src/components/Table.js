import React, { Component } from "react";
import "./Table.css";
import { withRouter } from "react-router-dom";
import Loading from "../common/Loading";
import Item from "./Item.js";
const axios = require("axios");

class Table extends Component {
  state = {
    items: [],
    loading: false
  };
  componentDidMount() {
    this.showitemsfromdb();
    this.setState({ loading: true });
  }
  showitemsfromdb = () => {
    axios
      .get("http://localhost:5000")
      .then(res => {
        console.log(res.data);
        this.setState({ items: res.data, loading: false });
      })
      .catch(e => {
        console.log("error happened", e);
      });
  };

  onDeleteHandler = no => {
    axios
      .delete("http://localhost:5000/deleteitem", {
        data: {
          number: no
        }
      })
      .then(res => {
        this.showitemsfromdb();
        console.log(res);
        alert("Deleted the item :   " + res.data);
      })
      .catch(e => {
        console.log("Error in deleting", e);
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
      <div className="Table-container">
        <h1 className="Table-title">ALL ITEMS</h1>
        <table className="Table">
          <thead className="Table-head">
            <tr>
              <th>Shelf Number</th>

              <th>Item Name</th>
              <th>Current Stock</th>
              <th>Employee Name</th>

              <th></th>
            </tr>
          </thead>
          <tbody className="Table-body">
            {items.map(item => (
              <Item
                key={item._id}
                item={item}
                onDelete={this.onDeleteHandler}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(Table);
