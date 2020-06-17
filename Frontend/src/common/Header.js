import React from "react";
import logo from "./logo.png";
import "./Header.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import Input from "../components/Input";
import Popup from "reactjs-popup";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal() {
    this.setState({ open: true });
  }
  closeModal() {
    this.setState({ open: false });
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="Header">
        <Link to="/">
          <img src={logo} alt="logo" className="Header-logo" />
        </Link>
        <div style={{ marginLeft: 100 }}>
          <Button animated onClick={() => this.props.history.push("/current")}>
            <Button.Content visible>My Orders</Button.Content>
            <Button.Content hidden>
              <Icon name="add to cart" />
            </Button.Content>
          </Button>
        </div>
        <div className="Header-button">
          <Button animated onClick={this.openModal}>
            <Button.Content visible>Add Shelf</Button.Content>
            <Button.Content hidden>
              <Icon name="add" />
            </Button.Content>
          </Button>
          <Popup
            open={this.state.open}
            closeOnDocumentClick
            onClose={this.closeModal}
          >
            <div className="modal">
              {/* <a className="close" onClick={this.closeModal}>
                &times;
              </a> */}
              <div>
                <Input onClose={this.closeModal} />
              </div>
            </div>
          </Popup>
        </div>
        <div style={{ marginLeft: 10 }}>
          <Button
            animated
            onClick={() => this.props.history.push("/employees")}
          >
            <Button.Content visible>Employee Details</Button.Content>
            <Button.Content hidden>
              <Icon name="add user" />
            </Button.Content>
          </Button>
        </div>
      </div>
    );
  }
}
export default withRouter(Header);
