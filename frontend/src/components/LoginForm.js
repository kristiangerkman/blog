import React from "react";
import { connect } from "react-redux";
import { userLogin } from "../reducers/userReducer";

const LoginFrom = props => {
  const loginHandler = event => {
    event.preventDefault();
    const credential = {
      username: event.target.username.value,
      password: event.target.password.value
    };
    props.userLogin(credential);
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={loginHandler}>
        <p>username</p>
        <input type="text" name="username" />
        <br />
        <p>password</p>
        <input type="password" name="password" />
        <br />
        <br />
        <button type="submit">login</button>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const connectedLoginForm = connect(mapStateToProps, { userLogin })(LoginFrom);
export default connectedLoginForm;
