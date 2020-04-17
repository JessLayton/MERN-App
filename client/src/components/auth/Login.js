import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); 
    }
if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

onSubmit = e => {
    e.preventDefault();

const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };


render() {
    const { errors } = this.state;
return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
           <div className="login-reg-box">
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b>
              </h4>
            <br />
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
              <label htmlFor="email">Email</label>
              <br />
                <input
                placeholder="email"
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                />
               <br />
                <span className="errorMessage">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
              <div className="input-field col s12">
              <label htmlFor="password">Password</label>
              <br />
                <input
                placeholder="password"
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"                  
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
              <br />
                <span className="errorMessage">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              <br />
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    backgroundColor: "rgba(78, 131, 231, 0.8)",
                    color: "white",
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Login
                </button>
              </div>
            </form>
            </div>
            <br />
            <br />
            <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
          </div>
          <Link to="/" className="back-home">
              Back to home
            </Link>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);