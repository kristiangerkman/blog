import React, { useState } from "react";
import { connect } from "react-redux";
import { removeBlog, likeBlog } from "../reducers/blogReducer";

const Blog = props => {
  const [visible, setVisible] = useState(false);

  const removeable = props.user.user.id === props.blog.user.id ? true : false;
  /*   console.log(removeable);
  console.log(props.blog);
  console.log(props.blog.user.id); */

  const removeButton = () => {
    if (removeable) {
      return <button onClick={() => removeBlog(props.blog.id)}>remove</button>;
    }
  };

  const removeBlog = id => {
    if (window.confirm(`Do you want to remove blog "${props.blog.title}"`)) {
      props.removeBlog(id);
    }
  };

  const blogStyle = {
    paddingTop: 0,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginTop: 5
  };

  const likesStyle = {
    display: "inline-block",
    marginRight: 5
  };

  if (visible) {
    return (
      <div style={blogStyle} key={props.blog.id}>
        <p>
          {props.blog.title} by {props.blog.author}
        </p>
        <p>{props.blog.url}</p>
        <p style={likesStyle}>{props.blog.likes} likes </p>
        <button onClick={() => props.likeBlog(props.blog)}>Like</button>
        <p>added by {props.blog.user.name}</p>
        <button onClick={() => setVisible(!visible)}>close</button>
        {removeButton()}
      </div>
    );
  } else {
    return (
      <div
        style={blogStyle}
        key={props.blog.id}
        onClick={() => setVisible(!visible)}
      >
        <p>
          {props.blog.title} by {props.blog.author}
        </p>
      </div>
    );
  }
};

const mapStateToProp = state => {
  return {
    blogs: state.blogs,
    user: state.user
  };
};

const connectedBlog = connect(mapStateToProp, { removeBlog, likeBlog })(Blog);

export default connectedBlog;
