import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import RunLog from "../runs/RunLog";
import Navbar from "../layout/Navbar";

class Dashboard extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <Navbar />
        <button id="logout-btn"
          style={{
            width: "150px",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            marginTop: "1rem",
          }}
          onClick={this.onLogoutClick}
          className="btn btn-large waves-effect waves-light hoverable blue accent-3"
        >
          Logout
        </button>
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row">
              <h6 id="greeting"><em>Hello {user.name.split(" ")[0]} !</em></h6>
            <RunLog />
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Dashboard);
