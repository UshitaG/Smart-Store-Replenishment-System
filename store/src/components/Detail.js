import React from "react";
import "./Detail.css";
import Loading from "../common/Loading";
import "semantic-ui-css/semantic.min.css";
import { Button, Icon } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

const axios = require("axios");

class Detail extends React.Component {
  constructor() {
    super();
    this.state = {
      item: {},
      employee: {},
      loading: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.handleInputChangeemp = this.handleInputChangeemp.bind(this);
  }

  componentDidMount() {
    const shelf = this.props.match.params.id;
    this.setState({ loading: true });
    this.fetchCurrency(shelf);
  }

  fetchCurrency(shelf) {
    axios
      .get(`http://localhost:5000/item/${shelf}`)
      .then(res => {
        console.log(res);
        this.setState({ item: res.data, loading: false });
        //this.setState({ employee: res.data[0].employee });
        //console.log(this.state.item.name);
      })
      .catch(e => {
        console.log("error happened", e);
      });
  }
  handleInputChangeemp(event) {
    const { employee } = { ...this.state.item };
    const currentState = employee;
    currentState.employee_code = event.target.value;
    this.setState({ employee: currentState });
  }
  handleInputChange(event) {
    const na = event.target.name;
    const value = event.target.value;
    const { item } = { ...this.state };
    const currentState = item;
    currentState[na] = value;
    this.setState({ item: currentState });
  }

  onChangeHandler = Id => {
    this.setState({ loading: true });
    axios
      .patch("http://localhost:5000/edit", {
        id: Id,
        name: this.state.item.name,
        machine_no: this.state.item.machine_no,
        employee_code: this.state.item.employee.employee_code,
        per_unit_weight: this.state.item.per_unit_weight,
        units_to_order: this.state.item.units_to_order
      })
      .then(res => {
        console.log(res);
        if (res.data == "No") {
          alert("Employee does not exist");
          //this.props.history.push("/");
          this.setState({ loading: false });
        } else if (res.data.name == "MongoError") {
          alert("Duplicate Shelf Number");
          this.setState({ loading: false });
        } else {
          this.props.history.push("/");
        }
      })
      .catch(e => {
        console.log("Error in updating", e);
      });
  };

  render() {
    const { loading, item, employee } = this.state;

    if (loading) {
      return (
        <div className="loading-container">
          <Loading />
        </div>
      );
    }
    return (
      <div className="Detail">
        <h1 className="Detail-heading">SHELF DETAILS</h1>
        <div className="Detail-container">
          <form>
            <div className="Detail-item">
              <label>
                Item:{" "}
                <input
                  className="Detail-value"
                  name="name"
                  //type="text"
                  value={item.name}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
            <div className="Detail-item">
              <label>
                Shelf_no:{" "}
                <input
                  className="Detail-value"
                  name="machine_no"
                  //type="text"
                  value={item.machine_no}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
            <div className="Detail-item">
              <label>
                Unit Weight:{" "}
                <input
                  className="Detail-value"
                  name="per_unit_weight"
                  //type="text"
                  value={item.per_unit_weight}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
            <div className="Detail-item">
              <label>
                Units to Order:{" "}
                <input
                  className="Detail-value"
                  name="units_to_order"
                  //type="text"
                  value={item.units_to_order}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>

            <div className="Detail-item">
              <label>
                Employee Assigned{" "}
                <input
                  className="Detail-value"
                  name="employee_code"
                  type="text"
                  value={
                    item && item.employee ? item.employee.employee_code : 0
                  }
                  //value="0"
                  onChange={this.handleInputChangeemp}
                />
              </label>
            </div>
            <div className="Detail-button">
              <Button
                animated
                onClick={() => {
                  console.log(item._id);
                  this.onChangeHandler(item._id);
                }}
              >
                <Button.Content visible>Submit</Button.Content>
                <Button.Content hidden>
                  <Icon
                    name="edit"
                    onClick={() => {
                      this.onChangeHandler(item._id);
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

export default withRouter(Detail);
