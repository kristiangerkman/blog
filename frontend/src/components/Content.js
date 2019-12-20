import React from "react";
import { connect } from "react-redux";
import LoginForm from "./LoginForm";
import Blogs from "./Blogs";
import BlogForm from "./BlogForm";
const Content = props => {
  if (props.user) {
    return (
      <div>
        <BlogForm />
        <Blogs />
      </div>
    );
  }
  return (
    <div>
      <LoginForm />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const ConnectedContent = connect(mapStateToProps, null)(Content);

export default ConnectedContent;
