import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import "../../App.css";

class Landing extends Component {

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align" className="login-reg-box">
            <p className="logo-heading">
              RUN TRACKER
            </p>
            <h4>
            WELCOME
            </h4>
            <br />
            <div className="col s6">
             
              <Button >   <Link
                to="/login"
                style={{
                  backgroundColor: "rgb(78, 131, 231)",
                  color: "white",
                  width: "140px",
                  borderRadius: "3px",
                }}
                className="btn btn-large btn-flat waves-effect white black-text"
              >
                Login
              </Link></Button>
            </div>
            <Button >   <Link
                to="/register"
                style={{
                  backgroundColor: "rgb(78, 131, 231)",
                  color: "white",
                  width: "140px",
                  borderRadius: "3px",
                }}
                className="btn btn-large btn-flat waves-effect white black-text"
              >
                Register
              </Link></Button>
          </div>
        </div>
      </div>
    );
  }
}


Landing.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
 
)(withRouter(Landing));

