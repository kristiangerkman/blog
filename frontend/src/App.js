import React, { useEffect } from "react";
import "./style.css";
/* import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm"; */
import BlogService from "./services/blogs";
/* import LoginService from "./services/login";
import RenderBlogs from "./components/Blogs";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import PropTypes from "prop-types"; */
import { connect } from "react-redux";
import { initBlogs } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";
import Content from "./components/Content";

const App = props => {
  useEffect(() => {
    props.initBlogs();
  });
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const localUser = JSON.parse(loggedUserJSON);
      console.log(localUser);
      if (localUser !== null) {
        props.setUser(localUser);
        BlogService.setToken(localUser.token);
      }
    }
  });

  return (
    <div>
      <Content />
    </div>
  );
};

export default connect(null, { initBlogs, setUser })(App);
