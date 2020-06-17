import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Icon } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

class Item extends Component {
  state = {
    item: this.props.item
  };

  render() {
    const { item } = this.state;
    return (
      <tr key={item._id}>
        <td>{item.machine_no}</td>
        <td>{item.name}</td>
        <td>{item.current_weight / item.per_unit_weight}</td>
        <td>{item.employee.employee_name}</td>
        <td>
          <Button
            icon
            size="small"
            onClick={() => this.props.history.push(`/item/${item._id}`)}
          >
            <Icon name="edit" />
          </Button>
          <Button
            style={{ marginLeft: 10 }}
            icon
            size="small"
            onClick={() => {
              this.props.onDelete(item.machine_no);
            }}
          >
            <Icon name="delete" />
          </Button>
        </td>
      </tr>
    );
  }
}

export default withRouter(Item);
